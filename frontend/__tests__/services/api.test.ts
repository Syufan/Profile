import {
  getProfile,
  getProjects,
  getSuggestions,
  getHealth,
  sendMessage,
} from "@/services/api";

jest.mock("axios", () => {
  const mockGet = jest.fn();
  const mockPost = jest.fn();
  return {
    default: {
      create: () => ({ get: mockGet, post: mockPost }),
    },
    create: () => ({ get: mockGet, post: mockPost }),
  };
});

const getMockGet = () => {
  const axios = require("axios");
  return axios.create().get as jest.Mock;
};

describe("api", () => {
  beforeEach(() => {
    getMockGet().mockClear();
  });

  it("getProfile should return data", async () => {
    getMockGet().mockResolvedValue({
      data: { about: {}, experience: [], projects: [] },
    });

    const result = await getProfile();

    expect(result).toEqual({ about: {}, experience: [], projects: [] });
  });

  it("getProfile should throw when request fails", async () => {
    getMockGet().mockRejectedValue(new Error("Network error"));

    await expect(getProfile()).rejects.toThrow("Failed to fetch profile");
  });

  it("getProjects should return data", async () => {
    getMockGet().mockResolvedValue({ data: [{ name: "Test Project" }] });

    const result = await getProjects();

    expect(result).toEqual([{ name: "Test Project" }]);
  });

  it("getSuggestions should return suggestions", async () => {
    getMockGet().mockResolvedValue({
      data: { suggestions: ["What are your skills?"] },
    });

    const result = await getSuggestions();

    expect(result).toEqual({ suggestions: ["What are your skills?"] });
  });

  it("getSuggestions should throw when request fails", async () => {
    getMockGet().mockRejectedValue(new Error("Network error"));
    await expect(getSuggestions()).rejects.toThrow(
      "Failed to fetch suggestions",
    );
  });

  it("sendMessage should stream message chunks", async () => {
    const mockReader = {
      read: jest
        .fn()
        .mockResolvedValueOnce({
          done: false,
          value: new TextEncoder().encode("Jeff"),
        })
        .mockResolvedValueOnce({
          done: false,
          value: new TextEncoder().encode(" Zhang"),
        })
        .mockResolvedValueOnce({ done: true, value: undefined }),
    };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      headers: {
        get: jest.fn((name: string) => {
          if (name === "X-Remaining-Messages") return "9";
          if (name === "X-Max-Messages") return "10";
          return null;
        }),
      },
      body: { getReader: () => mockReader },
    });

    const chunks: string[] = [];
    const result = await sendMessage("What are your skills?", [], (chunk) =>
      chunks.push(chunk),
    );

    expect(chunks).toEqual(["Jeff", "Jeff Zhang"]);
    expect(result).toEqual({
      result: "Jeff Zhang",
      remainingMessages: 9,
      maxMessages: 10,
    });
  });

  it("sendMessage should throw when request fails", async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error("Network error"));

    await expect(sendMessage("hello", [], () => {})).rejects.toThrow();
  });

  it("getHealth should return health status", async () => {
    getMockGet().mockResolvedValue({
      data: { ok: true },
    });

    const result = await getHealth();

    expect(result).toEqual({ ok: true });
  });

  it("getHealth should throw when request fails", async () => {
    getMockGet().mockRejectedValue(new Error("Network error"));

    await expect(getHealth()).rejects.toThrow("Failed to fetch health status");
  });
});
