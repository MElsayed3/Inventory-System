// server/routes/inventoryRoutes.js

const express = require('express');
const router = express.Router();
const { issueItem, returnItem } = require('../controllers/inventoryController');
const { getStockStatus } = require('../controllers/reportController'); // <-- NEW IMPORT
const { authenticateToken, checkRole } = require('../middleware/authMiddleware');

// Route for issuing items (Only 'مخزن' role)
router.post(
    '/issue', 
    authenticateToken, 
    checkRole('مخزن'), 
    issueItem
);

// Route for returning items (Only 'صيانة' role)
router.post(
    '/return', 
    authenticateToken, 
    checkRole('صيانة'), 
    returnItem
);

// Route for getting the stock report (Allowed for 'مدير' and 'مخزن' roles)
router.get(
    '/report', 
    authenticateToken, 
    (req, res, next) => { // Custom role check for two roles
        if (req.user.role === 'مدير' || req.user.role === 'مخزن') {
            next();
        } else {
            res.status(403).json({ message: 'Access denied. Only Manager and Store Keeper can view the report.' });
        }
    },
    getStockStatus
);

module.exports = router;