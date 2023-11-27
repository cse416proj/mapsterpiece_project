import './styles/App.css';
import './styles/Auth.css';
import "./styles/HomeScreen.css";
import './styles/Upload.css';
import "./styles/Profile.css";
import "./styles/Card.css";
import "./styles/Query.css";
import "./styles/Modal.css";
import "./styles/Post.css";
import "./styles/Map.css";
import "./styles/Edit.css";
// testing cicd
import { React } from "react";
import { Box } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { AppContextProvider } from './contexts';
import { NavBar, HomeScreen, AuthScreen, PasswordScreen, Profile, CreateScreen, SearchScreen, CommunityScreen, PostDetailScreen, MapEditScreen, PostEditScreen, MaybeShowNavBar } from "./components";
import MapDetailsScreen from './components/screens/map/MapDetailsScreen'

function App() {
  return (
    <Router>
      <AppContextProvider>
        <Box className="App">
          <MaybeShowNavBar>
            <NavBar/>
          </MaybeShowNavBar>
          
          <Routes>
            <Route path='/' element={<HomeScreen/>}></Route>
            <Route path='/register' element={<AuthScreen/>}></Route>
            <Route path='/login' element={<AuthScreen/>}></Route>
            <Route path='/forgot-password' element={<PasswordScreen/>}></Route>
            <Route path='/reset-password' element={<PasswordScreen/>}></Route>
            <Route path='/create' element={<CreateScreen/>}></Route>
            <Route path='/profile/:userId' element={<Profile/>}></Route>
            <Route path="/search/:userId" element={<SearchScreen/>}></Route>
            <Route path="/community" element={<CommunityScreen/>}></Route>
            <Route path="/map-detail/:mapId" element={<MapDetailsScreen/>}></Route>
            <Route path="/map-edit/:mapId" element={<MapEditScreen/>}></Route>
            <Route path="/post-detail/:postId" element={<PostDetailScreen/>}></Route>
            <Route path="/post-edit/:postId" element={<PostEditScreen/>}></Route>
          </Routes>
        </Box>
      </AppContextProvider>
    </Router>
  );
}

export default App;
