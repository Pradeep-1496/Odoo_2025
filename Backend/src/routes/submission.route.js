import express from "express";
import { createSubmission } from "../controllers/submission.controller.js";
import upload from "../middlewares/multer.js"; // Handles file upload
import { verifyJWT } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", upload.array("images", 5), createSubmission);

export default router;
