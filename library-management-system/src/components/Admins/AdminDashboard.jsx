import React from 'react';
import { useLocation } from 'react-router-dom';

const AdminDashboard = () => {
  const location = useLocation();
    const { role } = location.state || {};
    console.log("admin Dashboard",role);
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <p className="text-center mt-4">Your role: {role}</p>
      <p>Welcome to the Admin Dashboard. You can manage books by clicking on "Manage Books" in the navigation bar.</p>
      {/* Add any other admin-related content or features here */}
    </div>
  );
};

export default AdminDashboard;