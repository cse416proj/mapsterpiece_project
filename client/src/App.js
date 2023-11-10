import "./css/App.css";
import "./css/Auth.css";
import "./css/Community.css";

import { React } from "react";
import { Box } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { AuthContextProvider } from "./auth";
import { GlobalStoreContextProvider } from "./store";
import { PostContextProvider } from "./post";
import { NavBar, HomeScreen, AuthScreen, CommunityScreen, PostDetailScreen } from "./components";

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <GlobalStoreContextProvider>
          <PostContextProvider>
          <Box className="App">
            <NavBar />
            <Routes>
              <Route path="/" element={<HomeScreen />}></Route>
              <Route path="/register" element={<AuthScreen />}></Route>
              <Route path="/login" element={<AuthScreen />}></Route>
              <Route path="/community" element={<CommunityScreen />}></Route>
              <Route path="/post-detail" element={<PostDetailScreen />}></Route>
            </Routes>
          </Box>
          </PostContextProvider>
        </GlobalStoreContextProvider>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
