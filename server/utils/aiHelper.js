import groq from "../config/groq.js";
import { buildSummaryPrompt } from "../utils/promptHelper.js";

//bangun model
export async function summarizeWithAI(transcript) {
  //bangun prompt
  const truncatedTranscript = transcript.substring(0, 4000);
  const prompt = buildSummaryPrompt(transcript);
  const result = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });
  return result.choices[0].message.content; // isi json dari groq
  // choice -> message -> role & content
}

export async function chatWithAI({ context, chatHistory, message }) {
  const recentChat = chatHistory.slice(-10);
  const messages = [
    {
      role: "system",
      content: `Kamu adalah asisten yang menjawab seputar pertanyaan isi video youtube sebagai berikut
      Video :
      """${context.slice(0, 3000)}"""
      Jawab pertanyaan user berdasarkan isi video diatas, jawab dengan menggunakan bahasa indonesia
      `,
    },

    //riwayat chat sebelumnya
    ...recentChat.map((chat) => ({
      role: chat.role === "ai" ? "assistant" : "user",
      content: chat.message,
    })),
    //pertanyaan baru dari user
    { role: "user", content: message },
  ];

  const result = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages,
  });
  return result.choices[0].message.content;
}
