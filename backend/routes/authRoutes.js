const express = require('express');
const { signup, selectRole } = require('../controllers/authController');

const router = express.Router();

// Signup route
router.post('/signup', signup);

// Role selection route
router.post('/select-role', selectRole);

module.exports = router;
