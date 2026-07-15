import "./config/env.js";
import { connectDB } from "./config/db.js";
import path from "path";
import mongoose from "mongoose";
import express from "express";
// import { YoutubeTranscript } from "youtube-transcript";
import youtubeSubtitle from "youtube-captions-scraper";
// import { GoogleGenerativeAI } from "@google/generative-ai";
import { fileURLToPath } from "url";
import Groq from "groq-sdk";
import groq from "./config/groq.js";
import cors from "cors";

import chatRoutes from "./routes/chatRoutes.js";
import analyzeRoutes from "./routes/analyzeRoutes.js";
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//setup ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

//static files
app.use(express.static(path.join(__dirname, "public")));

// const transcript = await youtubeTranscript.fetchTranscript("videoId");
// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
// const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// console.log("API Key:", process.env.GOOGLE_API_KEY);
// // async function summarizeYoutube(videoUrl) {
// //   //1. ekstrak video ID
// //   let videoId;
// //   if (videoUrl.includes("youtu.be/")) {
// //     videoId = videoUrl.split("youtu.be/")[1].split("?")[0];
// //   } else {
// //     videoId = videoUrl.split("v=")[1].split("&")[0];
// //   }

// //   console.log("Video ID:", videoId);

// //   //2. ekstrak transcript
// //   // const transcriptArr = await YoutubeTranscript.fetchTranscript(videoId);
// //   const transcript = transcriptArr.map((t) => t.text).join(" ");
// //   console.log("Transcript berhasil diambil, panjang:", transcript.length);

// //   //3. kirim ke AI Gemini
// //   //   const model = genAI.getGenerativeModel({
// //   //     model: "gemini-2.0-flash",
// //   //   });
// //   //   const prompt = "Summarize this video: " + transcript + " in Indonesian";

// //   //   const result = await model.generateContent(prompt);
// //   //   return result.response.text();
// //   const result = await groq.chat.completions.create({
// //     model: "llama-3.1-8b-instant",
// //     messages: [
// //       {
// //         role: "user",
// //         content: `Summarize this YouTube video transcript in Indonesian:\n\n${transcript}`,
// //       },
// //     ],
// //   });

//   return result.choices[0].message.content;
// }
// async function main() {
//   const summary = await summarizeYoutube(
//     "https://youtu.be/TBEZc4CKGqo?si=RrpoplOIWRzSiNJ6",
//   );
//   console.log(summary);
// }

// async function listModels() {
//   const response = await fetch(
//     `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GOOGLE_API_KEY}`,
//   );
//   const data = await response.json();
//   data.models.forEach((m) => console.log(m.name));
// }

// listModels();
// main().catch(console.error);

app.use("/api/chat", chatRoutes);

app.use("/api/analyze", analyzeRoutes);

app.get("/", (req, res) => {
  return res.status(200).send("hello world");
});

//start server
connectDB();
const port = process.env.Port || 5000;
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
