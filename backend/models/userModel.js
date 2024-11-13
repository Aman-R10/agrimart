// models/userModel.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  email: { type: String, unique: true },
  password: { type: String },
  role: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
