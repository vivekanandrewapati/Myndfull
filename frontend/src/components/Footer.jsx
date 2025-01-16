import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo1.png'

function Footer() {
    return (
        <footer className="relative mt-16">
            {/* Wave SVG */}
            <div className="absolute top-0 left-0 w-full overflow-hidden -translate-y-[99%] rotate-180">
                <svg
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                    className="relative block w-full h-[40px] md:h-[60px]"
                >
                    <path
                        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                        className="fill-primary-500"
                    ></path>
                </svg>
            </div>

            {/* Footer Content */}
            <div className="bg-primary-500 text-text-50">
                <div className="w-full max-w-6xl mx-auto px-4 py-8">
                    {/* Main Footer Content */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                        {/* Brand Section */}
                        <div className="col-span-1 sm:col-span-2">
                            <div className='flex items-center mb-4'>
                                <img className='w-[30px] h-[30px] md:w-[40px] md:h-[40px] mr-2' src={logo} alt="" />
                                <h2 className="text-xl md:text-2xl font-heading font-bold">MYNDFULL</h2>
                            </div>
                            <p className="font-body text-primary-100 text-sm md:text-base">
                                Empowering your journey to mental wellness through mindfulness and support.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div className="space-y-4">
                            <h3 className="text-base md:text-lg font-heading font-semibold mb-4">
                                Quick Links
                            </h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link to="/" className="text-sm md:text-base text-primary-100 hover:text-text-50">
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/aboutus" className="text-sm md:text-base text-primary-100 hover:text-text-50">
                                        About
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/home" className="text-sm md:text-base text-primary-100 hover:text-text-50">
                                        Services
                                    </Link>
                                </li>
                                <li>
                                    <Link to="mailto:myndfull@gmail.com" className="text-sm md:text-base text-primary-100 hover:text-text-50">
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-4">
                            <h3 className="text-base md:text-lg font-heading font-semibold mb-4">
                                Contact Us
                            </h3>
                            <ul className="space-y-2 text-sm md:text-base text-primary-100">
                                <li>Email: info@myndfull.com</li>
                                <li>Phone: (555) 123-4567</li>
                                <li>Address: 123 Wellness St.</li>
                            </ul>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="flex justify-center space-x-6 mb-8">
                        <a href="#" className="text-primary-100 hover:text-text-50">
                            <span className="sr-only">Facebook</span>
                            <i className="fab fa-facebook text-xl md:text-2xl"></i>
                        </a>
                        <a href="#" className="text-primary-100 hover:text-text-50">
                            <span className="sr-only">Twitter</span>
                            <i className="fab fa-twitter text-xl md:text-2xl"></i>
                        </a>
                        <a href="#" className="text-primary-100 hover:text-text-50">
                            <span className="sr-only">Instagram</span>
                            <i className="fab fa-instagram text-xl md:text-2xl"></i>
                        </a>
                    </div>

                    {/* Copyright */}
                    <div className="border-t border-primary-400/30 pt-8">
                        <p className="text-center font-body text-sm md:text-base text-primary-100">
                            © 2024 MYNDFULL. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
