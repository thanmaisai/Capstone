import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SIGNUP_USER } from '../../gqloperations/mutations'; // Adjust the path as necessary

export default function Signup() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 'user' // Default role
    });
    const [signupUser, { data, loading, error }] = useMutation(SIGNUP_USER);

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
        signupUser({
            variables: { userNew: formData }
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h5 className="text-2xl font-bold mb-6 text-center">Sign Up</h5>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {loading && <p>Loading...</p>}
                    {error && <div className="bg-red-500 text-white p-2 rounded">{error.message}</div>}
                    {data && data.signupUser && (
                        <div className="bg-green-500 text-white p-2 rounded">
                            {data.signupUser.firstName} is signed up. You can log in now!
                        </div>
                    )}
                    
                    <input
                        type="text"
                        placeholder="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-purple-500"
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-purple-500"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-purple-500"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
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
