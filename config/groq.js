import "./env.js";
import Groq from "groq-sdk";

const apiKey = process.env.GROQ_API_KEY;
if (!apiKey) {
  console.log("APi key tidak ditemukan");
  console.log("API Key:", apiKey);
  process.exit(1);
}

const groq = new Groq({ apiKey });

console.log("Groq AI terhubung");

export default groq;
