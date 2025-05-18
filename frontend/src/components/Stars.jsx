import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const Stars = ({ rating,}) => {
   

    return (
        <div className="flex m-1">
            {[...Array(5)].map((_, index) => {
                const starRating = index + 1;
                return (
                   
                        <FaStar key={index}
                            className={`${
                                starRating <= (rating)
                                    ? 'text-yellow-500'
                                    : 'text-gray-300'
                            }`}
                            size={13}
                        />
                    
                );
            })}
        </div>
    );
};

export default Stars;
