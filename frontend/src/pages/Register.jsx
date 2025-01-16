import React, { useState } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import axios from 'axios';

import loginimg from '../assets/login.avif';
import registerimg from '../assets/register.avif';

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        email: '',
        password: '',
        avatar: null
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        if (e.target.name === "avatar") {
            setFormData(prev => ({
                ...prev,
                [e.target.name]: e.target.files[0]
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [e.target.name]: e.target.value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Create FormData object to handle file upload
            const formDataToSend = new FormData();
            formDataToSend.append('fullName', formData.fullName);
            formDataToSend.append('username', formData.username);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('password', formData.password);
            if (formData.avatar) {
                formDataToSend.append('avatar', formData.avatar);
            }

            const response = await axios.post(
                'http://localhost:8000/api/v1/users/register',
                formDataToSend,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    withCredentials: true
                }
            );

            if (response.data.success) {
                navigate('/login');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="flex flex-wrap min-h-screen w-full bg-background text-text-800">
            {/* Left Side - Form */}
            <div className="w-full md:w-1/2 flex flex-col justify-center p-4 sm:p-6 md:p-12 lg:p-24">
                <h1 className="text-4xl font-heading font-bold text-primary-500 mb-4">
                    Create Account
                </h1>
                {error && (
                    <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            required
                        />
                    </div>
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
                    {/* <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">Avatar</label>
                        <input
                            type="file"
                            name="avatar"
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            required
                        />
                    </div> */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-primary-500 text-white py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors
                            ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>
                <p className="mt-6 text-center">
                    Already have an account?{' '}
                    <Link to="/login" className="text-primary-500 hover:text-primary-600 font-semibold">
                        Login
                    </Link>
                </p>
            </div>
            {/* Right Side - Image */}
            <div className="hidden md:flex w-full md:w-1/2 h-screen items-center justify-center p-4">
                <img
                    src={registerimg}
                    alt="Register Illustration"
                    className="w-full h-full object-contain rounded-lg"
                />
            </div>
        </div>
    );
}

export default Register;