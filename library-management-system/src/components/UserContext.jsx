import React, { createContext, useState, useEffect, useContext } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      console.log('Stored User Data:', JSON.parse(storedUser));
      setUser(JSON.parse(storedUser));
    }
  }, []);
  

  const login = (userData) => {
    const updatedUser = {
      ...userData,
      borrowedBooks: userData.borrowedBooks || [], // Ensure borrowedBooks is an array
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
