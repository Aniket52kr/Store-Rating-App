// pages/user/StoreDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RatingStars from "../../components/RatingStars";
import { getStoreById } from "../../services/storeService";
import { getUserRatings, submitRating } from "../../services/ratingService";
import useAuth from "../../hooks/useAuth";

const StoreDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [store, setStore] = useState(null);
  const [userRating, setUserRating] = useState(0);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const storeData = await getStoreById(id);
        const ratingData = await getUserRatings(user.id, id);
        setStore(storeData);
        setUserRating(ratingData?.rating || 0);
      } catch (error) {
        console.error("Error fetching store details or ratings", error);
      }
    };
    if (user?.id) {
      fetchDetails();
    }
  }, [id, user]);

  const handleRatingChange = async (rating) => {
    try {
      await submitRating(user.id, id, rating);
      setUserRating(rating);
    } catch (error) {
      console.error("Error submitting rating", error);
    }
  };

  if (!store) return <div className="text-center mt-10 text-lg text-gray-500">Loading store details...</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-xl w-full">
        <h2 className="text-3xl font-bold text-blue-700 mb-4">{store.name}</h2>
        <p className="text-gray-600 mb-2"><span className="font-semibold">Address:</span> {store.address}</p>
        <p className="text-gray-600 mb-4"><span className="font-semibold">Average Rating:</span> {store.avgRating?.toFixed(1) || "N/A"}</p>
        <div className="mt-4">
          <h4 className="font-semibold text-gray-700 mb-2">Rate this store:</h4>
          <RatingStars rating={userRating} onRate={handleRatingChange} />
        </div>
      </div>
    </div>
  );
};

export default StoreDetail;
