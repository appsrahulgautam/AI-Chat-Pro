"use client";

import { useState, useEffect } from "react";
import ChatMessages, { Message } from "@/components/ChatMessages";
import ChatInput from "@/components/ChatInput";
import MessageLimitDialog from "@/components/MessageLimitDialog";

export default function HomePage() {
  const initialMessage: Message = {
    role: "assistant",
    content: "Hello! I'm your AI assistant. How can I help you today?",
  };

  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [messageCount, setMessageCount] = useState(0);
  const [showLimitDialog, setShowLimitDialog] = useState(false);
  const [isLimitReached, setIsLimitReached] = useState(false);

  // Load message count from localStorage on mount
  useEffect(() => {
    const savedCount = localStorage.getItem("neuralchat_message_count");
    const savedMessages = localStorage.getItem("neuralchat_messages");

    if (savedCount) {
      const count = parseInt(savedCount);
      setMessageCount(count);
      if (count >= 2) {
        setIsLimitReached(true);
      }
    }

    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        if (parsedMessages.length > 1) {
          setMessages(parsedMessages);
        }
      } catch (e) {
        console.error("Error loading saved messages:", e);
      }
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("neuralchat_messages", JSON.stringify(messages));
  }, [messages]);

  const handleUserMessage = (text: string) => {
    // Create new messages array
    const newMessages = [...messages, { role: "user", content: text }];
    setMessages(newMessages);

    // Increment message count and save to localStorage
    const newCount = messageCount + 1;
    setMessageCount(newCount);
    localStorage.setItem("neuralchat_message_count", newCount.toString());

    // Show dialog if this is the 2nd message
    if (newCount >= 2) {
      setShowLimitDialog(true);
      setIsLimitReached(true);
    }
  };

  const handleReply = (reply: string) => {
    const newMessages = [...messages, { role: "assistant", content: reply }];
    setMessages(newMessages);
  };

  const handleDialogClose = () => {
    setShowLimitDialog(false);
  };

  // Function to reset chat (for testing purposes - you can remove this)
  const resetChat = () => {
    localStorage.removeItem("neuralchat_message_count");
    localStorage.removeItem("neuralchat_messages");
    setMessageCount(0);
    setIsLimitReached(false);
    setMessages([initialMessage]);
  };

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
          <div className="flex items-center justify-between">
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
                AI Chat Pro
              </span>
            </div>

            {/* Message counter badge */}
            <div className="flex items-center gap-3">
              <div
                className={`px-3 py-1 rounded-full border ${
                  isLimitReached
                    ? "bg-red-900/20 border-red-700/50"
                    : "bg-gray-800/50 border-gray-700/50"
                }`}
              >
                <span className="text-sm">
                  <span className="text-gray-300">Messages: </span>
                  <span
                    className={`font-bold ${
                      isLimitReached
                        ? "text-red-400 animate-pulse"
                        : "text-green-400"
                    }`}
                  >
                    {messageCount}
                  </span>
                  <span className="text-gray-400">/2</span>
                </span>
              </div>

              {/* Reset button - Only for testing, remove in production */}
              {process.env.NODE_ENV === "development" && (
                <button
                  onClick={resetChat}
                  className="px-3 py-1 text-xs rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 transition"
                >
                  Reset
                </button>
              )}
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
                onUserMessage={handleUserMessage}
                onReply={handleReply}
                messageCount={messageCount}
                isLimitReached={isLimitReached}
              />
            </div>
          </div>
        </main>
      </div>

      {/* Message Limit Dialog */}
      {showLimitDialog && <MessageLimitDialog onClose={handleDialogClose} />}
    </div>
  );
}
