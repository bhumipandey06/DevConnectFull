// backend/routes/formRoutes.js
const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile")

router.post("/submit", async (req, res) => {
  try {
    const {
      name,
      bio,
      github,
      linkedin,
      portfolio,
      techStack,
      profileImage,
    } = req.body;

    // Create and save a new Profile
    const newProfile = new Profile({
      name,
      bio,
      github,
      linkedin,
      portfolio,
      techStack,
      profileImage,
    });

    await newProfile.save();

    res.status(201).json({ success: true, message: "Profile saved to database" });
  } catch (err) {
    console.error("Error saving profile:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/profiles", async (req, res) => {
  try {
    const profiles = await Profile.find().sort({ createdAt: -1 }); // recent first
    res.status(200).json({ success: true, data: profiles });
  } catch (err) {
    console.error("Error fetching profiles:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// GET /api/:id - Get profile by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await Profile.findById(id);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.status(200).json(profile);
  } catch (error) {
    console.error("Error fetching profile by ID:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/:id - delete a profile by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProfile = await Profile.findByIdAndDelete(id);
    if (!deletedProfile) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }

    res.status(200).json({ success: true, message: "Profile deleted successfully" });
  } catch (error) {
    console.error("Error deleting profile:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


module.exports = router;
