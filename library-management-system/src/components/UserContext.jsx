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
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const borrowBook = (bookId) => {
    const updatedUser = {
      ...user,
      borrowedBooks: [...user.borrowedBooks, bookId],
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
