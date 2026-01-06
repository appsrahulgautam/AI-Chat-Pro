"use client";

import { useActionState } from "react";
import { sendMessageToAI } from "@/app/actions/chat";

export default function ChatInput({
  onReply,
}: {
  onReply: (reply: string) => void;
}) {
  const [state, formAction] = useActionState(sendMessageToAI, {
    reply: "",
  });

  if (state.reply) {
    onReply(state.reply);
    state.reply = "";
  }

  return (
    <form action={formAction} className="border-t border-zinc-800 p-4">
      <div className="flex gap-3">
        <input
          name="message"
          placeholder="Type your message..."
          required
          className="flex-1 rounded-xl bg-zinc-900 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none focus:ring-2 focus:ring-blue-600"
        />

        <button
          type="submit"
          className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-500"
        >
          Send
        </button>
      </div>
    </form>
  );
}
