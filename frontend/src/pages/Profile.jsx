import React, { useState, useEffect } from 'react';
import { FiUser, FiMail, FiMapPin, FiCamera } from 'react-icons/fi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        avatar: null
    });
    const [previewImage, setPreviewImage] = useState(null);
    const [error, setError] = useState('');

    // Fetch user profile data on component mount
    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/v1/users/current-user', {
                withCredentials: true
            });


            if (response.data.data) {
                const userData = response.data.data;
                setFormData({
                    fullName: userData.fullName || '',
                    email: userData.email || '',
                    avatar: userData.avatar || null
                });

                // Set preview image if avatar exists
                if (userData.avatar) {
                    setPreviewImage(userData.avatar);
                }
            }
        } catch (err) {
            console.error('Profile fetch error:', err);
            if (err.response?.status === 401) {
                // Redirect to login if unauthorized
                navigate('/login');
            } else {
                setError('Failed to fetch profile data');
            }
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, avatar: file }));
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const formDataToSend = new FormData();

            // Only append avatar if a new file was selected
            if (formData.avatar instanceof File) {
                formDataToSend.append('avatar', formData.avatar);
            }

            // Always append other fields
            formDataToSend.append('fullName', formData.fullName);
            // formDataToSend.append('location', formData.location || '');

            const response = await axios.patch('http://localhost:8000/api/v1/users/profile', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true
            });

            // Update local storage with new user data
            const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
            localStorage.setItem('user', JSON.stringify({
                ...currentUser,
                ...response.data.data
            }));

            setLoading(false);
            // Optional: Show success message
            alert('Profile updated successfully!');
        } catch (error) {
            setLoading(false);
            setError(error.response?.data?.message || 'Error updating profile');
        }
    };

    return (
        <div className="min-h-screen bg-background py-6">
            <nav className='shadow-md bg-white'>
                <h1 className="text-2xl px-4 mx-5 font-heading font-bold text-primary-500 mb-8">
                    Profile Settings
                </h1></nav>
            <div className="max-w-4xl mx-auto px-4">

                {error && (
                    <div className="mb-4 p-4 bg-red-100 text-red-600 rounded-lg">
                        {error}
                    </div>
                )}

                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    {/* Profile Header with Avatar */}
                    <div className="relative bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-16">
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                            <div className="relative">
                                <img
                                    className="w-32 h-32 rounded-full border-4 border-white object-cover"
                                    src={previewImage || "/default-avatar.png"}
                                    alt={formData.fullName || "Profile"}
                                />
                                <label className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md cursor-pointer hover:bg-gray-50 transition-colors">
                                    {/* <FiCamera className="w-5 h-5 text-primary-500" /> */}
                                    <input
                                        type="file"
                                        onChange={handleImageChange}
                                        className="hidden"
                                        accept="image/*"
                                        disabled
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Profile Form */}
                    <form onSubmit={handleSubmit} className="p-6 pt-20 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Full Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiUser className="text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        value={formData.fullName}
                                        onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                                        className="pl-10 w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        placeholder="Enter your full name"
                                        disabled
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiMail className="text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        disabled // Email should not be editable
                                        className="pl-10 w-full px-4 py-3 rounded-lg border bg-gray-50 cursor-not-allowed"
                                        placeholder="Enter your email"
                                    />
                                </div>
                            </div>

                            {/* Location */}
                            {/* <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Location
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiMapPin className="text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        value={formData.location}
                                        onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                                        className="pl-10 w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        placeholder="Enter your location"
                                    />
                                </div>
                            </div> */}
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`px-6 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors
                                    ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {loading ? 'Updating...' : 'Update Profile'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;