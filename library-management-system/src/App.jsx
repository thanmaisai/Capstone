import { useRoutes } from 'react-router-dom';
import NavBar from './components/NavBar';
import { routes } from './Route/routes';
import React from 'react';
import { ThemeProvider } from './ThemeContext';
import './App.css';

function App() {
  const element = useRoutes(routes);

  return (
    <>
      <ThemeProvider>
        <NavBar />
        {element}
      </ThemeProvider>
    </>
  );
}

export default App;

