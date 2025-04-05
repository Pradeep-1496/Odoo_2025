import { Profile } from "../models/profile.model.js";
import { User } from "../models/user.model.js";
import cloudinary from "../utils/cloudinary.js"; // Cloudinary helper for image uploads

// @desc    Get user profile
// @route   GET /api/profile/me
// @access  Private
export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id }).populate("user", "email fullName");

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Create or update user profile
// @route   POST /api/profile
// @access  Private


export const createOrUpdateProfile = async (req, res) => {
  try {
    //console.log("Received Payload:", req.body); 

    // Extract required fields
    const {  address, city, state, pincode, aadharNumber, phoneNumber } = req.body;

    // Validate required fields
    if ( !pincode || !aadharNumber) {
      return res.status(400).json({ message: " Pincode, and Aadhar Number are required." });
    }

    let profile = await Profile.findOne({ user: req.user._id });

    if (!profile) {
      profile = new Profile({ user: req.user._id });
    }

    // If an avatar file is uploaded, upload it to Cloudinary
    if (req.file) {
      const uploadResponse = cloudinary.uploader.upload_stream(
          { folder: "avatars", width: 200, height: 200, crop: "fill" },
          async (error, result) => {
              if (error) return res.status(500).json({ message: "Image upload failed", error });

              profile.avatar = result.secure_url; // Save Cloudinary image URL
           
              profile.address = address;
              profile.city = city;
              profile.state = state;
              profile.pincode = pincode;
              profile.aadharNumber = aadharNumber;
              

              await profile.save();
              return res.status(200).json({ message: "Profile updated successfully", profile });
          }
      );

      uploadResponse.end(req.file.buffer); // Process the uploaded file
    } else {
      // No avatar, just update other profile details
      profile.birthdate = birthdate;
      profile.address = address;
      profile.city = city;
      profile.state = state;
      profile.pincode = pincode;
      profile.aadharNumber = aadharNumber;
    

      await profile.save();
      return res.status(200).json({ message: "Profile updated successfully", profile });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

  

// @desc    Delete user profile
// @route   DELETE /api/profile
// @access  Private
export const deleteProfile = async (req, res) => {
  try {
    await Profile.findOneAndDelete({ user: req.user._id });
    await User.findByIdAndDelete(req.user._id); // Also delete user account

    res.status(200).json({ message: "Profile and User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
