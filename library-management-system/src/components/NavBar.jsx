/* This code snippet is a React functional component called `NavBar` that represents a navigation bar
for a web application. Here's a breakdown of what the code is doing: */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from '../components/UserContext';
import ToggleButton from "@mui/material/ToggleButton";
import { useTheme } from '../ThemeContext';
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BookIcon from "@mui/icons-material/Book";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export default function NavBar() {
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const { user, logout } = useUser();
  const { theme, toggleTheme } = useTheme();
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
    <nav className={`shadow-md ${theme === 'light' ? 'bg-white-900 text-black' : 'bg-gray-900 text-gray-200'}`}>
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center">
          <Link to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="h-10" 
            >
              <path d="M234.5 5.7c13.9-5 29.1-5 43.1 0l192 68.6C495 83.4 512 107.5 512 134.6l0 242.9c0 27-17 51.2-42.5 60.3l-192 68.6c-13.9 5-29.1 5-43.1 0l-192-68.6C17 428.6 0 404.5 0 377.4L0 134.6c0-27 17-51.2 42.5-60.3l192-68.6zM256 66L82.3 128 256 190l173.7-62L256 66zm32 368.6l160-57.1 0-188L288 246.6l0 188z" />
            </svg>
          </Link>
        </div>
        <ul className="flex items-center space-x-4">
          {user ? (
            <>
              {user.role === "admin" && (
                <>
                  <li>
                    <Link
                      to="/admin-dashboard"
                      className="hover:bg-purple-600 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                    >
                      <DashboardIcon className="mr-2" />
                      Admin Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/manage-books"
                      className="hover:bg-purple-600 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                    >
                      <BookIcon className="mr-2" />
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
                      className="hover:bg-purple-600 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                    >
                      <DashboardIcon className="mr-2" />
                      User Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/all-books"
                      className="hover:bg-purple-600 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                    >
                      <BookIcon className="mr-2" />
                      All Books
                    </Link>
                  </li>
                </>
              )}
              <li>
                <IconButton
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                  onClick={handleLogout}
                >
                  <LogoutIcon />
                </IconButton>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className="hover:bg-purple-600 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                >
                  <LoginIcon className="mr-2" />
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="hover:bg-purple-600 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                >
                  <PersonAddIcon className="mr-2" />
                  Signup
                </Link>
              </li>
            </>
          )}
        </ul>
        <ToggleButton
          value={theme}
          selected={theme === 'dark'}
          onChange={toggleTheme}
          className="ml-4"
        >
          {theme === 'light' ? <LightModeIcon /> : <DarkModeIcon />}
        </ToggleButton>
      </div>
      {showPopup && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg">
          {popupMessage}
        </div>
      )}
    </nav>
  );
}