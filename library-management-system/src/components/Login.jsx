import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { LOGIN_USER } from '../gqloperations/mutations';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [signinUser, { data, loading, error }] = useMutation(LOGIN_USER);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await signinUser({
                variables: {
                    userSignin: formData
                }
            });

            if (result.data) {
                const { token, role } = result.data.signinUser;
                localStorage.setItem("token", token);

                console.log("User role" + role);

                // Redirect based on role
                if (role === 'admin') {
                    navigate('/admin-dashboard', { state: { role } });
                } else {
                    navigate('/user-dashboard', { state: { role } });
                }
            }
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    if (loading) return <h1 className="text-center text-gray-500">Loading...</h1>;

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                {error && <div className='text-red-600 mb-4'>{error.message}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
