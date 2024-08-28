import React from 'react';
import { useLocation } from 'react-router-dom';

const UserDashboard = () => {
    const location = useLocation();
    const { role } = location.state || {};
    console.log("user Dashboard",role);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold text-center">User Dashboard</h1>
            <p className="text-center mt-4">Your role: {role}</p>
            {/* Additional user-specific features can go here */}
        </div>
    );
};

export default UserDashboard;