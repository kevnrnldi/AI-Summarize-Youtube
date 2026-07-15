import Video from "../models/VideoSchema.js";
import Transcript from "../models/TranscriptSchema.js";
import { chatWithAI } from "../utils/aiHelper.js";

export async function chatAI(req, res) {
  try {
    const { videoId } = req.params;
    const { message } = req.body;

    console.log("videoId", videoId);
    console.log("message", message);

    if (!message) {
      return res.status(400).json({ message: "Message is empty" });
    }

    const video = await Video.findOne({ youtubeId: videoId });
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    //mengambil transcript dari video yang nantinya dikirim ke AI
    const transcript = await Transcript.findOne({ youtubeId: videoId });
    let context;
    if (transcript) {
      context = transcript.text;
    } else {
      context = video.summary;
    }

    const reply = await chatWithAI({
      context,
      chatHistory: video.chats,
      message,
    });

    video.chats.push({ role: "user", message });
    video.chats.push({ role: "ai", message: reply });
    await video.save();
    return res.status(200).json({
      message: "Message sent successfully",
      reply,
      chats: video.chats,
    });
  } catch (error) {
    console.log("Error Details :", error);
    return res.status(500).json({ message: "internal server error" });
  }
}

export async function getVideoData(req, res) {
  try {
    const { videoId } = req.params;
    const video = await Video.findOne({ youtubeId: videoId });
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
    return res
      .status(200)
      .json({ data: video, message: "Video data fetched successfully" });
  } catch (error) {
    console.log("Error Details :", error);
    return res.status(500).json({ message: "internal server error" });
  }
}
