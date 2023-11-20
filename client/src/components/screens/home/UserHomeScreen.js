import React, { useContext, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { DynamicCard, DeletePostModal } from "../../index";
import HomeNavCard from "./HomeNavCard";

import AuthContext from "../../../contexts/auth";
import GlobalStoreContext from "../../../contexts/store";
import PostContext from "../../../contexts/post";

function UserHomeScreen() {
  const { auth } = useContext(AuthContext);
  const { store } = useContext(GlobalStoreContext);
  const { userInfo } = useContext(UserContext);
  const { postInfo } = useContext(PostContext);
  const { mapInfo } = useContext(MapContext);

  useEffect(() => {
    if(auth && auth.user) {
      userInfo.setCurrentUser(auth.user);
      
      if(auth.user.posts.length > 0){
        postInfo.getPostsByPostIds(auth.user.posts);
      }
    }
  }, []);

  useEffect(() => {
    if (auth.user.maps.length > 0){
      mapInfo.getAllUserMaps();
    }
  }, []);

// console.log(mapInfo?.allMapsFromUser);

  let mapCard = (
    <Box sx={{ width: "95%" }}>
      {store.allMaps.map((pair) => (
        <DynamicCard userData={null} mapData={pair} postData={null} />
      ))}
    </Box>
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
