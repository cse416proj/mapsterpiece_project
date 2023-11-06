import './css/App.css';
import './css/Auth.css';

import { React } from 'react';
import { Box } from '@mui/material';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

// import { GlobalStoreContextProvider } from './store';
import { AuthContextProvider } from './auth';
// import { GlobalStoreContextProvider } from './store'

// import NavBar from './components/NavBar';
import { NavBar } from './components';
import HomeScreen from './components/screens/home/HomeScreen';
import AuthScreen from './components/screens/auth/AuthScreen';

function App() {
  return (
    <Router>
      <AuthContextProvider>
        {/* <global store context provider here> */}
        <Box className='App'>
            <NavBar/>
            <Routes>
              <Route path='/' element={<HomeScreen/>}></Route>
              <Route path='/register' element={<AuthScreen/>}></Route>
              <Route path='/login' element={<AuthScreen/>}></Route>
            </Routes>
        </Box>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
