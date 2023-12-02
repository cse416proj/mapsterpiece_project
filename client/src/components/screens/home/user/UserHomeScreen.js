import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Typography, Divider, Button } from "@mui/material";

import { DynamicCard, Modals, CreatePrompt } from "../../../index";
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

  const navigate = useNavigate();

  const [loadingMaps, setLoadingMaps] = useState(false);
  const [loadingPosts, setLoadingPosts] = useState(false);

  const [mapCards, setMapCards] = useState(null);
  const [postCards, setPostCards] = useState(null);

  // load maps & posts everytime user has update
  useEffect(() => {
    if(auth && auth.user) {
      userInfo.setCurrentUser(auth.user);

      // close all success alert message
      store.closeModal();

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

  // reload maps when current allMaps array changed
  useEffect(() => {
    if(mapInfo?.allMapsByUser?.length > 0 && auth.user.maps?.length === mapInfo?.allMapsByUser?.length){
      setLoadingMaps(false);
      setMapCards(mapInfo?.allMapsByUser.map((pair, index) => (
        <DynamicCard key={index} userData={null} mapData={pair} postData={null}/>
      )));
      return;
    }
    setMapCards(<CreatePrompt type='map'/>);
  }, [mapInfo?.allMapsByUser]);

  // reload post when current allPosts array changed
  useEffect(() => {
    if(postInfo?.allPostsByUser?.length > 0 && auth.user.posts?.length === postInfo?.allPostsByUser?.length){
      setLoadingPosts(false);
      setPostCards(postInfo?.allPostsByUser?.map((pair, index) => (
        <DynamicCard key={index} userData={null} mapData={null} postData={pair}/>
      )));
      return;
    }
    setPostCards(<CreatePrompt type='post'/>);
  }, [postInfo?.allPostsByUser]);

  // function to render all map cards
  function renderAllMaps(){
    return (
      <Box className='flex-column' id='all-container'>
        <Typography variant='h1' id='all-title'>All Maps</Typography>
        {
          (loadingMaps) ?
            <Box className="flex-column">
              <Typography variant="h4">Currently fetching all maps created by user...</Typography>
              <Box className="loadingCircle"></Box>
            </Box> :
            <>{mapCards}</>
        }
      </Box>
    );
  }

  // function to render all post cards
  function renderAllPosts(){
    return (
      <Box className='flex-column' id='all-container'>
        <Typography variant='h1' id='all-title'>All Posts</Typography>
        {
          (loadingPosts) ?
            <Box className="flex-column">
              <Typography variant="h4">Currently fetching all posts created by user...</Typography>
              <Box className="loadingCircle"></Box>
            </Box> :
            <>{postCards}</>
        }
      </Box>
    );
  }
 
  return (
    <Box className="home-content">
      <Typography id='welcome-text' variant="h3">Welcome, {auth.user.firstName}!</Typography>
      <Box className="home-feed">
        <Box className="display-container">
          { renderAllMaps() }
          <Divider style={{ width: '100%', margin: '2.5vh auto' }}/>
          { renderAllPosts() }
        </Box>
        <HomeNavCard/>
      </Box>
      <Modals/>
    </Box>
  );
}

export default UserHomeScreen;
