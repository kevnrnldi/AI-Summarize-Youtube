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

export async function getVideoTitle(videoId) {
  try {
    const response = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`,
    );
    const data = await response.json();
    return data.title;
  } catch (e) {
    return `Video ${videoId} not found`;
  }
}
