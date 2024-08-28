import React, { useEffect, useState } from 'react';

const AdminDashboard = () => {
  const [role, setRole] = useState(null);

  useEffect(() => {
      const storedRole = localStorage.getItem('role');
      setRole(storedRole);
  }, []);

  return (
      <div className="min-h-screen bg-gray-100 p-8">
          <h1 className="text-3xl font-bold text-center">Admin Dashboard</h1>
          <p className="text-center mt-4">Your role: {role}</p>
          {/* Additional admin-specific features can go here */}
      </div>
  );
};

export default AdminDashboard;