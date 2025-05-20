import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLogin from '../Screens/AdminLogin';         // Make sure this file exists
import AdminDashboard from '../Screens/AdminDashboard'; // Make sure this file exists

const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLogin />} />
      <Route path="/dashboard" element={<AdminDashboard />} />
    </Routes>
  );
};

export default AdminRoutes;
