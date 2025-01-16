import React from 'react';
import { Link } from 'react-router-dom'

function Card({ cardimg, cardtitle, cardtext }) {
    return (
        <div className="bg-background-50 shadow-lg rounded-lg p-4 sm:p-6 flex flex-col items-center text-center hover:scale-105 transition-all duration-300">
            {/* Image */}
            <img
                src={cardimg}
                alt={cardtitle}
                className="w-full h-36 sm:h-48 object-cover rounded-lg mb-3 sm:mb-4"
            />

            {/* Title */}
            <h1 className="font-heading font-bold text-xl sm:text-2xl text-text-800 mb-2 sm:mb-3">
                {cardtitle}
            </h1>

            {/* Text */}
            <p className="font-body text-sm sm:text-base text-text-600 mb-3 sm:mb-4">
                {cardtext}
            </p>

            {/* Button */}
            <button className="border-2 border-primary-500 text-primary-500 rounded-full px-4 sm:px-6 py-1.5 sm:py-2 hover:bg-primary-500 hover:text-text-50 transition-colors mt-auto font-body text-sm sm:text-base">
                <Link to={cardtitle}>Explore</Link>
            </button>
        </div>
    );
}

export default Card;
