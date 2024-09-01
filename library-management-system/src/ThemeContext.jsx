/**
 * The above code defines a ThemeProvider component in React that allows toggling between light and
 * dark themes using Material-UI.
 * @returns The code snippet defines a `ThemeProvider` component that provides a theme context using
 * React's Context API. It includes a state for the current theme (either 'light' or 'dark') and a
 * function to toggle between the themes. The component creates a Material-UI theme based on the
 * selected theme and wraps the children components with the Material-UI ThemeProvider using the
 * created theme.
 */
import React, { createContext, useState, useContext } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { lightTheme, darkTheme } from './theme';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const appliedTheme = createTheme(theme === 'light' ? lightTheme : darkTheme);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <MuiThemeProvider theme={appliedTheme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
