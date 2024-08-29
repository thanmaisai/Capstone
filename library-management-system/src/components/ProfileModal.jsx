import React from 'react';
import { useUser } from './UserContext';

export default function ProfileModal({ onClose }) {
  const { user } = useUser();

  // Debugging: Check the user data in the console
  console.log('ProfileModal - User Data:', user);

  if (!user) {
    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <p className="text-center text-red-600">User data is not available.</p>
          <button
            className="mt-6 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  const profileImageUrl = `https://robohash.org/${user._id || 'default'}`;
  const fullName = `${user.firstName} ${user.lastName}`;
  const booksBorrowed = user.borrowedBooks?.length || 0; // Default to 0 if not present

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex flex-col items-center">
          <img
            src={profileImageUrl}
            alt="User Avatar"
            className="w-40 h-40 rounded-full border-4 border-gray-300 mb-6"
          />
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">Member ID: {user._id}</h2> {/* Display User ID */}
            <p className="text-3xl font-bold mb-2">{fullName}</p> {/* Display User Name */}
            <p className="text-xl text-gray-600 mb-4">{user.email}</p> {/* Display User Email */}
            <p className="text-lg text-gray-700">Books Borrowed: {booksBorrowed}</p> {/* Display Books Borrowed */}
            <p className="text-lg text-gray-700">Role: {user.role}</p> {/* Display User Role */}
          </div>
        </div>
        <button
          className="mt-6 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
