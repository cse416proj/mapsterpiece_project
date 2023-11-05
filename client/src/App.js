import './css/App.css';
import './css/Auth.css';

import { Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import HomeScreen from './components/screens/home/HomeScreen';
import AuthScreen from './components/screens/auth/AuthScreen';

function App() {
  return (
    <Router>
       <Box className='App'>
          <NavBar/>
          <Routes>
            <Route path='/' element={<HomeScreen/>}></Route>
            <Route path='/signup' element={<AuthScreen/>}></Route>
            <Route path='/signin' element={<AuthScreen/>}></Route>
          </Routes>
      </Box>
    </Router>
  );
}

export default App;
