import { YoutubeTranscript } from "youtube-transcript";

export function extractYoutubeId(url) {
  const regex =
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export async function scrapeTranscript(videoId) {
  const transcriptArr = await YoutubeTranscript.fetchTranscript(videoId);
  const cleanText = transcriptArr
    .map((t) => t.text) // ambil teks saja
    .join(" ") // gabung jadi satu
    .replace(/\[.*?\]/g, "") // buang [musik], [tepuk tangan], dll
    .replace(/\s+/g, " ") // hapus spasi berlebih
    .trim(); // hapus spasi di awal/akhir

  return cleanText;
}
