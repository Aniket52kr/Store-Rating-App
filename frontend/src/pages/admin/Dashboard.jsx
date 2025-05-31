import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import api from '../../services/api';

const Dashboard = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ users: 0, stores: 0, ratings: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await api.get('/admin/stats', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = res.data?.data;

        if (
          data &&
          typeof data.userCount === 'number' &&
          typeof data.storeCount === 'number' &&
          typeof data.ratingCount === 'number'
        ) {
          setStats({
            users: data.userCount,
            stores: data.storeCount,
            ratings: data.ratingCount,
          });
        } else {
          setError('Unexpected data format from server.');
          setStats({ users: 0, stores: 0, ratings: 0 });
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load dashboard stats.');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [token]);

  if (loading) {
    return (
      <div className="p-8 bg-gray-100 min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-700">Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-gray-100 min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Admin Dashboard</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mb-6">
          <div className="bg-blue-100 p-4 rounded-xl shadow">
            <h3 className="text-xl font-semibold text-blue-800">Total Users</h3>
            <p className="text-2xl font-bold mt-2">{stats.users}</p>
          </div>
          <div className="bg-green-100 p-4 rounded-xl shadow">
            <h3 className="text-xl font-semibold text-green-800">Total Stores</h3>
            <p className="text-2xl font-bold mt-2">{stats.stores}</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-xl shadow">
            <h3 className="text-xl font-semibold text-yellow-800">Total Ratings</h3>
            <p className="text-2xl font-bold mt-2">{stats.ratings}</p>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/admin/stores')}
            className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Manage Stores
          </button>
          <button
            onClick={() => navigate('/admin/stores')} // Navigates to ManageStores where Create Store is shown
            className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition"
          >
            Create Store
          </button>
          <button
            onClick={() => navigate('/admin/users')}
            className="bg-purple-600 text-white px-5 py-2 rounded-md hover:bg-purple-700 transition"
          >
            Manage Users
          </button>
          <button
            onClick={() => navigate('/login')}
            className="bg-red-600 text-white px-5 py-2 rounded-md hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
