// server/db.js

const { Pool } = require('pg');

const pool = new Pool({
    user: 'inventory_user',     
    host: 'localhost',
    database: 'inventory_db',    
    password: '12341234', 
    port: 5432,
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