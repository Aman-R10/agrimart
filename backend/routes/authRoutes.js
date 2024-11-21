const express = require('express');
const { signup, selectRole , login} = require('../controllers/authController');

const router = express.Router();

// Signup route
router.post('/signup', signup);

// Role selection route
router.post('/select-role', selectRole);

//login route
router.post('/login' , login);

module.exports = router;
