import { Router } from "express";
const router = Router();
import { getCommunityMessages, sendMessage, voteMessage } from "../controllers/message.controller.js";

// Get all chat messages in a community
router.get("/communities/:id/chat", getCommunityMessages);

// Send a message in a community chat
router.post("/communities/:id/chat", sendMessage);

// Vote on a specific message
router.post("/messages/:id/vote", voteMessage);

export default router;
