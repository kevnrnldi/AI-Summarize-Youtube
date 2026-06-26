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
