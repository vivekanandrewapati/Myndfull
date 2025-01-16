import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import loginimg from '../assets/login.avif';
import axios from 'axios';

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''

    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:8000/api/v1/users/login', formData, {
                withCredentials: true
            });
            console.log(response.data);
            if (response.data.success) {
                // Store tokens and user data
                localStorage.setItem('accessToken', response.data.data.accessToken);


                console.log('Login successful:', response.data);

                navigate('/');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-wrap min-h-screen w-full bg-background text-text-800">
            {/* Left Side - Form */}
            <div className="w-full md:w-1/2 flex flex-col justify-center p-4 sm:p-6 md:p-12 lg:p-24">
                <h1 className="text-4xl font-heading font-bold text-primary-500 mb-4">
                    Welcome Back!
                </h1>
                {error && (
                    <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-primary-500 text-white py-3 rounded-lg hover:bg-primary-600 transition-colors font-semibold"
                    >
                        Sign In
                    </button>
                </form>
            </div>
            {/* Right Side - Image */}
            <div className="hidden md:flex w-full md:w-1/2 h-screen items-center justify-center p-4">
                <img
                    src={loginimg}
                    alt="Login Illustration"
                    className="w-full h-full object-contain rounded-lg"
                />
            </div>
        </div>
    );
}

export default Login;       