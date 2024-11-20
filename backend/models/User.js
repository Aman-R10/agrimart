const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: false,
        unique: true,
        sparse: true // This ensures MongoDB doesn't treat empty values as duplicates
    },
    password: {
        type: String,
        required: false
    },
    role: {
        type: String,
        enum: ['buyer', 'seller', 'farmer', 'landowner'],
        required: false // Make role optional
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
