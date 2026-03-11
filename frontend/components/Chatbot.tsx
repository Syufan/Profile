"use client";

import { useEffect, useRef, useState } from "react";
import { getHealth, getSuggestions, sendMessage } from "@/services/api";
import { FaCommentDots } from "react-icons/fa";
import { RiRobot2Line } from "react-icons/ri";

type Message = { role: string; content: string };

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [history, setHistory] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [backendStatus, setBackendStatus] = useState<
        "checking" | "available" | "unavailable"
        >("checking");

  useEffect(() => {
    if (isOpen && backendStatus === "available") {
      getSuggestions().then((data) => setSuggestions(data.suggestions));
    }
  }, [isOpen, backendStatus]);

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
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

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
    <>
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500&display=swap');

                .chatbot-root * {
                    box-sizing: border-box;
                    font-family: 'DM Sans', sans-serif;
                }

                .chatbot-window {
                    width: 360px;
                    height: 520px;
                    background: #0d1117;
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 16px;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    box-shadow: 0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04);
                    animation: slideUp 0.2s cubic-bezier(0.16, 1, 0.3, 1);
                }

                @media (max-width: 480px) {
                    .chatbot-window {
                        position: fixed !important;
                        bottom: 0 !important;
                        right: 0 !important;
                        left: 0 !important;
                        width: 100vw !important;
                        height: 75vh !important;
                        border-radius: 20px 20px 0 0 !important;
                        border-bottom: none !important;
                        margin-bottom: 0 !important;
                    }
                }

                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(12px) scale(0.97); }
                    to   { opacity: 1; transform: translateY(0) scale(1); }
                }

                .chatbot-header {
                    padding: 16px 20px;
                    border-bottom: 1px solid rgba(255,255,255,0.06);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    background: rgba(255,255,255,0.02);
                }

                .chatbot-header-left {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .chatbot-avatar {
                    width: 32px;
                    height: 32px;
                    background: rgba(255,255,255,0.08);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 14px;
                    font-weight: 600;
                    color: white;
                    font-family: 'DM Mono', monospace;
                }

                .chatbot-header-text {
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                }

                .chatbot-header-name {
                    font-size: 13px;
                    font-weight: 500;
                    color: rgba(255,255,255,0.9);
                    letter-spacing: 0.01em;
                }

                .chatbot-header-status {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    font-size: 11px;
                    color: rgba(255,255,255,0.35);
                }

                .status-dot {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                }

                .status-dot.available {
                    background: #22c55e;
                    box-shadow: 0 0 6px #22c55e;
                }

                .status-dot.checking {
                    background: #f59e0b;
                    box-shadow: 0 0 6px #f59e0b;
                }

                .status-dot.unavailable {
                    background: #ef4444;
                    box-shadow: 0 0 6px #ef4444;
                }

                .chatbot-close {
                    width: 28px;
                    height: 28px;
                    border-radius: 6px;
                    border: none;
                    background: transparent;
                    color: rgba(255,255,255,0.3);
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 16px;
                    transition: all 0.15s;
                }

                .chatbot-close:hover {
                    background: rgba(255,255,255,0.06);
                    color: rgba(255,255,255,0.7);
                }

                .chatbot-body {
                    flex: 1;
                    overflow-y: auto;
                    padding: 16px;
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    scrollbar-width: thin;
                    scrollbar-color: rgba(255,255,255,0.08) transparent;
                }

                .chatbot-body::-webkit-scrollbar { width: 4px; }
                .chatbot-body::-webkit-scrollbar-track { background: transparent; }
                .chatbot-body::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 2px; }

                .suggestions-label {
                    font-size: 10px;
                    font-weight: 500;
                    color: rgba(255,255,255,0.2);
                    margin-bottom: 8px;
                    font-family: 'DM Sans', sans-serif;
                }

                .suggestion-btn {
                    width: 100%;
                    text-align: left;
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 8px;
                    padding: 9px 12px;
                    color: rgba(255,255,255,0.55);
                    font-size: 12.5px;
                    cursor: pointer;
                    transition: all 0.15s;
                    margin-bottom: 4px;
                    line-height: 1.4;
                }

                .suggestion-btn:hover {
                    background: rgba(255,255,255,0.07);
                    border-color: rgba(255,255,255,0.12);
                    color: rgba(255,255,255,0.8);
                }

                .msg-row {
                    display: flex;
                    margin-bottom: 6px;
                }

                .msg-row.user { justify-content: flex-end; }
                .msg-row.assistant { justify-content: flex-start; }

                .msg-bubble {
                    max-width: 80%;
                    padding: 10px 14px;
                    border-radius: 12px;
                    font-size: 13px;
                    line-height: 1.55;
                    word-break: break-word;
                }

                .msg-bubble.user {
                    background: #3b82f6;
                    color: white;
                    border-bottom-right-radius: 3px;
                }

                .msg-bubble.assistant {
                    background: rgba(255,255,255,0.06);
                    color: rgba(255,255,255,0.82);
                    border: 1px solid rgba(255,255,255,0.07);
                    border-bottom-left-radius: 3px;
                }

                .msg-bubble.assistant.empty {
                    padding: 10px 16px;
                }

                .typing-indicator {
                    display: flex;
                    gap: 4px;
                    align-items: center;
                    height: 16px;
                }

                .typing-dot {
                    width: 4px;
                    height: 4px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.3);
                    animation: typingBounce 1.2s infinite;
                }

                .typing-dot:nth-child(2) { animation-delay: 0.2s; }
                .typing-dot:nth-child(3) { animation-delay: 0.4s; }

                @keyframes typingBounce {
                    0%, 60%, 100% { transform: translateY(0); opacity: 0.3; }
                    30% { transform: translateY(-4px); opacity: 1; }
                }

                .chatbot-footer {
                    padding: 12px 16px;
                    border-top: 1px solid rgba(255,255,255,0.06);
                    display: flex;
                    gap: 8px;
                    align-items: center;
                    background: rgba(255,255,255,0.01);
                }

                .chatbot-input {
                    flex: 1;
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 8px;
                    padding: 9px 13px;
                    color: rgba(255,255,255,0.85);
                    font-size: 13px;
                    outline: none;
                    transition: all 0.15s;
                    font-family: 'DM Sans', sans-serif;
                }

                .chatbot-input::placeholder { color: rgba(255,255,255,0.2); }

                .chatbot-input:focus {
                    border-color: rgba(59,130,246,0.4);
                    background: rgba(255,255,255,0.07);
                }

                .chatbot-send {
                    width: 36px;
                    height: 36px;
                    border-radius: 8px;
                    border: none;
                    background: #3b82f6;
                    color: white;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.15s;
                    flex-shrink: 0;
                }

                .chatbot-send:hover { background: #2563eb; }
                .chatbot-send:disabled { background: rgba(255,255,255,0.08); cursor: not-allowed; }

                .chatbot-toggle {
                    width: 54px;
                    height: 54px;
                    border-radius: 50%;
                    border: none;
                    background: radial-gradient(circle at 35% 35%, #1a1a1a, #000000 70%);
                    color: rgba(255,255,255,0.85);
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    box-shadow:
                        0 8px 32px rgba(0,0,0,0.7),
                        0 2px 8px rgba(0,0,0,0.5),
                        inset 0 1px 0 rgba(255,255,255,0.15),
                        inset 0 -1px 0 rgba(0,0,0,0.4);
                    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
                    overflow: hidden;
                }

                .chatbot-toggle::before {
                    content: '';
                    position: absolute;
                    top: 6px;
                    left: 10px;
                    width: 34px;
                    height: 16px;
                    background: radial-gradient(ellipse, rgba(255,255,255,0.18) 0%, transparent 70%);
                    border-radius: 50%;
                    pointer-events: none;
                }

                .chatbot-toggle:hover {
                    transform: scale(1.07);
                    box-shadow:
                        0 12px 40px rgba(0,0,0,0.8),
                        0 4px 12px rgba(0,0,0,0.6),
                        inset 0 1px 0 rgba(255,255,255,0.2),
                        inset 0 -1px 0 rgba(0,0,0,0.4);
                }

                .chatbot-toggle:active { transform: scale(0.96); }
            `}</style>

      <div
        className="chatbot-root"
        style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 50 }}
      >
        {isOpen && (
          <div className="chatbot-window" style={{ marginBottom: "12px" }}>
            {/* Header */}
            <div className="chatbot-header">
              <div className="chatbot-header-left">
                <div className="chatbot-avatar">
                  <RiRobot2Line size={18} color="rgba(255,255,255,0.8)" />
                </div>
                <div className="chatbot-header-text">
                  <span className="chatbot-header-name">Jeff's Assistant</span>
                  <span className="chatbot-header-status">
                    <span className={`status-dot ${backendStatus}`} />
                    {backendStatus === "available"
                    ? "Online"
                    : backendStatus === "checking"
                    ? "Checking..."
                    : "Unavailable"}
                  </span>
                </div>
              </div>
              <button
                className="chatbot-close"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="chatbot-body">
                {backendStatus === "checking" && history.length === 0 && (
                    <div className="msg-row assistant">
                    <div className="msg-bubble assistant">
                        Connecting to assistant...
                    </div>
                    </div>
                )}

                {backendStatus === "unavailable" && history.length === 0 && (
                    <div className="msg-row assistant">
                    <div className="msg-bubble assistant">
                        Sorry, the assistant is currently unavailable. Please try again later.
                    </div>
                    </div>
                )}

                {backendStatus === "available" && history.length === 0 && (
                    <div>
                    <div className="suggestions-label">YOU MIGHT ASK</div>
                    {suggestions.map((s, i) => (
                        <button
                        key={i}
                        className="suggestion-btn"
                        onClick={() => handleSend(s)}
                        disabled={backendStatus !== "available"}
                        >
                        {s}
                        </button>
                    ))}
                    </div>
                )}

                {history.length === 0 && (
                    <div>
                        <div className="suggestions-label">YOU MIGHT ASK</div>
                        {suggestions.map((s, i) => (
                            <button
                            key={i}
                            className="suggestion-btn"
                            onClick={() => handleSend(s)}
                            disabled={backendStatus !== "available"}
                            >
                            {s}
                            </button>
                        ))}
                    </div>
                )}

                {history.map((msg, i) => (
                    <div key={i} className={`msg-row ${msg.role}`}>
                        <div
                            className={`msg-bubble ${msg.role} ${msg.content === "" ? "empty" : ""}`}
                        >
                            {msg.content === "" && msg.role === "assistant" ? (
                            <div className="typing-indicator">
                                <div className="typing-dot" />
                                <div className="typing-dot" />
                                <div className="typing-dot" />
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
            <div className="chatbot-footer">
              <input
                className="chatbot-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                disabled={backendStatus !== "available"}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend(input);
                }}
              />
              <button
                className="chatbot-send"
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
          <button className="chatbot-toggle" onClick={() => setIsOpen(!isOpen)}>
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
    </>
  );
}
