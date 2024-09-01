import { createTheme } from '@mui/material/styles';
import { blue, pink, grey } from '@mui/material/colors';

// Define the light and dark themes
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: blue[500],
    },
    secondary: {
      main: pink[500],
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: grey[900],
      secondary: grey[800],
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: blue[200],
    },
    secondary: {
      main: pink[200],
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: grey[100],
      secondary: grey[400],
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

// Export the themes
export { lightTheme, darkTheme };
