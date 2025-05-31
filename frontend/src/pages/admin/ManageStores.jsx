import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import api from '../../services/api';

const ManageStores = () => {
  const { token } = useAuth();
  const [stores, setStores] = useState([]);
  const [owners, setOwners] = useState([]);
  const [search, setSearch] = useState('');
  const [newStore, setNewStore] = useState({
    name: '',
    address: '',
    description: '',
    phone: '',
    ownerId: '', // owner selected from dropdown
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchStores();
    fetchOwners();
  }, []);

  const fetchStores = () => {
    setLoading(true);
    api.get('/admin/stores', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        // Expected res.data to be an array of stores with owner info and average rating
        setStores(Array.isArray(res.data) ? res.data : res.data.stores || []);
      })
      .catch(() => {
        setMessage({ type: 'error', text: 'Failed to fetch stores.' });
        setStores([]);
      })
      .finally(() => setLoading(false));
  };

  // Fetch owners to assign store owner when creating store
  const fetchOwners = () => {
  api.get('/admin/users?role=owner', {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(res => {
      const ownerList = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data.users)
        ? res.data.users
        : [];
      setOwners(ownerList);
    })
    .catch(() => {
      setMessage({ type: 'error', text: 'Failed to fetch owners.' });
      setOwners([]); // fallback to empty array to avoid .map crash
    });
};


  const handleChange = (e) => {
    setNewStore({ ...newStore, [e.target.name]: e.target.value });
  };

  const handleCreate = (e) => {
    e.preventDefault();

    if (!newStore.name.trim() || !newStore.address.trim() || !newStore.ownerId) {
      setMessage({ type: 'error', text: 'Name, address, and owner are required.' });
      return;
    }

    api.post('/admin/stores', newStore, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        fetchStores();
        setNewStore({ name: '', address: '', description: '', phone: '', ownerId: '' });
        setMessage({ type: 'success', text: 'Store created successfully.' });
        setShowForm(false);
      })
      .catch((err) => {
        setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to create store.' });
      });
  };

  const filteredStores = Array.isArray(stores)
    ? stores.filter(store =>
        store.name.toLowerCase().includes(search.toLowerCase()) ||
        store.address.toLowerCase().includes(search.toLowerCase()) ||
        (store.ownerName && store.ownerName.toLowerCase().includes(search.toLowerCase()))
      )
    : [];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Manage Stores</h2>

      {message.text && (
        <div className={`mb-4 p-3 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message.text}
        </div>
      )}

      <div className="mb-4 text-right">
        <button
          onClick={() => setShowForm(prev => !prev)}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200"
        >
          {showForm ? 'Hide Form' : 'Add New Store'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Create New Store</h3>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
            <input
              name="name"
              placeholder="Store Name"
              value={newStore.name}
              onChange={handleChange}
              required
              className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              name="address"
              placeholder="Address"
              value={newStore.address}
              onChange={handleChange}
              required
              className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <select
              name="ownerId"
              value={newStore.ownerId}
              onChange={handleChange}
              required
              className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Owner</option>
              {owners.map(owner => (
                <option key={owner.id} value={owner.id}>{owner.name} ({owner.email})</option>
              ))}
            </select>
            <input
              name="phone"
              placeholder="Phone (optional)"
              value={newStore.phone}
              onChange={handleChange}
              className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={newStore.description}
              onChange={handleChange}
              className="border rounded-md p-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 sm:col-span-4"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Create Store
          </button>
        </form>
      )}

      <input
        type="text"
        placeholder="Search by name, address or owner"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        {loading ? (
          <p className="text-center py-4 text-gray-500">Loading stores...</p>
        ) : (
          filteredStores.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="px-4 py-2 font-semibold cursor-pointer">Name</th>
                  <th className="px-4 py-2 font-semibold cursor-pointer">Address</th>
                  <th className="px-4 py-2 font-semibold cursor-pointer">Owner</th>
                  <th className="px-4 py-2 font-semibold cursor-pointer">Phone</th>
                  <th className="px-4 py-2 font-semibold cursor-pointer">Average Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredStores.map(store => (
                  <tr key={store.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2">{store.name}</td>
                    <td className="px-4 py-2">{store.address}</td>
                    <td className="px-4 py-2">{store.owner?.username || '-'}</td>
                    <td className="px-4 py-2">{store.phone || '-'}</td>
                    <td className="px-4 py-2">{store.averageRating?.toFixed(2) || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-gray-500 p-4">No stores found.</p>
          )
        )}
      </div>
    </div>
  );
};

export default ManageStores;
