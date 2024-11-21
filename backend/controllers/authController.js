const User = require("../models/User");

// Signup function
exports.signup = async (req, res) => {
  console.log("Signup endpoint hit with request body:", req.body);

  try {
    const { firstName, lastName, phone, email, password } = req.body;

    // More robust validation
    if (!firstName || !lastName || !phone || !email || !password) {
      console.warn("Validation failed: Missing fields.");
      return res.status(400).json({ message: "All fields are required." });
    }

    // Additional email and phone validation
    const phoneRegex = /^[0-9]{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!phoneRegex.test(phone)) {
      console.warn("Validation failed: Invalid phone number format.");
      return res.status(400).json({ message: "Invalid phone number format." });
    }

    if (!emailRegex.test(email)) {
      console.warn("Validation failed: Invalid email format.");
      return res.status(400).json({ message: "Invalid email format." });
    }

    console.log("Checking for existing user...");
    const existingUser = await User.findOne({
      $or: [{ phone }, { email }],
    });

    if (existingUser) {
      console.warn(
        `Validation failed: User already exists with ${
          existingUser.phone === phone ? "phone" : "email"
        }.`
      );
      return res.status(400).json({
        message: "Phone number or email already exists.",
      });
    }

    console.log("Creating new user...");
    const newUser = new User({
      firstName,
      lastName,
      phone,
      email,
      password,
    });

    const savedUser = await newUser.save();
    console.log("MongoDB Save Result:", savedUser);

    res.status(201).json({
      message: "Signup successful!",
      user: {
        _id: savedUser._id,
        firstName: savedUser.firstName,
        phone: savedUser.phone,
      },
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({
      message: "Error registering user",
      error: error.message,
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
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Role selection error:", error);
    res.status(500).json({
      message: "Error selecting role",
      error: error.message,
    });
  }
};

//login function
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check password
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    return res
      .status(200)
      .json({
        message: "Login successful.",
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
      });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  }
};
