"use client";

import { useState } from "react";
import ChatMessages, { Message } from "@/components/ChatMessages";
import ChatInput from "@/components/ChatInput";

export default function HomePage() {
  const initialMessage: Message = {
    role: "assistant",
    content: "Hello! I'm your AI assistant. How can I help you today?",
  };

  const [messages, setMessages] = useState<Message[]>([initialMessage]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 -left-20 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 right-1/3 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Main container */}
      <div className="relative flex flex-col h-screen max-w-7xl mx-auto">
        {/* Header with logo only */}
        <header className="sticky top-0 z-50 w-full py-4 px-6 border-b border-white/10 backdrop-blur-xl bg-gray-900/50">
          <div className="flex items-center">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 p-0.5">
                <div className="h-full w-full rounded-[10px] bg-gray-900 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                NeuralChat
              </span>
            </div>
          </div>
        </header>

        {/* Chat container */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Messages area with proper spacing */}
          <div className="flex-1 overflow-hidden">
            <ChatMessages messages={messages} />
          </div>

          {/* Input area with margin */}
          <div className="px-4 pb-6 pt-4 border-t border-white/10 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent">
            <div className="max-w-3xl mx-auto">
              <ChatInput
                onUserMessage={(text) =>
                  setMessages((prev) => [
                    ...prev,
                    { role: "user", content: text },
                  ])
                }
                onReply={(reply) =>
                  setMessages((prev) => [
                    ...prev,
                    { role: "assistant", content: reply },
                  ])
                }
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
