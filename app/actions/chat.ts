"use server";

import { askGroq } from "@/lib/groq";

export async function sendMessageToAI(_prevState: any, formData: FormData) {
  const message = formData.get("message") as string;

  console.log("Groq called with:", message);

  if (!message) return { reply: "" };

  const reply = await askGroq(message);
  return { reply };
}
