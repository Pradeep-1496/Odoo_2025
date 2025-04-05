import express from "express";
import { createSubmission } from "../controllers/submission.controller.js";
import upload from "../middlewares/multer.js";
import { verifyJWT } from "../middlewares/auth.js"; // Handles file upload

const router = express.Router();

router.post("/", upload.array("images", 5),verifyJWT, createSubmission);

export default router;
