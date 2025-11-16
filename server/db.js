// server/db.js

require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,        // Read from .env
    host: process.env.DB_HOST,        // Read from .env
    database: process.env.DB_DATABASE, // Read from .env
    password: process.env.DB_PASSWORD, // Read from .env
    port: process.env.DB_PORT,        // Read from .env
});

// Test connection
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('PostgreSQL connected successfully.');
    }
});

module.exports = {
    // A simplified method to run queries
    query: (text, params) => pool.query(text, params),
};