import React from 'react'
import { FaUsers, FaHeart, FaLightbulb } from 'react-icons/fa' // Changed to FontAwesome icons

function AboutUs() {
    return (
        <div className='min-h-screen bg-background'>
            {/* Hero Section */}
            <div className="bg-primary-500 text-white py-20">
                <div className="container mx-auto px-6">
                    <h1 className='text-4xl md:text-5xl font-heading font-bold text-center mb-6'>
                        About MyndFull
                    </h1>
                    <p className='text-lg md:text-xl text-center max-w-3xl mx-auto font-body'>
                        Empowering individuals to take control of their mental well-being through innovative digital solutions and compassionate support.
                    </p>
                </div>
            </div>

            {/* Mission Section */}
            <div className="container mx-auto px-6 py-16">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-heading font-bold text-primary-500 mb-6">
                            Our Mission
                        </h2>
                        <p className="text-text-600 font-body mb-6">
                            At MyndFull, we believe that mental health support should be accessible to everyone. Our platform combines technology with compassion to provide innovative solutions for mental wellness.
                        </p>
                        <p className="text-text-600 font-body">
                            We strive to create a safe, supportive environment where individuals can explore their emotions, practice mindfulness, and connect with others on their mental health journey.
                        </p>
                    </div>
                    <div className="relative h-[300px] md:h-[400px]">
                        <div className="absolute inset-0 bg-primary-100 rounded-lg transform rotate-3"></div>
                        <img
                            src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b"
                            alt="People supporting each other in a group therapy session"
                            className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg transform -rotate-3 hover:rotate-0 transition-transform duration-300"
                        />
                    </div>
                </div>
            </div>

            {/* Values Section */}
            <div className="bg-background-50 py-16">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-heading font-bold text-primary-500 text-center mb-12">
                        Our Core Values
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Value 1 */}
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                                <FaHeart className="w-6 h-6 text-primary-500" />
                            </div>
                            <h3 className="text-xl font-heading font-bold text-primary-500 text-center mb-4">
                                Compassion
                            </h3>
                            <p className="text-text-600 font-body text-center">
                                We approach every interaction with empathy and understanding, creating a supportive environment for all users.
                            </p>
                        </div>

                        {/* Value 2 */}
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                                <FaLightbulb className="w-6 h-6 text-primary-500" />
                            </div>
                            <h3 className="text-xl font-heading font-bold text-primary-500 text-center mb-4">
                                Innovation
                            </h3>
                            <p className="text-text-600 font-body text-center">
                                We leverage cutting-edge technology to provide effective, accessible mental health support solutions.
                            </p>
                        </div>

                        {/* Value 3 */}
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                                <FaUsers className="w-6 h-6 text-primary-500" />
                            </div>
                            <h3 className="text-xl font-heading font-bold text-primary-500 text-center mb-4">
                                Community
                            </h3>
                            <p className="text-text-600 font-body text-center">
                                We foster a safe, inclusive community where everyone can share, support, and grow together.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Section */}
            <div className="container mx-auto px-6 py-16">
                <div className="text-center">
                    <h2 className="text-3xl font-heading font-bold text-primary-500 mb-6">
                        Get in Touch
                    </h2>
                    <p className="text-text-600 font-body mb-8 max-w-2xl mx-auto">
                        Have questions or feedback? We'd love to hear from you. Reach out to our team and we'll get back to you as soon as possible.
                    </p>
                    <a
                        href="mailto:myndfull@gmail.com"
                        className="inline-block bg-primary-500 text-white px-8 py-3 rounded-full font-body font-semibold hover:bg-primary-600 transition-colors"
                    >
                        Contact Us
                    </a>
                </div>
            </div>
        </div>
    )
}

export default AboutUs