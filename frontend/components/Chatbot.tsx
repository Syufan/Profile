"use client";

import { useEffect, useRef, useState } from "react";
import { getHealth, getSuggestions, sendMessage } from "@/services/api";
import { FaCommentDots } from "react-icons/fa";
import { RiRobot2Line } from "react-icons/ri";
import styles from "./Chatbot.module.css";

type Message = { role: string; content: string };

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [history, setHistory] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [backendStatus, setBackendStatus] = useState<
        "checking" | "available" | "unavailable"
        >("checking");

  useEffect(() => {
    if (isOpen && backendStatus === "available") {
      getSuggestions().then((data) => setSuggestions(data.suggestions));
    }
  }, [isOpen, backendStatus]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const data = await getHealth();
        setBackendStatus(data.ok ? "available" : "unavailable");
      } catch {
        setBackendStatus("unavailable");
      }
    };

    checkHealth();

    const intervalId = setInterval(() => {
      checkHealth();
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  const handleSend = async (message: string) => {
    if (backendStatus !== "available") return;

    const trimmedMessage = message.trim();
    if (!trimmedMessage || isLoading) return;

    const userMessage = { role: "user", content: trimmedMessage };
    const assistantPlaceholder = { role: "assistant", content: "" };
    const nextHistory = [...history, userMessage, assistantPlaceholder];

    try{
        setHistory(nextHistory);
        setInput("");
        setIsLoading(true);

        await sendMessage(trimmedMessage, nextHistory, (chunk) => {
        setHistory((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = { role: "assistant", content: chunk };
            return updated;
          });
        });
    } catch {
        setHistory((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              role: "assistant",
              content: "Something went wrong. Please try again later.",
            };
            return updated;
        });
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div
        className={styles.chatbotRoot}
        style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 50 }}
    >
    {isOpen && (
        <div className={styles.chatbotWindow} style={{ marginBottom: "12px" }}>
        {/* Header */}
        <div className={styles.chatbotHeader}>
            <div className={styles.chatbotHeaderLeft}>
                <div className={styles.chatbotAvatar}>
                    <RiRobot2Line size={18} color="rgba(255,255,255,0.8)" />
                </div>
                <div className={styles.chatbotHeaderText}>
                    <span className={styles.chatbotHeaderName}>Jeff's Assistant</span>
                    <span className={styles.chatbotHeaderStatus}>
                        <span
                            className={`${styles.statusDot} ${
                            backendStatus === "available"
                                ? styles.available
                                : backendStatus === "checking"
                                ? styles.checking
                                : styles.unavailable
                            }`}
                        />
                        {backendStatus === "available"
                            ? "Online"
                            : backendStatus === "checking"
                            ? "Checking..."
                            : "Unavailable"}
                    </span>
                </div>
            </div>
            <button
                className={styles.chatbotClose}
                onClick={() => setIsOpen(false)}
            >
                ✕
            </button>
        </div>

        {/* Body */}
        <div className={styles.chatbotBody}>
            {backendStatus === "checking" && history.length === 0 && (
                <div className={`${styles.msgRow} ${styles.assistantRow}`}>
                    <div className={`${styles.msgBubble} ${styles.assistantBubble}`}>
                        Connecting to assistant...
                    </div>
                </div>
            )}

            {backendStatus === "unavailable" && history.length === 0 && (
                <div className={`${styles.msgRow} ${styles.assistantRow}`}>
                    <div className={`${styles.msgBubble} ${styles.assistantBubble}`}>
                        Sorry, the assistant is currently unavailable. Please try again later.
                    </div>
                </div>
            )}

            {backendStatus === "available" && history.length === 0 && (
                <div>
                    <div className={styles.suggestionsLabel}>YOU MIGHT ASK</div>
                    {suggestions.map((s, i) => (
                        <button
                            key={i}
                            className={styles.suggestionBtn}
                            onClick={() => handleSend(s)}
                            disabled={backendStatus !== "available"}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            )}

            {history.map((msg, i) => (
                <div
                    key={i}
                    className={`${styles.msgRow} ${
                    msg.role === "user" ? styles.userRow : styles.assistantRow
                    }`}
                >
                    <div
                        className={`${styles.msgBubble} ${
                            msg.role === "user"
                            ? styles.userBubble
                            : styles.assistantBubble
                        } ${msg.content === "" ? styles.empty : ""}`}
                    >
                        {msg.content === "" && msg.role === "assistant" ? (
                        <div className={styles.typingIndicator}>
                            <div className={styles.typingDot} />
                            <div className={styles.typingDot} />
                            <div className={styles.typingDot} />
                        </div>
                    ) : (
                        msg.content
                    )}
                    </div>
                </div>
            ))}
            <div ref={bottomRef} />
        </div>

        {/* Footer */}
        <div className={styles.chatbotFooter}>
            <input
                className={styles.chatbotInput}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                    backendStatus === "available"
                        ? "Ask me anything..."
                        : backendStatus === "checking"
                        ? "Connecting..."
                        : "Assistant unavailable"
                    }
                disabled={backendStatus !== "available"}
                onKeyDown={(e) => {
                    if (e.key === "Enter") handleSend(input);
                }}
            />
            <button
                className={styles.chatbotSend}
                onClick={() => handleSend(input)}
                disabled={isLoading || !input.trim() || backendStatus !== "available"}
            >
            <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
            </button>
        </div>
        </div>
    )}

    {/* Toggle */}
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
            className={styles.chatbotToggle}
            disabled={backendStatus !== "available"}
            onClick={() => {
                if (backendStatus !== "available") return;
                setIsOpen(!isOpen);
            }}
        >
            {isOpen ? (
                <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            ) : (
                <FaCommentDots size={20} />
            )}
        </button>
    </div>
    </div>
  );
}
