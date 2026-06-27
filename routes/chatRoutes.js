import express from "express";
import { chatAI } from "../controllers/chatController.js";

const router = express.Router();

router.post("/:videoId", chatAI);

export default router;
