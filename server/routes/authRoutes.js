// server/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');

// Public route for user login 
router.post('/login', login);

module.exports = router;