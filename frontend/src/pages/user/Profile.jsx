// pages/user/Profile.jsx
import React from "react";
import useAuth from "../../hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();

  if (!user) return <p className="text-center mt-10 text-gray-500">Loading user info...</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">My Profile</h2>
        <div className="space-y-4 text-lg text-gray-700">
          <p><span className="font-semibold">Name:</span> {user.name}</p>
          <p><span className="font-semibold">Email:</span> {user.email}</p>
          <p><span className="font-semibold">Address:</span> {user.address || 'N/A'}</p>
          <p><span className="font-semibold">Role:</span> {user.role}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
