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
      ...userData.user,
      token: userData.token,
    };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    localStorage.setItem('token', userData.token);
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
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
