// server/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const { login, createUser } = require('../controllers/authController');
const { authenticateToken, checkRole } = require('../middleware/authMiddleware'); 

// Public route for user login
router.post('/login', login);

// Route for creating new users 
router.post(
    '/register',
    createUser
);

module.exports = router;