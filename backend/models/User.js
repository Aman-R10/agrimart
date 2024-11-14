// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String },
  password: { type: String },
  role: { type: String, enum: ['buyer', 'seller', 'farmer', 'landowner'], default: 'buyer' }
});

module.exports = mongoose.model('User', userSchema);
