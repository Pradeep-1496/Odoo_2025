import Submission from "../models/submission.model.js";
import cloudinary from "../utils/cloudinary.js"; 

export const createSubmission = async (req, res) => {
  try {
    const { type, content } = req.body;

    let imageUrls = [];

    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map(file =>
        cloudinary.uploader.upload(file.path)
      );

      const uploadResults = await Promise.all(uploadPromises);
      imageUrls = uploadResults.map(result => result.secure_url);
    }

    const newSubmission = new Submission({
      type,
      content,
      images: imageUrls,
    });

    await newSubmission.save();

    res.status(201).json({ message: "Submission saved", submission: newSubmission });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
