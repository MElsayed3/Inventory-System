// src/App.tsx
// Defines all application routes (Routes) and implements basic authentication protection.

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage'; // <-- IMPORTED THE NEW DASHBOARD PAGE
// سنقوم باستيراد مكونات أخرى لاحقاً (Reports, Issue, etc.)

const App: React.FC = () => {
  // Simple check function for the presence of the JWT token
  const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
  };

  /**
   * ProtectedRoute Component:
   * Ensures that a user must be authenticated (have a token) to access the children route.
   */
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!isAuthenticated()) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };
  
  return (
    // Note: Removed the bg-gray-100 class here since we are setting a dark background in LoginPage/DashboardPage
    <div className="min-h-screen p-4"> 
      <Routes>
        {/* Default route redirects to the Login page */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Login Page Route */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Dashboard Route - Protected */}
        <Route 
            path="/dashboard" 
            element={
                <ProtectedRoute>
                    <DashboardPage /> {/* <-- USING THE NEW DashboardPage COMPONENT */}
                </ProtectedRoute>
            } 
        />
        
        {/* Inventory Report Route - Protected */}
        <Route 
            path="/report" 
            element={
                <ProtectedRoute>
                    {/* Placeholder for the Report Page */}
                    <div style={{ direction: 'rtl', color: '#f0f0f0' }}>
                        <h1>تقرير المخزون</h1>
                        <p>هذه الصفحة سيتم إنشاؤها لاحقاً بواسطة Manager أو المخزن.</p>
                    </div>
                </ProtectedRoute>
            } 
        />

        {/* Catch-all route for any undefined path */}
        <Route path="*" element={<h1>404 | الصفحة غير موجودة</h1>} />
      </Routes>
    </div>
  );
};

export default App;