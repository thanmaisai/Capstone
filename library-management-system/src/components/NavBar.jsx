import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role"); // Assuming the role is stored in local storage
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      if (userRole === "admin") {
        setPopupMessage("Logged in as Admin");
      } else if (userRole === "user") {
        setPopupMessage("Logged in as User");
      }
      setShowPopup(true);
      // Hide the popup after 3 seconds
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [token, userRole]);

  return (
    <nav className="bg-purple-700 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div>
        Home
        </div>
        <ul className="flex space-x-4">
          {token ? (
            <>
              {userRole === "admin" ? (
                <li>
                  <Link
                    to="/admin-dashboard"
                    className="hover:bg-purple-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Admin Dashboard
                  </Link>
                </li>
              ) : userRole === "user" ? (
                <li>
                  <Link
                    to="/user-dashboard"
                    className="hover:bg-purple-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    User Dashboard
                  </Link>
                </li>
              ) : null}
              <li>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("role");
                    navigate("/login");
                  }}
                >
                  Logout
                </button>
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
    </nav>
  );
}
