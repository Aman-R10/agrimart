// authController.js
const User = require("../models/User"); // Path to your User model

exports.signUp = async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, email, password, role } = req.body;

    // Sanitize empty email and password
    const sanitizedEmail = email.trim() === "" ? null : email;
    const sanitizedPassword = password.trim() === "" ? null : password;

    // Create a new user with sanitized data
    const newUser = new User({
      firstName,
      lastName,
      phoneNumber,
      email: sanitizedEmail,
      password: sanitizedPassword,
      role,
    });

    await newUser.save();
    res.status(200).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Signup error:", error);
    if (error.code === 11000) {
      return res.status(400).json({ message: "Duplicate data found" });
    }
    res.status(500).json({ message: "Server error during signup" });
  }
};


// Update Role Controller
exports.updateRole = async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;

  if (!['buyer', 'seller', 'farmer', 'landowner'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role selected.' });
  }

  try {
    const user = await User.findByIdAndUpdate(userId, { role }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.status(200).json({ message: 'Role updated successfully' });
  } catch (error) {
    console.error('Role update error:', error);
    res.status(500).json({ message: 'Server error during role update.' });
  }
};
