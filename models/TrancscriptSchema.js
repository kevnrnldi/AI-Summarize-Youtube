import mongoose from "mongoose";

const TranscriptSchema = new mongoose.Schema(
  {
    youtubeId: {
      type: String,
      required: true,
      unique: true,
      ref: "Video",
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
export default mongoose.model("Transcript", TranscriptSchema);
