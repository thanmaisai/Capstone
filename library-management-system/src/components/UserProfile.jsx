import React from 'react';

export default function UserProfile() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-lg">
        <div className="flex flex-col items-center">
          <img
            src="https://robohash.org/thanmai"
            alt="User Avatar"
            className="w-40 h-40 rounded-full border-4 border-gray-300 mb-6"
          />
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">John Doe</h2>
            <p className="text-xl text-gray-600 mb-4">john.doe@example.com</p>
            <p className="text-lg text-gray-700">Books Borrowed: 5</p>
          </div>
        </div>
      </div>
    </div>
  );
}
