// server/server.js

const express = require('express');
const allRoutes = require('./routes');
require('./db'); // Initialize DB connection pool 

const app = express();
const PORT = 3000;

// Middleware Setup 
app.use(express.json()); // To parse JSON bodies 

// Routes Setup 
app.use('/api', allRoutes);

// Basic Route for testing 
app.get('/', (req, res) => {
    res.send('Inventory System API is running.');
});

// Start Server 
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});