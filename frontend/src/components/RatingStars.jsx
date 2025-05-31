import React from 'react';

const RatingStars = ({ rating = 0, onRate = null, readOnly = false }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex">
      {stars.map((star) => (
        <span
          key={star}
          onClick={() => !readOnly && onRate?.(star)}
          className={`text-xl ${
            star <= rating ? 'text-yellow-500' : 'text-gray-300'
          } ${!readOnly ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'}`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default RatingStars;
