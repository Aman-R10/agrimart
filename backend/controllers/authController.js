// controllers/authController.js
const User = require("../models/userModel");
const validate = require("../utils/validate");

exports.signUp = async (req, res) => {
  const { firstName, lastName, phoneNumber, email, password, role } = req.body;

  // Basic validation
  if (!validate.requiredFields(req.body, ["firstName", "lastName", "phoneNumber", "role"])) {
    return res.status(400).json({ error: "Required fields are missing" });
  }

  try {
    const user = new User({ firstName, lastName, phoneNumber, email, password, role });
    await user.save();
    res.status(201).json({ message: "User registered successfully", user: user._id });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};
