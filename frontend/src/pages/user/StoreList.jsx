// pages/user/StoreList.jsx
import React, { useEffect, useState } from "react";
import { getAllStores } from '../../services/storeService';
import StoreCard from "../../components/StoreCard";

const StoreList = () => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await getAllStores();
        setStores(response || []);
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };
    fetchStores();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">All Stores</h2>
      {stores.length === 0 ? (
        <p className="text-center text-gray-600">No stores available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {stores.map((store) => (
            <StoreCard key={store._id || store.id} store={store} />
          ))}
        </div>
      )}
    </div>
  );
};

export default StoreList;
