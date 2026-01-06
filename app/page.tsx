"use client";

import { useState } from "react";
import ChatMessages, { Message } from "@/components/ChatMessages";
import ChatInput from "@/components/ChatInput";

export default function HomePage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi 👋 I’m your local AI. Ask me anything.",
    },
  ]);

  const handleSend = (text: string) => {
    setMessages((prev) => [...prev, { role: "user", content: text }]);
  };

  return (
    <main className="flex h-screen flex-col bg-zinc-950">
      <header className="border-b border-zinc-800 px-6 py-4">
        <h1 className="text-lg font-semibold text-zinc-100">Local AI Chat</h1>
        <p className="text-xs text-zinc-400">100% free · runs locally</p>
      </header>

      <ChatMessages messages={messages} />
      <ChatInput
        onReply={(reply) =>
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: reply },
          ])
        }
      />
    </main>
  );
}
