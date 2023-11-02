import './App.css';

import { Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/homepage/Home';
import NavBar from './components/NavBar';

function App() {
  return (
    <Router>
       <Box className='App'>
          <NavBar/>
          <Routes>
            <Route path='/' element={<Home/>}></Route>
            {/* <Route path='/map' element={<Map/>}></Route> */}
          </Routes>
      </Box>
    </Router>
  );
}

export default App;
