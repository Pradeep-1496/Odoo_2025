import express from "express";
import {
  createCommunity,
  getAllCommunities,
  joinCommunity,
  leaveCommunity
  
} from "../controllers/community.controller.js";
import { verifyJWT } from "../middlewares/auth.js";

const router = express.Router();

// Public route - no auth
router.get("/", getAllCommunities);
router.post("/create",verifyJWT,createCommunity);

// Authenticated routes
router.post("/:id/join", verifyJWT, joinCommunity);
router.post("/:id/leave", verifyJWT, leaveCommunity);
// router.get("/:id/chat", verifyJWT, getCommunityChat);
// router.post("/:id/chat", verifyJWT, sendChatMessage);
// router.post("/messages/:id/vote", verifyJWT, voteOnMessage);

export default router;
