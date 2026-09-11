import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomeLanding from './pages/HomeLanding';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { clearSession, getSession } from './auth';

function App() {
  const [loggedIn, setLoggedIn] = useState(() => Boolean(getSession()));

  const handleLogout = () => {
    clearSession();
    setLoggedIn(false);
  };

  return (
    <Routes>
      {/* 1. First Home Page (Landing with Signup/Login buttons) */}
      <Route path="/" element={<HomeLanding />} />
      
      {/* 2. Authentication Pages */}
      <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
      <Route path="/register" element={<Register />} />
      
      {/* 3. Protected Success Dashboard */}
      <Route 
        path="/dashboard" 
        element={loggedIn ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/login" replace />} 
      />
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;