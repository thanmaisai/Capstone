import { useRoutes } from 'react-router-dom';
import NavBar from './components/NavBar';
import { routes } from './Route/routes';
import './App.css';

function App() {
  const element = useRoutes(routes);
  
  return (
    <>
      <NavBar />
      {element}
    </>
  );
}

export default App;
