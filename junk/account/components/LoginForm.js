import React, { useState } from 'react';
import { useAuth } from './path/to/AuthContext'; // Adjust the path as necessary

const LoginForm = () => {
    const { login } = useAuth();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors
        if (!formData.email || !formData.password) {
            setError('Please fill in both email and password');
            return;
        }
        const success = await login(formData.email, formData.password); // Assuming login function directly tries to authenticate
        if (!success) {
            setError('Authentication failed. Please check your credentials.');
        }
    };

    return (
        <div className="p-4 max-w-sm mx-auto bg-white border-2 border-gray-300 rounded-none">
            <h2 className="text-lg font-bold text-center text-gray-900">Login</h2>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="input-group">
                    <label htmlFor="email" className="block text-sm font-bold text-gray-700">Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email address"
                        className="mt-1 block w-full px-3 py-2 bg-white border-2 border-gray-400 rounded-none text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password" className="block text-sm font-bold text-gray-700">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="mt-1 block w-full px-3 py-2 bg-white border-2 border-gray-400 rounded-none text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                    />
                </div>
                <button type="submit" className="w-full py-2 px-4 border border-gray-400 rounded-none bg-blue-600 hover:bg-blue-700 text-white font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0">
                    Log In
                </button>
            </form>
            {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
        </div>
    );
};

export default LoginForm;
