import React, { useContext, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { DynamicCard, DeletePostModal } from "../../index";
import HomeNavCard from "./HomeNavCard";

import AuthContext from "../../../contexts/auth";
import GlobalStoreContext from "../../../contexts/store";
import PostContext from "../../../contexts/post";
import UserContext from "../../../contexts/user";

function UserHomeScreen() {
  const { auth } = useContext(AuthContext);
  const { store } = useContext(GlobalStoreContext);
  const { userInfo } = useContext(UserContext);
  const { postInfo } = useContext(PostContext);

  useEffect(() => {
    if(auth && auth.user) {
      userInfo.setCurrentUser(auth.user);
      
      if(auth.user.posts.length > 0){
        postInfo.getPostsByPostIds(auth.user.posts);
      }
    }
  }, []);

  let mapCard = (
    <>
      {store.allMaps.map((pair) => (
        <DynamicCard userData={null} mapData={pair} postData={null} />
      ))}
    </>
  );

  let postCard = (
    <>
      {postInfo.allPostsByUser?.map((pair) => (
        <DynamicCard userData={null} mapData={null} postData={pair} />
      ))}
    </>
  );

  return (
    <Box className="home-content">
      <Typography id='welcome-text' variant="h3">Welcome, {auth.user.firstName}!</Typography>
      <Box className="home-feed">
        <Box className="display-container">
          {mapCard}
          {postCard}
        </Box>
        <HomeNavCard/>
      </Box>
      <DeletePostModal />
    </Box>
  );
}

export default UserHomeScreen;
