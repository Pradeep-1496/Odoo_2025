import mongoose from "mongoose";

const chatMessageSchema = new mongoose.Schema({
  community: { type: mongoose.Schema.Types.ObjectId, ref: "Community",required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" ,required: true},
  message: { type: String, required: true },
  
  votes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  timestamp: { type: Date, default: Date.now },
});

export const ChatMessage = mongoose.model("ChatMessage", chatMessageSchema);
