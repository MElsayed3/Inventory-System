// server/routes/index.js

const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const inventoryRoutes = require('./inventoryRoutes');

// Use specific routes 
router.use('/auth', authRoutes);
router.use('/inventory', inventoryRoutes);

module.exports = router;