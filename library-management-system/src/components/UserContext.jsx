/* This code snippet is creating a user authentication and data management system using React's context
API. Here's a breakdown of what each part of the code is doing: */
import React, { createContext, useState, useEffect, useContext } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    const updatedUser = {
      ...userData,
      borrowedBooks: userData.borrowedBooks || [],
    };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const borrowBook = (bookId) => {
    if (!user) return; // Exit if user is not available

    const updatedUser = {
      ...user,
      borrowedBooks: [...(user.borrowedBooks || []), bookId],
    };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout, borrowBook }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
