const User = require("../models/User");

// Signup function
exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, phone, email, password } = req.body;

    // More robust validation
    if (!firstName || !lastName || !phone || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Additional email and phone validation
    const phoneRegex = /^[0-9]{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ message: "Invalid phone number format." });
    }

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    const existingUser = await User.findOne({ 
      $or: [{ phone }, { email }] 
    });

    if (existingUser) {
      return res.status(400).json({ 
        message: "Phone number or email already exists." 
      });
    }

    const newUser = new User({ 
      firstName, 
      lastName, 
      phone, 
      email, 
      password 
    });

    const savedUser = await newUser.save();
    console.log('MongoDB Save Result:', savedUser);
    res.status(201).json({
      message: "Signup successful!",
      user: { 
        _id: savedUser._id, 
        firstName: savedUser.firstName, 
        phone: savedUser.phone 
      },
    });    
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ 
      message: "Error registering user", 
      error: error.message 
    });
  }
};

exports.selectRole = async (req, res) => {
  try {
    const { userId, role } = req.body;

    const validRoles = ["buyer", "seller", "farmer", "landowner"];
    if (!role || !validRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role selected." });
    }

    const user = await User.findByIdAndUpdate(
      userId, 
      { role }, 
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ 
      message: "Role selected successfully!", 
      user: {
        _id: user._id,
        firstName: user.firstName,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Role selection error:", error);
    res.status(500).json({ 
      message: "Error selecting role", 
      error: error.message 
    });
  }
};