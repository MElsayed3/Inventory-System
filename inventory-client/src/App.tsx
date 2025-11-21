import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
// سنقوم باستيراد مكونات أخرى لاحقاً (Dashboard, Reports, Issue, etc.)

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
    <div className="min-h-screen bg-gray-100 p-4">
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
                    <h1>لوحة التحكم (Dashboard)</h1>
                </ProtectedRoute>
            } 
        />
        
        {/* Inventory Report Route - Protected */}
        <Route 
            path="/report" 
            element={
                <ProtectedRoute>
                    <h1>تقرير المخزون</h1>
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