import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from '../components/UserContext';
import ProfileModal from './ProfileModal'; // Import the ProfileModal component

export default function NavBar() {
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [showProfileModal, setShowProfileModal] = useState(false); // State to control modal visibility
  const { user, logout } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role) {
      setPopupMessage(`Logged in as ${user.role.charAt(0).toUpperCase() + user.role.slice(1)}`);
      setShowPopup(true);
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-purple-700 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div>Home</div>
        <ul className="flex items-center space-x-4">
          {user ? (
            <>
              {user.role === "admin" && (
                <>
                  <li>
                    <Link
                      to="/admin-dashboard"
                      className="hover:bg-purple-600 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Admin Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/manage-books"
                      className="hover:bg-purple-600 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Manage Books
                    </Link>
                  </li>
                </>
              )}
              {user.role === "user" && (
                <>
                  <li>
                    <Link
                      to="/user-dashboard"
                      className="hover:bg-purple-600 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      User Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/all-books"
                      className="hover:bg-purple-600 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      All Books
                    </Link>
                  </li>
                </>
              )}
              <li>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
              <li>
                <img
                  src={`https://robohash.org/${user.id}`}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full border-2 border-white cursor-pointer"
                  onClick={() => setShowProfileModal(true)} // Open modal on click
                />
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className="hover:bg-purple-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="hover:bg-purple-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Signup
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      {showPopup && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg">
          {popupMessage}
        </div>
      )}
      {showProfileModal && <ProfileModal onClose={() => setShowProfileModal(false)} />} {/* Render the modal */}
    </nav>
  );
}
