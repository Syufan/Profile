"use client";

import { useEffect, useState } from "react";
import { getSuggestions } from "@/services/api";
import { FaCommentDots } from "react-icons/fa";

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [history, setHistory] = useState<{ role: string; content: string }[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if(isOpen) {
            getSuggestions().then(data => {
                setSuggestions(data.suggestions)
            });
        }
    }, [isOpen]);

    return(
        <div className="fixed bottom-6 right-6 z-50">
            {isOpen && (
                <div className="mb-4 w-80 h-96 bg-white rounded-2xl shadow-xl flex flex-col">
                    {/* Header */}
                    <div className="p-4 border-b flex items-center justify-between">
                        <span className="text-sm font-medium">Ask me anything</span>
                        <div className="w-2 h-2 rounded-full bg-green-400" />
                    </div>

                    {/* History */}
                    <div className="flex-1 overflow-y-auto p-4">
                        {history.length === 0 && (
                            <div className="flex flex-col gap-2">
                                {suggestions.map((s, i) => (
                                    <button
                                        key={i}
                                        className="text-left text-sm bg-slate-100 hover:bg-slate-200 rounded-lg px-3 py-2"
                                        onClick={() => {/* 发送消息 */}}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        )}
                        {history.map((msg, i) => (
                            <div key={i} className={`mb-2 ${msg.role === "user" ? "text-right" : "text-left"}`}>
                                <span className={`inline-block text-sm px-3 py-2 rounded-lg ${msg.role === "user" ? "bg-black text-white" : "bg-slate-100"}`}>
                                    {msg.content}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t flex gap-2">
                        <input
                            className="flex-1 text-sm border rounded-lg px-3 py-2"
                            placeholder="Type a message..."
                        />
                        <button className="text-sm bg-black text-white px-3 py-2 rounded-lg">
                            Send
                        </button>
                    </div>
                </div>
            )}

            {/* button */}
            <button
                onClick={() => {
                    setIsOpen(!isOpen)
                }}
                className="w-14 h-14 bg-black text-white rounded-full shadow-lg flex items-center justify-center"
            >
                <FaCommentDots size={24} />
            </button>

        </div>
    );
  }
