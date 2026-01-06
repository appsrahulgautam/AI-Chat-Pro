"use client";

import { useState } from "react";
import ChatMessages, { Message } from "@/components/ChatMessages";
import ChatInput from "@/components/ChatInput";

export default function HomePage() {
  const initialMessage: Message = {
    role: "assistant",
    content:
      "You’re inside AI Chat Pro. Ask complex questions, build ideas, or think out loud.",
  };

  const [messages, setMessages] = useState<Message[]>([initialMessage]);

  const clearChat = () => {
    setMessages([initialMessage]);
  };

  return (
    <div className="h-screen w-screen bg-black text-zinc-100">
      {/* Global ambient background */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_70%_10%,rgba(168,85,247,0.15),transparent_40%)]" />

      {/* Header */}
      <header className="flex h-16 items-center justify-between border-b border-zinc-800 bg-black/50 px-8 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg" />

          <div>
            <div className="text-sm font-semibold tracking-wide">
              AI Chat Pro
            </div>
            <div className="text-[11px] text-zinc-400">Neural interface v1</div>
          </div>
        </div>

        <button
          onClick={clearChat}
          className="rounded-xl border border-zinc-700 px-4 py-2 text-xs text-zinc-300 transition hover:bg-zinc-900"
        >
          New Session
        </button>
      </header>

      {/* Main layout */}
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <aside className="hidden w-72 flex-col border-r border-zinc-800 bg-zinc-950/60 backdrop-blur-xl md:flex">
          <div className="px-6 py-6 text-xs uppercase tracking-widest text-zinc-500">
            Sessions
          </div>

          <div className="px-6 text-sm text-zinc-400">(Coming soon)</div>
        </aside>

        {/* Chat area */}
        <main className="flex flex-1 flex-col">
          <ChatMessages messages={messages} />

          <ChatInput
            onUserMessage={(text) =>
              setMessages((prev) => [...prev, { role: "user", content: text }])
            }
            onReply={(reply) =>
              setMessages((prev) => [
                ...prev,
                { role: "assistant", content: reply },
              ])
            }
          />
        </main>
      </div>
    </div>
  );
}
