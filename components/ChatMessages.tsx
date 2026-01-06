"use client";

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
    <div className="relative flex-1 overflow-y-auto">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(99,102,241,0.18),transparent_45%)]" />

      <div className="relative mx-auto max-w-5xl px-10 py-16 space-y-12">
        {messages.map((msg, i) => {
          const isUser = msg.role === "user";

          return (
            <div
              key={i}
              className={`flex ${isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`group relative max-w-3xl ${
                  isUser ? "text-right" : "text-left"
                }`}
              >
                {/* Role label */}
                <div className="mb-2 text-[11px] uppercase tracking-widest text-zinc-500">
                  {isUser ? "You" : "AI Assistant"}
                </div>

                {/* Message card */}
                <div
                  className={`rounded-3xl px-8 py-6 text-[15px] leading-relaxed backdrop-blur-xl transition ${
                    isUser
                      ? "bg-gradient-to-br from-blue-600/90 to-indigo-600/90 text-white shadow-[0_0_40px_rgba(59,130,246,0.35)]"
                      : "bg-zinc-900/70 text-zinc-100 border border-zinc-800 shadow-[0_0_60px_rgba(99,102,241,0.15)]"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            </div>
          );
        })}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
