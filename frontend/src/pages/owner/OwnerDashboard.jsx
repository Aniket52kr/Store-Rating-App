// pages/owner/OwnerDashboard.jsx
import React, { useEffect, useState } from 'react';
import { getOwnerRatings } from '../../services/ratingService';
import useAuth from '../../hooks/useAuth';

const OwnerDashboard = () => {
  const { user } = useAuth();
  const [ratings, setRatings] = useState([]);
  const [average, setAverage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.id) return;

    const fetchRatings = async () => {
      try {
        const data = await getOwnerRatings(user.id);
        setRatings(data?.users || []);
        setAverage(data?.average || 0);
      } catch (err) {
        setError('❌ Failed to load ratings. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchRatings();
  }, [user?.id]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">Owner Dashboard</h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading ratings...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : (
          <>
            <h3 className="text-xl font-semibold text-gray-700 text-center mb-4">
              Average Store Rating:{' '}
              <span className="text-yellow-500 font-bold">{average.toFixed(1)}</span>
            </h3>

            {ratings.length === 0 ? (
              <p className="text-center text-gray-500">No ratings available.</p>
            ) : (
              <ul className="space-y-3 mt-4">
                {ratings.map((r) => (
                  <li
                    key={r.userId || r.id}
                    className="bg-gray-50 p-4 rounded-xl shadow border border-gray-200"
                  >
                    <span className="font-semibold text-blue-600">{r.userName || 'Unknown User'}</span>{' '}
                    rated{' '}
                    <span className="font-bold text-yellow-500">{r.rating}</span>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;
