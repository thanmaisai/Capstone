import React, { useState } from 'react';

export default function Login() {
    const [formData, setFormData] = useState({
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

    const handleRoleSelect = (role) => {
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
                <h5 className="text-2xl font-bold mb-6 text-center">Login</h5>
                <form onSubmit={handleSubmit} className="space-y-4">
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
                    <div className="flex space-x-4">
                        <button
                            type="button"
                            className={`p-2 w-full rounded ${formData.role === 'admin' ? 'bg-purple-600 text-white' : 'bg-gray-300'}`}
                            onClick={() => handleRoleSelect('admin')}
                        >
                            Admin
                        </button>
                        <button
                            type="button"
                            className={`p-2 w-full rounded ${formData.role === 'user' ? 'bg-purple-600 text-white' : 'bg-gray-300'}`}
                            onClick={() => handleRoleSelect('user')}
                        >
                            User
                        </button>
                    </div>
                    <button className="bg-purple-600 text-white p-2 w-full rounded hover:bg-purple-700 focus:outline-none" type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}
