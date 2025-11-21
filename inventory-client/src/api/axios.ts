// src/api/axios.ts

import axios from 'axios';

// Set the base URL for the backend server
const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;