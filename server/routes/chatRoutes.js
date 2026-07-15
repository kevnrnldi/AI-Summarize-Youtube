import express from "express";
import { chatAI, getVideoData } from "../controllers/chatController.js";

const router = express.Router();

router.post("/:videoId", chatAI);
router.get("/:videoId", getVideoData);

export default router;
