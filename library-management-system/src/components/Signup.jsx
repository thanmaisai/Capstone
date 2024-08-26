import React, { useState } from 'react';

export default function Signup() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRoleChange = (role) => {
        setFormData({
            ...formData,
            role
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // Handle form submission, e.g., send data to your backend
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h5 className="text-2xl font-bold mb-6 text-center">Sign Up</h5>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="First Name"
                        name="firstName"
                        onChange={handleChange}
                        required
                        className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-purple-500"
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        name="lastName"
                        onChange={handleChange}
                        required
                        className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-purple-500"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={handleChange}
                        required
                        className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-purple-500"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={handleChange}
                        required
                        className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-purple-500"
                    />
                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={() => handleRoleChange('admin')}
                            className={`p-2 w-1/2 rounded ${formData.role === 'admin' ? 'bg-purple-600 text-white' : 'bg-gray-300 text-black'}`}
                        >
                            Admin
                        </button>
                        <button
                            type="button"
                            onClick={() => handleRoleChange('user')}
                            className={`p-2 w-1/2 rounded ${formData.role === 'user' ? 'bg-purple-600 text-white' : 'bg-gray-300 text-black'}`}
                        >
                            User
                        </button>
                    </div>
                    <button className="bg-purple-600 text-white p-2 w-full rounded hover:bg-purple-700 focus:outline-none" type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
}
