import multer from "multer";

const storage = multer.memoryStorage(); // Store files in memory as Buffer

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
});

export default upload;
