import {Community} from "../models/community.model.js";
import {ChatMessage} from "../models/chatMessage.model.js";

export async function createCommunity(req, res) {
  try {
    const { name, description, coverImage, userId } = req.body;

    const existing = await Community.findOne({ name });
    if (existing) {
      return res.status(400).json({ message: "Community name already exists" });
    }

    const community = new Community({
      name,
      description,
      coverImage,
      members: [userId],
    });

    const saved = await community.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("Create Community Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

const getAllCommunities = async (req, res) => {
    try {
      const communities = await Community.find().populate("members", "name email");
      res.status(200).json(communities);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch communities", error });
    }
  };
  
  // POST /api/communities/:id/join – Join a community
const joinCommunity = async (req, res) => {
    try {
      const { userId } = req.body;
      const { id } = req.params;
  
      const community = await Community.findById(id);
      if (!community) return res.status(404).json({ message: "Community not found" });
  
      if (!community.members.includes(userId)) {
        community.members.push(userId);
        await community.save();
      }
  
      res.status(200).json({ message: "Joined community successfully", community });
    } catch (error) {
      res.status(500).json({ message: "Error joining community", error });
    }
  };
  
  // POST /api/communities/:id/leave – Leave a community
 const leaveCommunity = async (req, res) => {
    try {
      const { userId } = req.body;
      const { id } = req.params;
  
      const community = await Community.findById(id);
      if (!community) return res.status(404).json({ message: "Community not found" });
  
      community.members = community.members.filter((member) => member.toString() !== userId);
      await community.save();
  
      res.status(200).json({ message: "Left community successfully", community });
    } catch (error) {
      res.status(500).json({ message: "Error leaving community", error });
    }
  };

  export {
    getAllCommunities,joinCommunity,leaveCommunity
  }