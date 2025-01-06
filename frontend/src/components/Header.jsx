import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo1.png';
import axios from 'axios';

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
        <header>
            <nav>
                <div className="container mx-auto flex items-center justify-between px-6 py-4">
                    {/* Brand Logo */}

                    <div className=" flex text-2xl font-heading font-bold text-primary-500">
                        <img className=' mx-2 w-[40px] h-[40px]' src={logo} alt="" />
                        <Link to="/">MyndFull</Link>

                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:flex space-x-10">
                        <a href="/aboutus" className="text-text-600 hover:text-primary-500 transition-colors font-body">
                            ABOUT US
                        </a>
                        <NavLink
                            to="/login"
                            className="text-text-600 hover:text-primary-500 transition-colors font-body"
                        >
                            LOGIN
                        </NavLink>
                        <a href="mailto:myndfull@gmail.com" className="text-text-600 hover:text-primary-500 transition-colors font-body">
                            CONTACT US
                        </a>
                        <button
                            onClick={handleLogout}
                            className="text-text-600 hover:text-primary-500 transition-colors font-body"
                        >
                            LOGOUT
                        </button>
                        <NavLink to="/profile" className="text-text-600 hover:text-primary-500 transition-colors font-body">
                            PROFILE
                        </NavLink>
                        {/* TODO: Add logout functionality */}
                    </div>

                    {/* Mobile Menu */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-text-600 hover:text-primary-500 transition-colors font-body"
                        >
                            MENU
                        </button>
                        {isMenuOpen && (
                            <div className="flex flex-col space-y-2">
                                <a href="/aboutus" className="text-text-600 hover:text-primary-500 transition-colors font-body">
                                    ABOUT US
                                </a>
                                <NavLink
                                    to="/login"
                                    className="text-text-600 hover:text-primary-500 transition-colors font-body"
                                >
                                    LOGIN
                                </NavLink>
                                <a href="mailto:myndfull@gmail.com" className="text-text-600 hover:text-primary-500 transition-colors font-body">
                                    CONTACT US
                                </a>
                                <button
                                    onClick={handleLogout}
                                    className="text-text-600 hover:text-primary-500 transition-colors font-body"
                                >
                                    LOGOUT
                                </button>
                                <NavLink to="/profile" className="text-text-600 hover:text-primary-500 transition-colors font-body">
                                    PROFILE
                                </NavLink>
                            </div>
                        )}
                    </div>

                    {/* CTA Button */}
                    <button className="border-2 border-primary-500 text-primary-500 rounded-full px-6 py-2 hover:bg-primary-500 hover:text-text-50 transition-colors font-body">
                        <NavLink to="/signup">GET STARTED →</NavLink>
                    </button>
                </div>
            </nav>
        </header>
    );
}

export default Header;
