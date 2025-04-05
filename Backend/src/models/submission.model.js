import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Post', 'Idea', 'Complain'],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  images: [String], // Array of image URLs (Cloudinary or local path)
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Submission', submissionSchema);
