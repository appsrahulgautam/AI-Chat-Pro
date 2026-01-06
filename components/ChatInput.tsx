"use client";

import { useActionState, useRef, useState } from "react";
import { sendMessageToAI } from "@/app/actions/chat";

export default function ChatInput({
  onReply,
  onUserMessage,
}: {
  onReply: (reply: string) => void;
  onUserMessage: (text: string) => void;
}) {
  const [state, formAction] = useActionState(sendMessageToAI, { reply: "" });
  const [isTyping, setIsTyping] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  if (state.reply) {
    onReply(state.reply);
    state.reply = "";
  }

  const handleSubmit = (formData: FormData) => {
    const message = formData.get("message") as string;
    if (!message.trim()) return;

    onUserMessage(message);
    formAction(formData);
    formRef.current?.reset();
    setIsTyping(true);

    // Simulate typing delay for UI feedback
    setTimeout(() => setIsTyping(false), 500);
  };

  return (
    <form ref={formRef} action={handleSubmit} className="relative group">
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative flex items-center bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-xl p-1.5">
          <input
            name="message"
            placeholder="Type your message here..."
            className="flex-1 bg-transparent px-5 py-3.5 text-white placeholder:text-gray-400 outline-none text-sm md:text-base"
            autoComplete="off"
            onFocus={() => setIsTyping(true)}
            onBlur={() => setIsTyping(false)}
          />
          <button
            type="submit"
            disabled={isTyping}
            className="h-11 w-11 ml-2 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white shadow-lg shadow-indigo-500/20 flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
          >
            {isTyping ? (
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
        Press Enter to send • Shift+Enter for new line
      </p>
    </form>
  );
}
