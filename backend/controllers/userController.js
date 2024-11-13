// controllers/userController.js
const User = require("../models/userModel");

exports.getUserProfile = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId).select("-password"); // Exclude password
    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};
