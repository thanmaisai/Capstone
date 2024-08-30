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
