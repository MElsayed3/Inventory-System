// server/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // <-- Import the CORS package
const routes = require('./routes');
const db = require('./db');
// ... (rest of the imports)

const app = express();

// 1. Define CORS options to allow access from the React/Vite client
const corsOptions = {
    // Specify the origin (the React/Vite port) allowed to access the API
    origin: 'http://localhost:5173', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    // Allow credentials (like cookies or auth headers) if necessary
    credentials: true, 
    optionsSuccessStatus: 204
};

// Apply CORS Middleware
app.use(cors(corsOptions)); // <-- Apply CORS settings

// Middlewares
app.use(bodyParser.json());
// ... (rest of the Middlewares)

// Use the main router file with the /api prefix
app.use('/api', routes);

// ... (rest of the server file)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});