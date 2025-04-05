import { Router } from "express";
import { getProfile, createOrUpdateProfile, deleteProfile } from "../controllers/profile.controller.js";
import { verifyJWT } from "../middlewares/auth.js";
import upload from "../middlewares/upload.js";

const router = Router();

router.get("/me", verifyJWT, getProfile); // Get profile
router.post("/", verifyJWT,  upload.single("avatar"),createOrUpdateProfile); // Create or update profile
router.delete("/", verifyJWT, deleteProfile); // Delete profile

export default router;
