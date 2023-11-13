import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

import UserCard from "./UserCard";
import MapCard from "./MapCard";
import PostCard from "./PostCard";

import { PostContext } from "../../contexts/post";
import { UserContext } from "../../contexts/user";

import GlobalStoreContext from "../../contexts/store/index";

export default function DynamicCard({userData, mapData, postData}) {
  const navigate = useNavigate();
  const { postInfo } = useContext(PostContext);
  const { userInfo } = useContext(UserContext);
  const { store } = useContext(GlobalStoreContext);

  function handleUserCardClick(event) {
    event.stopPropagation();
    event.preventDefault();
    userInfo.setCurrentUser(userData);
    navigate("/profile");
  }

  function handleMapCardClick(event) {
    event.stopPropagation();
    event.preventDefault();
    // mapInfo.setCurrentPost(mapData);
    navigate("/profile");
  }

  function handlePostCardClick(event) {
    event.stopPropagation();
    event.preventDefault();
    postInfo.setCurrentPost(postData);
    navigate("/post-detail");
  }

  function handleDeletePost(event){
    event.stopPropagation();
    event.preventDefault();
    console.log('handleDeletePost');
    store.markPostForDeletion();
  }

  let cardElement = "";

  if (userData) {
    cardElement = <UserCard userName={userData.userName} clickHandler={handleUserCardClick}/>;
  } else if (mapData) {
    cardElement = <MapCard mapData={mapData} clickHandler={handleMapCardClick}/>;
  } else if (postData) {
    cardElement = <PostCard postData={postData} clickHandler={handlePostCardClick} deletePostHandler={handleDeletePost}/>;
  }
  else{
    cardElement = null;
  }

  return <Box>{cardElement}</Box>;
}
