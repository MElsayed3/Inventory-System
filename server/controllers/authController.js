// authController.js

const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET; 

async function login(req, res) {
    const { employee_code, password } = req.body;

    try {
        const userResult = await db.query(
            'SELECT employee_code, password_hash, user_role FROM Users WHERE employee_code = $1', 
            [employee_code]
        );

        if (userResult.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials or user not found.' });
        }

        const user = userResult.rows[0];
        
       
        const match = await bcrypt.compare(password, user.password_hash);
        
        if (!match) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        //create JWT token ends in one hour
        const token = jwt.sign(
            { employeeCode: user.employee_code, role: user.user_role }, 
            SECRET_KEY, 
            { expiresIn: '1h' } 
        );

        // send token and role to client
        res.json({ token, role: user.user_role, message: 'Login successful' });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error during login.' });
    }
}

module.exports = { login };