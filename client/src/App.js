import './css/App.css';
import './css/Auth.css';
import './css/Upload.css';

import { React } from 'react';
import { Box } from '@mui/material';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import { AuthContextProvider } from './auth';
// import { GlobalStoreContextProvider } from './store'
import { NavBar, HomeScreen, AuthScreen, Profile, CreateScreen } from './components';

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
              <Route path='/create' element={<CreateScreen/>}></Route>
              <Route path='/profile' element={<Profile/>}></Route>
            </Routes>
        </Box>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
