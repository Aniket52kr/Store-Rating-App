// pages/admin/UserDetail.jsx
import React from 'react';

const UserDetail = ({ user }) => {
  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-xl font-bold">User Details</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Address:</strong> {user.address}</p>
      <p><strong>Role:</strong> {user.role}</p>
      {user.role === 'owner' && (
        <p><strong>Store Rating:</strong> {user.rating}</p>
      )}
    </div>
  );
};

export default UserDetail;