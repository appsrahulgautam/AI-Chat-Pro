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
    <section className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`max-w-xl rounded-2xl px-4 py-3 text-sm leading-relaxed ${
            msg.role === "user"
              ? "ml-auto bg-blue-600 text-white"
              : "mr-auto bg-zinc-800 text-zinc-100"
          }`}
        >
          {msg.content}
        </div>
      ))}

      <div ref={bottomRef} />
    </section>
  );
}
