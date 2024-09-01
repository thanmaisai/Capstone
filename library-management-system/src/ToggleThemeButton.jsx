/**
 * The ToggleThemeButton component in a React application allows users to switch between light and dark
 * modes using a Button component from Material-UI.
 * @returns The `ToggleThemeButton` component is being returned. It is a functional component that
 * renders a Material-UI Button with text based on the current theme mode ('light' or 'dark'). The
 * button's onClick event is set to toggle the theme using the `toggleTheme` function provided by the
 * `useThemeContext` hook.
 */
import React from 'react';
import { Button } from '@mui/material';
import { useThemeContext } from '../src/components/ThemeContext';

const ToggleThemeButton = () => {
  const { toggleTheme, mode } = useThemeContext();

  return (
    <Button onClick={toggleTheme} variant="contained">
      {mode === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
    </Button>
  );
};

export default ToggleThemeButton;
