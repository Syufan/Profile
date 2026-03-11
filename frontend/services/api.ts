// services/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: typeof window === "undefined" ? process.env.API_URL : "",
  timeout: 5000,
});

const chatbotApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CHATBOT_API_URL,
  timeout: 5000,
});

export async function getProfile() {
  try {
    const response = await api.get("/api/");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    throw new Error("Failed to fetch profile");
  }
}

export async function getProjects() {
  try {
    const response = await api.get("/api/projects");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    throw new Error("Failed to fetch projects");
  }
}

export async function getHealth() {
  try {
    const response = await chatbotApi.get("/health");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch health status:", error);
    throw new Error("Failed to fetch health status");
  }
}

export async function getSuggestions() {
  try {
    const response = await chatbotApi.get("/chat");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch suggestions:", error);
    throw new Error("Failed to fetch suggestions");
  }
}

export async function sendMessage(
  message: string,
  history: { role: string; content: string }[],
  onChunk: (chunk: string) => void,
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_CHATBOT_API_URL}/chat`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, history }),
    },
  );

  if (!response.ok) {
    let errorData: any = null;
    try {
      errorData = await response.json();
    } catch {}
    throw {
      status: response.status,
      detail:
        errorData?.detail?.message ??
        errorData?.detail ??
        "Something went wrong. Please try again later.",
      remainingMessages: errorData?.detail?.remaining_messages ?? null,
      maxMessages: errorData?.detail?.max_messages ?? null,
    };
  }

  const remainingMessages = response.headers.get("X-Remaining-Messages");
  const maxMessages = response.headers.get("X-Max-Messages");

  if (!response.body) {
    throw {
      status: 500,
      detail: "Empty response body",
    };
  }

  const reader = response.body!.getReader();
  const decoder = new TextDecoder();
  let result = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value);
    result += chunk;
    onChunk(result);
  }

  return {
    result,
    remainingMessages: remainingMessages ? Number(remainingMessages) : null,
    maxMessages: maxMessages ? Number(maxMessages) : null,
  };
}
