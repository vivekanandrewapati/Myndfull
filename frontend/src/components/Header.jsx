import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo1.png';
import axios from 'axios';
import { FiMenu, FiX } from 'react-icons/fi';

function Header() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:8000/api/v1/users/logout', {}, {
                withCredentials: true
            });

            // Clear all auth-related data
            localStorage.clear();

            // Use navigate instead of window.location for cleaner routing
            navigate('/login', { replace: true });
        } catch (error) {
            console.error('Logout error:', error);
            // Clear data even if API call fails
            localStorage.clear();
            navigate('/login', { replace: true });
        }
    };

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <nav className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    {/* Brand Logo - Responsive at all sizes */}
                    <div className="flex items-center space-x-2">
                        <img
                            className="w-[25px] h-[25px] sm:w-[30px] sm:h-[30px] lg:w-[40px] lg:h-[40px]"
                            src={logo}
                            alt="MyndFull Logo"
                        />
                        <Link
                            to="/"
                            className="text-lg sm:text-xl lg:text-2xl font-heading font-bold text-primary-500"
                        >
                            MyndFull
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-3 xl:space-x-6">
                        <NavLink
                            to="/aboutus"
                            className="text-sm xl:text-base text-text-600 hover:text-primary-500 transition-colors font-body whitespace-nowrap"
                        >
                            ABOUT US
                        </NavLink>
                        <NavLink
                            to="/login"
                            className="text-sm xl:text-base text-text-600 hover:text-primary-500 transition-colors font-body whitespace-nowrap"
                        >
                            LOGIN
                        </NavLink>
                        <a
                            href="mailto:myndfull@gmail.com"
                            className="text-sm xl:text-base text-text-600 hover:text-primary-500 transition-colors font-body whitespace-nowrap"
                        >
                            CONTACT US
                        </a>
                        <button
                            onClick={handleLogout}
                            className="text-sm xl:text-base text-text-600 hover:text-primary-500 transition-colors font-body whitespace-nowrap"
                        >
                            LOGOUT
                        </button>
                        {/* <NavLink
                            to="/profile"
                            className="text-sm xl:text-base text-text-600 hover:text-primary-500 transition-colors font-body whitespace-nowrap"
                        >
                            PROFILE
                        </NavLink> */}
                        <NavLink
                            to="/signup"
                            className="border-2 border-primary-500 text-primary-500 rounded-full px-4 xl:px-6 py-1.5 xl:py-2 text-sm xl:text-base hover:bg-primary-500 hover:text-white transition-colors font-body whitespace-nowrap"
                        >
                            GET STARTED →
                        </NavLink>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden flex items-center space-x-3">
                        <NavLink
                            to="/signup"
                            className="border-2 border-primary-500 text-primary-500 rounded-full px-3 py-1 text-sm hover:bg-primary-500 hover:text-white transition-colors font-body whitespace-nowrap"
                        >
                            GET STARTED
                        </NavLink>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-primary-500 p-1.5 hover:bg-primary-50 rounded-md transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown - Improved Animation and Styling */}
                {isMenuOpen && (
                    <div className="lg:hidden fixed inset-0 top-[57px] bg-white shadow-lg overflow-y-auto animate-fadeIn">
                        <div className="container mx-auto px-4 py-4 space-y-2">
                            <NavLink
                                to="/aboutus"
                                className="block text-sm font-medium text-text-600 hover:text-primary-500 transition-colors font-body py-3 border-b border-gray-100"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                ABOUT US
                            </NavLink>
                            <NavLink
                                to="/login"
                                className="block text-sm font-medium text-text-600 hover:text-primary-500 transition-colors font-body py-3 border-b border-gray-100"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                LOGIN
                            </NavLink>
                            <a
                                href="mailto:myndfull@gmail.com"
                                className="block text-sm font-medium text-text-600 hover:text-primary-500 transition-colors font-body py-3 border-b border-gray-100"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                CONTACT US
                            </a>
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setIsMenuOpen(false);
                                }}
                                className="block w-full text-left text-sm font-medium text-text-600 hover:text-primary-500 transition-colors font-body py-3 border-b border-gray-100"
                            >
                                LOGOUT
                            </button>
                            {/* <NavLink
                                to="/profile"
                                className="block text-sm font-medium text-text-600 hover:text-primary-500 transition-colors font-body py-3 border-b border-gray-100"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                PROFILE
                            </NavLink> */}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}

export default Header;
