import './css/App.css';
import './css/Auth.css';
import { React } from 'react';
import { Box } from '@mui/material';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { AuthContextProvider } from './auth';
// import { GlobalStoreContextProvider } from './store'

import NavBar from './components/NavBar';
import HomeScreen from './components/screens/home/HomeScreen';
import AuthScreen from './components/screens/auth/AuthScreen';

/*
    This is our application's top-level component.
    
    @author McKilla Gorilla
*/
/*
  This is the entry-point for our application. Notice that we
  inject our store into all the components in our application.
  
  @author McKilla Gorilla
*/
function App() {
  return (
    <BrowserRouter>
    <AuthContextProvider>
      {/* <global store context provider here> */}
      <Box className='App'>
          <NavBar/>
          <Routes>
            <Route path='/' element={<HomeScreen/>}></Route>
            <Route path='/signup' element={<AuthScreen/>}></Route>
            <Route path='/signin' element={<AuthScreen/>}></Route>
          </Routes>
      </Box>
    </AuthContextProvider>
       
    </BrowserRouter>
  );
}

export default App;
