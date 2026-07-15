import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["user", "ai"],
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const VideoSchema = new mongoose.Schema(
  {
    youtubeId: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    thumbnailUrl: String,
    chats: [ChatSchema],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Video", VideoSchema);
