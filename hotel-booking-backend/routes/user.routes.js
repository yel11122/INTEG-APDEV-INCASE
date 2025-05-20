// user.routes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller'); // Adjust path as needed
const { protect } = require('../middleware/authMiddleware'); // If you have this

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.get('/profile', protect, authController.getUserProfile);

module.exports = router;