import React from 'react';
import secimage from '../assets/image-main.png';
import frame from '../assets/frame.png';
import Card from '../components/Card';
import meditation from '../assets/meditation.png';
import moodmeter from '../assets/moodmeter.webp';
import music from '../assets/calming-music.webp';
import sparkel from '../assets/sparkel.png';
import therapist from '../assets/therapist.jpg';
import community from '../assets/community.avif';
import sos from '../assets/sos.avif'
import { NavLink } from 'react-router-dom';

function Home() {
    return (
        <>
            {/* Hero Section */}
            <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-10">
                <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
                    {/* Left Column */}
                    <div className="text-center md:text-left space-y-4 sm:space-y-6">
                        <h1 className="tracking-tight font-heading font-bold text-4xl sm:text-5xl text-text-500">
                            Your Mental
                            <span className="inline-flex items-center">
                                <img className='pt-2 h-[45px] w-[45px] sm:h-[55px] sm:w-[55px] ml-2' src={sparkel} alt="sparkle" />
                            </span>
                            <br />
                            Health Matters
                        </h1>

                        <p className="font-body text-sm sm:text-base text-text-600">
                            Stay Productive & Work Remotely<br />
                            The key to work-from-home success is to create an<br />
                            environment that allows you to focus on the tasks at hand.
                        </p>
                        <button className="bg-primary-500 text-text-50 px-6 sm:px-8 py-2 sm:py-3 rounded-full hover:bg-primary-600 transition-colors font-body">
                            <NavLink to="/aboutus">
                                Learn More
                            </NavLink>
                        </button>
                    </div>

                    {/* Right Column - Images */}
                    <div className="relative h-[300px] sm:h-[400px] md:h-[500px] w-full">
                        <img
                            src={frame}
                            alt="Decorative frame"
                            className="absolute inset-0 w-full h-full object-contain z-0"
                        />
                        <img
                            src={secimage}
                            alt="Mental health illustration"
                            className="absolute inset-0 w-full h-full object-contain z-10 pb-6 sm:pb-10"
                        />
                    </div>
                </div>
            </div>

            {/* Purple Section */}
            <div className="container min-h-screen w-full py-8 sm:py-12 mx-auto px-4 sm:px-6 bg-primary-500">
                <div className="flex flex-col md:flex-row items-center gap-8 sm:gap-12">
                    <div className="w-full md:w-1/2 animate-float">
                        <iframe
                            src="https://lottie.host/embed/ac4bddaf-eeb9-4947-8d02-8f098f349c88/9YTTRqYqI6.lottie"
                            className="w-full h-[300px] sm:h-[400px] md:h-[500px]"
                            frameBorder="0"
                        ></iframe>
                    </div>
                    <div className="w-full md:w-1/2 p-4 sm:p-8">
                        <h1 className="font-heading font-bold text-3xl sm:text-4xl mb-4 sm:mb-6 text-text-50">
                            A Comprehensive <br />
                            Approach to Mental <br />
                            Health!
                        </h1>
                        <p className="font-body text-sm sm:text-base text-text-100 mb-6 sm:mb-8">
                            Mindfulness is the idea of learning how to be fully present
                            and engaged in the moment, aware of your thoughts and feelings
                            without distraction or judgement.
                        </p>
                        <button className="border-2 border-text-50 text-text-50 rounded-full px-4 sm:px-6 py-2 hover:bg-primary-400 transition-colors font-body">
                            <NavLink to="/aboutus">
                                Explore
                            </NavLink>
                        </button>
                    </div>
                </div>
            </div>

            {/* Cards Section */}
            <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
                <div className="text-center space-y-4 sm:space-y-6 mb-8 sm:mb-12">
                    <h1 className="font-heading font-bold text-3xl sm:text-4xl text-text-500">
                        We're here to help you feel calmer
                    </h1>
                    <p className="font-body text-sm sm:text-base text-text-600">
                        Take a few moments to relax and recharge, it might change your life.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
                    {/* First row - 3 cards */}
                    <Card
                        cardimg={moodmeter}
                        cardtitle="Moodmeter"
                        cardtext="journaling your mood can help you understand your emotions and improve your mental health."
                    />
                    <Card
                        cardimg={meditation}
                        cardtitle="Meditation"
                        cardtext="Deep breaths are a simple yet powerful way to calm your mind and body."
                    />
                    <Card
                        cardimg={therapist}
                        cardtitle={"AiTherapy"}
                        cardtext={"Talk to our AI therapist Hermione to help you with your mental health and get support"}
                    />

                    {/* Second row - 2 centered cards */}
                    <div className="md:col-span-3 flex flex-col sm:flex-row justify-center gap-6 sm:gap-8">
                        <div className="w-full sm:w-1/2 md:w-1/3">
                            <Card
                                cardimg={community}
                                cardtitle={"Community"}
                                cardtext={"Share your thoughts and feelings with others in our community or post anonymously"}
                            />
                        </div>
                        <div className="w-full sm:w-1/2 md:w-1/3">
                            <Card
                                cardimg={sos}
                                cardtitle={"SOS"}
                                cardtext={"Alert other users and share your emergency contact information in case of an emergency"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
