// server/routes/inventoryRoutes.js

const express = require('express');
const router = express.Router();
const { issueItem, returnItem, createItem } = require('../controllers/inventoryController'); // <-- Updated import
const { getStockStatus } = require('../controllers/reportController'); 
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

// Route for creating a new item (Allowed for 'مدير' and 'مخزن' roles)
router.post(
    '/item/create', 
    authenticateToken, 
    (req, res, next) => { // Custom role check for two roles: Manager or Store Keeper
        if (req.user.role === 'مدير' || req.user.role === 'مخزن') {
            next();
        } else {
            res.status(403).json({ message: 'Access denied. Only Manager and Store Keeper can create items.' });
        }
    },
    createItem
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