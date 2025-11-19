// server/controllers/authController.js

const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET; 

// Login function
async function login(req, res) {
    // Extract employee_code and password from request body
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
        
        const token = jwt.sign(
            { employeeCode: user.employee_code, role: user.user_role }, 
            SECRET_KEY, 
            { expiresIn: '1h' }
        );
        res.json({ token, role: user.user_role, employeeCode: user.employee_code, message: 'Login successful' });
    } catch (error) {
        console.error('Login error:', error.message);
        res.status(500).json({ message: 'Server error during login.' });
    }
}


//create user function
async function createUser(req, res) {
    const { employee_code, employee_name, password, user_role } = req.body;

    if (!employee_code || !password || !user_role || !employee_name) {
        return res.status(400).json({ message: 'Missing required user fields.' });
    }
    if (!['مخزن', 'صيانة', 'مدير'].includes(user_role)) {
        return res.status(400).json({ message: 'Invalid user role.' });
    }

    try {
        //change password to hashed password
        const password_hash = await bcrypt.hash(password, 10); 

        const result = await db.query(
            'INSERT INTO Users (employee_code, employee_name, password_hash, user_role) VALUES ($1, $2, $3, $4) RETURNING employee_code',
            [employee_code, employee_name, password_hash, user_role]
        );

        res.status(201).json({ 
            message: 'User created successfully.',
            employeeCode: result.rows[0].employee_code
        });

    } catch (error) {
        if (error.code === '23505') { 
            return res.status(409).json({ message: 'Employee code already exists.' });
        }
        console.error('User creation error:', error.message);
        res.status(500).json({ message: 'Failed to create user.' });
    }
}

module.exports = { login, createUser };