import {ChatMessage} from "../models/chatMessage.model.js";

// GET /api/communities/:id/chat – Get all chat messages for a community
const getCommunityMessages = async (req, res) => {
  try {
    const { id } = req.params;
    const messages = await ChatMessage.find({ community: id }).populate("sender", "name email").sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching chat messages", error });
  }
};

// POST /api/communities/:id/chat – Send a new chat message
const sendMessage = async (req, res) => {
  try {
    const { id } = req.params; // communityId
    const { userId, text } = req.body;

    const newMessage = new Message({
      community: id,
      sender: userId,
      text,
    });

    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: "Error sending message", error });
  }
};

// POST /api/messages/:id/vote – Vote (like/upvote) a chat message
const voteMessage = async (req, res) => {
  try {
    const { id } = req.params; // messageId
    const { userId } = req.body;

    const message = await ChatMessage.findById(id);
    if (!message) return res.status(404).json({ message: "Message not found" });

    if (!message.votes.includes(userId)) {
      message.votes.push(userId);
      await message.save();
    }

    res.status(200).json({ message: "Voted successfully", votes: message.votes.length });
  } catch (error) {
    res.status(500).json({ message: "Error voting message", error });
  }
};

export {
    getCommunityMessages,voteMessage,sendMessage
}