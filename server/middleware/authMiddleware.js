// server/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET; // authController.js

// Middleware to verify JWT token and extract user role 
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Expecting 'Bearer TOKEN'

    if (token == null) {
        return res.sendStatus(401).json({ message: 'Authorization token required.' }); // No token provided
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.sendStatus(403).json({ message: 'Invalid or expired token.' }); // Invalid token
        }
        req.user = user; // Store user data (employeeCode, role) in the request 
        next();
    });
}

// Middleware to check if the user has a specific role
function checkRole(requiredRole) {
    return (req, res, next) => {
        if (req.user.role !== requiredRole) {
            return res.status(403).json({ message: 'Access denied. Insufficient privileges.' });
        }
        next();
    };
}

module.exports = { 
    authenticateToken, 
    checkRole 
};