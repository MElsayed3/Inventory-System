// src/pages/LoginPage.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/authService'; // Import the service function
import type { LoginRequest } from '../types/auth'; // Import the LoginRequest Type

const LoginPage: React.FC = () => {
  const [credentials, setCredentials] = useState<LoginRequest>({
    employee_code: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
    setError(null); // Clear previous errors
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // 1. Call the API login function
      const response = await login(credentials);

      // 2. Store user data and token in Local Storage
      localStorage.setItem('token', response.token);
      localStorage.setItem('role', response.role);
      localStorage.setItem('employeeCode', response.employeeCode);

      // 3. Navigate to the protected Dashboard route
      navigate('/dashboard'); 

    } catch (err: any) {
      // 4. Display the error message from the server
      setError(err.message || 'An unexpected error occurred during login.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // **** Centering the Form using Flexbox ****
    <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh', 
        width: '100%', // Ensure it takes full available width
        direction: 'rtl', // Ensure Right-to-Left context for Arabic text flow
        backgroundColor: '#242424', 
        padding: '20px' 
    }}>
      <div style={{ 
          padding: '30px', 
          maxWidth: '400px', 
          width: '100%', 
          border: '1px solid #444', 
          borderRadius: '12px',
          backgroundColor: '#333', 
          boxShadow: '0 8px 16px rgba(0,0,0,0.4)'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#f0f0f0' }}>تسجيل الدخول - نظام المخزون</h2>
        
        {error && <p style={{ 
          color: '#ff6b6b', 
          backgroundColor: '#444', 
          border: '1px solid #ff6b6b', 
          padding: '10px', 
          marginBottom: '15px',
          borderRadius: '4px'
        }}>{error}</p>}
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#ccc' }}>كود الموظف:</label>
            <input
              type="text"
              name="employee_code"
              value={credentials.employee_code}
              onChange={handleChange}
              required
              disabled={isLoading}
              style={{ width: '100%', padding: '10px', boxSizing: 'border-box', backgroundColor: '#444', border: '1px solid #555', color: '#fff', borderRadius: '4px' }}
            />
          </div>
          
          <div style={{ marginBottom: '30px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#ccc' }}>كلمة المرور:</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              disabled={isLoading}
              style={{ width: '100%', padding: '10px', boxSizing: 'border-box', backgroundColor: '#444', border: '1px solid #555', color: '#fff', borderRadius: '4px' }}
            />
          </div>
          
          <button type="submit" disabled={isLoading} style={{ 
            width: '100%', 
            padding: '12px 15px', 
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: 'pointer', 
            fontSize: '18px',
            transition: 'background-color 0.3s'
          }}>
            {isLoading ? 'جاري التحميل...' : 'تسجيل الدخول'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;