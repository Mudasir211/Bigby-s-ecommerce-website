import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const StarRating = ({ rating, onRatingChange }) => {
    const [hoveredStar, setHoveredStar] = useState(null);

    const handleMouseEnter = (index) => {
        setHoveredStar(index);
    };

    const handleMouseLeave = () => {
        setHoveredStar(null);
    };

    return (
        <div className="flex">
            {[...Array(5)].map((_, index) => {
                const starRating = index + 1;
                return (
                    <label 
                        key={index}
                        className="relative cursor-pointer"
                        onMouseEnter={() => handleMouseEnter(starRating)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <input
                            type="radio"
                            name="rating"
                            value={starRating}
                            className="absolute opacity-0 left-2 top-2"
                            checked={starRating === rating} // Ensure the radio input is checked if it matches the rating
                            onChange={() => onRatingChange(starRating)}
                            
                        />
                        <FaStar
                            className={`${
                                starRating <= (hoveredStar || rating)
                                    ? 'text-yellow-500'
                                    : 'text-gray-300'
                            }`}
                            size={20}
                        />
                    </label>
                );
            })}
        </div>
    );
};

export default StarRating;
