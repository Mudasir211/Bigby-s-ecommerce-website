// src/components/RatingSystem.js
import React from 'react';
import { FaStar } from 'react-icons/fa';
import AverageStars from './AverageStars';

const RatingSystem = ({ ratings,averageRating }) => {
   
  // Calculate total reviews
  const totalReviews = ratings && ratings.length;

  // Count ratings
  const ratingCounts = Array(5).fill(0); // Array to hold counts for 1-5 stars
 ratings && ratings.forEach(({ rating }) => {
    if (rating >= 1 && rating <= 5) {
      ratingCounts[rating - 1]++; // Increment the count for the corresponding rating
    }
  });

  return (
    <div className="mt-4">
     <div className='flex items-center gap-2'><span className="font-bold sm:text-4xl opacity-90">{averageRating}</span><AverageStars averageRating={averageRating}/><span className='text-xs'> {totalReviews} Reviews</span></div> 
      <div className="mt-4">
        {ratingCounts
          .slice(0) // Copy the array to avoid mutation
          .reverse() // Reverse to display 5 stars at the top
          .map((count, index) => {
            const starRating = 5 - index; // Convert index to star rating (5, 4, 3, 2, 1)
            const percentage = totalReviews ? (count / totalReviews) * 100 : 0;

            return (
              <div key={starRating} className="flex items-center my-2">
                <span className="flex items-center justify-center gap-1 mr-1 text-sm opacity-95">{starRating} <FaStar className='text-yellow-500 ' size={15}/> </span>
                <div className="relative w-full h-2 bg-gray-200 rounded">
                  <div 
                    className="absolute h-full bg-yellow-500 rounded"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="ml-2 text-xs opacity-75">{count}</span>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default RatingSystem;
