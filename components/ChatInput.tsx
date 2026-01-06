"use client";

import { useActionState, useRef, useState } from "react";
import { sendMessageToAI } from "@/app/actions/chat";

interface ChatInputProps {
  onReply: (reply: string) => void;
  onUserMessage: (text: string) => void;
  messageCount: number;
  isLimitReached: boolean;
}

export default function ChatInput({
  onReply,
  onUserMessage,
  messageCount,
  isLimitReached,
}: ChatInputProps) {
  const [state, formAction] = useActionState(sendMessageToAI, { reply: "" });
  const [isTyping, setIsTyping] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle the response from the server action
  if (state?.reply) {
    onReply(state.reply);
    // Clear the state to prevent infinite loops
    state.reply = "";
  }

  const handleSubmit = async (formData: FormData) => {
    const message = formData.get("message") as string;
    if (!message.trim()) return;

    // Check if limit is reached
    if (isLimitReached) {
      alert("Message limit reached. You cannot send more messages.");
      return;
    }

    // Check message count - only send to AI if it's the first message
    const isFirstMessage = messageCount === 0;

    // Call user message callback immediately
    onUserMessage(message);

    // Clear input
    formRef.current?.reset();
    setIsTyping(true);

    // Only send to AI if it's the first message
    if (isFirstMessage) {
      formAction(formData);
    } else {
      // For 2nd message, show typing indicator but don't actually send to AI
      // The server action won't be called
      setTimeout(() => {
        setIsTyping(false);
        // Don't send AI response for 2nd+ messages
      }, 1500);
    }

    // Reset typing state after a delay
    setTimeout(() => setIsTyping(false), 1500);
  };

  return (
    <form
      ref={formRef}
      action={handleSubmit}
      className="relative group"
      onSubmit={(e) => {
        e.preventDefault();

        // Prevent submission if limit reached
        if (isLimitReached) {
          e.stopPropagation();
          return;
        }

        const formData = new FormData(e.currentTarget);
        handleSubmit(formData);
      }}
    >
      <div className="relative">
        <div
          className={`absolute -inset-1 rounded-2xl blur transition duration-1000 group-hover:duration-200 ${
            isLimitReached
              ? "bg-gradient-to-r from-red-600/20 to-gray-700/20 opacity-30"
              : "bg-gradient-to-r from-indigo-600 to-purple-600 opacity-20 group-hover:opacity-30"
          }`}
        ></div>
        <div
          className={`relative flex items-center backdrop-blur-xl border rounded-xl p-1.5 ${
            isLimitReached
              ? "bg-gray-900/60 border-gray-700/30"
              : "bg-gray-900/80 border-gray-700/50"
          }`}
        >
          <input
            ref={inputRef}
            name="message"
            placeholder={
              isLimitReached
                ? "Message limit reached. Refresh won't reset it."
                : "Type your message here..."
            }
            className={`flex-1 bg-transparent px-5 py-3.5 outline-none text-sm md:text-base ${
              isLimitReached
                ? "text-gray-500 placeholder:text-gray-600 cursor-not-allowed"
                : "text-white placeholder:text-gray-400"
            }`}
            autoComplete="off"
            disabled={isLimitReached}
            onFocus={() => !isLimitReached && setIsTyping(true)}
            onBlur={() => !isLimitReached && setIsTyping(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (!isLimitReached) {
                  const form = e.currentTarget.form;
                  if (form) {
                    const formData = new FormData(form);
                    handleSubmit(formData);
                  }
                }
              }
            }}
          />
          <button
            type="submit"
            disabled={isTyping || isLimitReached}
            className={`h-11 w-11 ml-2 rounded-lg flex items-center justify-center transition-all duration-300 ${
              isLimitReached
                ? "bg-gray-800 cursor-not-allowed"
                : "bg-gradient-to-br from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 hover:scale-105 active:scale-95 text-white shadow-lg shadow-indigo-500/20"
            }`}
          >
            {isLimitReached ? (
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            ) : isTyping ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Helper text */}
      <p className="mt-2 text-center text-xs text-gray-400">
        {isLimitReached ? (
          <span className="text-red-400/80">
            ⚠️ Limit reached. Data persists across refreshes.
          </span>
        ) : (
          "Press Enter to send • Shift+Enter for new line"
        )}
      </p>

      <p className="text-xs text-center mt-2 tracking-tight">
        *Made for showing proof of concept by Rahul Gautam
      </p>
    </form>
  );
}
