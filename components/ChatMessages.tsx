"use client";

import { Atom, Banana, User } from "lucide-react";
import { useEffect, useRef } from "react";

export type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatMessages({ messages }: { messages: Message[] }) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-full overflow-y-auto px-4 py-6 scroll-smooth">
      <div className="max-w-3xl mx-auto space-y-6 px-4">
        {messages.map((msg, i) => {
          const isUser = msg.role === "user";

          return (
            <div
              key={i}
              className={`flex ${
                isUser ? "justify-end" : "justify-start"
              } animate-in fade-in duration-300`}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div
                className={`flex max-w-[100%] ${
                  isUser ? "flex-row-reverse" : "flex-row"
                } items-end gap-3`}
              >
                {/* Avatar */}
                <div className={`flex-shrink-0 ${isUser ? "ml-2" : "mr-2"}`}>
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      isUser
                        ? "bg-gradient-to-br from-blue-500 to-cyan-400"
                        : "bg-gradient-to-br from-purple-500 to-pink-500"
                    }`}
                  >
                    {isUser ? (
                      <span className="text-xs font-bold">
                        <User />
                      </span>
                    ) : (
                      <Atom />
                    )}
                  </div>
                </div>

                {/* Chat bubble with gradient */}
                <div
                  className={`relative rounded-2xl px-5 py-3 shadow-lg ${
                    isUser
                      ? "rounded-br-none bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700"
                      : "rounded-bl-none bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 border border-gray-700/50"
                  }`}
                >
                  {/* Gradient overlay for user messages */}
                  {isUser && (
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent animate-gradient-shift" />
                  )}

                  <p className="relative text-white/90 leading-relaxed whitespace-pre-wrap break-words">
                    {msg.content}
                  </p>

                  {/* Timestamp */}
                  <div
                    className={`flex ${
                      isUser ? "justify-end" : "justify-start"
                    } mt-2`}
                  >
                    <span className="text-xs opacity-50">
                      {new Date().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} className="h-px" />
      </div>
    </div>
  );
}
