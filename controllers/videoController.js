import { extractYoutubeId, scrapeTranscript } from "../utils/youtubeHelper.js";
import Video from "../models/VideoSchema.js";
import { summarizeWithAI } from "../utils/aiHelper.js";
import { YoutubeTranscript } from "youtube-transcript";

export async function summarizeVideo(req, res) {
  try {
    //ambil url dan cek url
    const { url } = req.body;
    console.log("url", url);
    if (!url) {
      return res.status(400).json({ message: "Url is empty" });
    }

    //ekstraksi url yt
    const videoId = extractYoutubeId(url);
    if (!videoId) {
      return res.status(400).json({ message: "Invalid video URL" });
    }

    //check, if video already summarized
    const existing = await Video.findOne({ youtubeId: videoId });
    console.log("existing", existing);
    if (existing) {
      return res
        .status(200)
        .json({ message: "Video already summarized", data: existing });
    }

    //if not, scrape transcript
    const transcript = await scrapeTranscript(videoId);
    console.log("Transcript length:", transcript.length);
    const summary = await summarizeWithAI(transcript);
    console.log("Summary:", summary);

    const video = await Video.create({
      youtubeId: videoId,
      title: `Video ${videoId}`,
      summary,
    });

    return res.status(201).json({
      message: "Video summarized successfully",
      data: video,
    });
  } catch (e) {
    console.log("ERROR DETAIL : " + e);
    return res.status(500).json({ message: "Internal server error" });
  }
}
