import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import useAuth from '../../hooks/useAuth';

const ManageUsers = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.get('/admin/users', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, [token]);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase()) ||
    user.address.toLowerCase().includes(search.toLowerCase()) ||
    user.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Manage Users</h2>
      <input
        type="text"
        placeholder="Search by name, email, address, or role"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 p-2 border rounded-md"
      />
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-2 font-semibold">Name</th>
              <th className="px-4 py-2 font-semibold">Email</th>
              <th className="px-4 py-2 font-semibold">Address</th>
              <th className="px-4 py-2 font-semibold">Role</th>
              <th className="px-4 py-2 font-semibold">Rating</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.address}</td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2">
                  {user.role === 'StoreOwner' ? user.rating || 'N/A' : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
