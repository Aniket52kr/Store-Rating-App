import React from 'react';
import RatingStars from './RatingStars';

const StoreCard = ({ store, userRating, onRate }) => {
  return (
    <div className="border p-4 rounded-lg shadow-sm mb-4 bg-white">
      <h2 className="text-lg font-bold">{store.name}</h2>
      <p className="text-gray-600 mb-2">{store.address}</p>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div>
          <p className="font-semibold">Overall Rating:</p>
          <RatingStars rating={store.averageRating} readOnly />
        </div>
        <div>
          <p className="font-semibold">Your Rating:</p>
          <RatingStars rating={userRating} onRate={onRate} />
        </div>
      </div>
    </div>
  );
};

export default StoreCard;
