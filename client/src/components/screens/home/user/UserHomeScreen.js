import React, { useState, useContext, useEffect } from "react";
import { Box, Typography } from "@mui/material";

import { DynamicCard, DeletePostModal, DeleteMapModal, PublishMapModal, UnpublishMapModal } from "../../../index";
import { HomeNavCard } from "../index";

import AuthContext from "../../../../contexts/auth";
import GlobalStoreContext from "../../../../contexts/store";
import MapContext from "../../../../contexts/map";
import PostContext from "../../../../contexts/post";
import UserContext from "../../../../contexts/user";

function UserHomeScreen() {
  const { auth } = useContext(AuthContext);
  const { store } = useContext(GlobalStoreContext);
  const { userInfo } = useContext(UserContext);
  const { postInfo } = useContext(PostContext);
  const { mapInfo } = useContext(MapContext);

  const [loadingMaps, setLoadingMaps] = useState(false);
  const [loadingPosts, setLoadingPosts] = useState(false);

  const [mapCards, setMapCards] = useState(null);
  const [postCards, setPostCards] = useState(null);

  useEffect(() => {
    if(auth && auth.user) {
      userInfo.setCurrentUser(auth.user);

      if(auth.user.maps?.length > 0){
        console.log('now load maps')
        setLoadingMaps(true);
        mapInfo.getMapsByMapIds(auth.user.maps)
      }

      if(auth.user.posts?.length > 0){
        console.log('now load posts')
        setLoadingPosts(true);
        postInfo.getPostsByPostIds(auth.user.posts);
      }
    }
  }, [auth?.user]);

  useEffect(() => {
    if(auth.user.maps?.length === mapInfo?.allMapsByUser?.length){
      setLoadingMaps(false);
      setMapCards(mapInfo?.allMapsByUser.map((pair, index) => (
        <DynamicCard key={index} userData={null} mapData={pair} postData={null}/>
      )));
    }
  }, [mapInfo?.allMapsByUser]);

  useEffect(() => {
    if(auth.user.posts?.length === postInfo?.allPostsByUser?.length){
      setLoadingPosts(false);
      setPostCards(postInfo?.allPostsByUser?.map((pair, index) => (
        <DynamicCard key={index} userData={null} mapData={null} postData={pair}/>
      )));
    }
  }, [postInfo?.allPostsByUser]);
 
  return (
    <Box className="home-content">
      <Typography id='welcome-text' variant="h3">Welcome, {auth.user.firstName}!</Typography>
      <Box className="home-feed">
        <Box className="display-container">
          {
            (loadingMaps || loadingPosts) ?
              <Box className="flex-column">
                  <Typography variant="h4">Currently fetching all maps & posts created by user...</Typography>
                  <Box className="loadingCircle"></Box>
              </Box> :
              // <LoadingOverlay message='Currently fetching all maps & posts created by user...'/> :
              <> {mapCards}{postCards} </>
          }
        </Box>
        <HomeNavCard/>
      </Box>
      <DeletePostModal />
      <DeleteMapModal/>
      <PublishMapModal/>
      <UnpublishMapModal/>
    </Box>
  );
}

export default UserHomeScreen;
