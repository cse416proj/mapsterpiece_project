import './styles/App.css';
import './styles/Auth.css';
import './styles/Upload.css';
import "./styles/Profile.css";
import "./styles/Card.css";
import "./styles/Community.css";
import "./styles/Modal.css";

import { React } from "react";
import { Box } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { AppContextProvider } from './contexts';
import { NavBar, HomeScreen, AuthScreen, Profile, CreateScreen, SearchScreen, CommunityScreen, PostDetailScreen } from "./components";

function App() {
  return (
    <Router>
      <AppContextProvider>
        <Box className="App">
          <NavBar />
          <Routes>
            <Route path='/' element={<HomeScreen/>}></Route>
            <Route path='/register' element={<AuthScreen/>}></Route>
            <Route path='/login' element={<AuthScreen/>}></Route>
            <Route path='/create' element={<CreateScreen/>}></Route>
            <Route path='/profile' element={<Profile/>}></Route>
            <Route path="/search" element={<SearchScreen/>}></Route>
            <Route path="/community" element={<CommunityScreen/>}></Route>
            <Route path="/post-detail" element={<PostDetailScreen/>}></Route>
          </Routes>
        </Box>
      </AppContextProvider>
    </Router>
  );
}

export default App;
