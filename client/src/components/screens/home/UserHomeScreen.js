import React, { useContext, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { DynamicCard, DeletePostModal } from "../../index";
import HomeCard from "./HomeCard";
import "./HomeScreen.css";

import AuthContext from "../../../contexts/auth";
import GlobalStoreContext from "../../../contexts/store";
import PostContext from "../../../contexts/post";
import MapContext from "../../../contexts/map";

function UserHomeScreen() {
  const { auth } = useContext(AuthContext);
  const { store } = useContext(GlobalStoreContext);
  const { postInfo } = useContext(PostContext);
  const { mapInfo } = useContext(MapContext);

  useEffect(() => {
    if (auth.user.posts.length > 0) {
      postInfo.getPostsByPostIds(auth.user.posts);
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
      {mapInfo.allMapsFromUser?.map((pair) => (
        <DynamicCard userData={null} mapData={pair} postData={null} />
      ))}
    </Box>
  );

  let postCard = (
    <Box sx={{ width: "95%" }}>
      {postInfo.allPostsByUser?.map((pair) => (
        <DynamicCard userData={null} mapData={null} postData={pair} />
      ))}
    </Box>
  );

  return (
    <Box className="HomeContent">
      <Box className="userWelcome">
        <Typography variant="h3">Welcome, {auth.user.firstName}!</Typography>
      </Box>
      <Box className="HomeBoth">
        <Box className="HomeFeed">
          <Box className="mapsDisplay">{mapCard}</Box>
          <Box className="postsDisplay">{postCard}</Box>
        </Box>
        <HomeCard isLoggedInUser={auth.user} />
      </Box>
      <DeletePostModal />
    </Box>
  );
}

export default UserHomeScreen;
