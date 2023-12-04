import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

import UserCard from "./UserCard";
import MapCard from "./MapCard";
import PostCard from "./PostCard";

import MapContext from "../../../contexts/map";
import { PostContext } from "../../../contexts/post";
import { UserContext } from "../../../contexts/user";

import GlobalStoreContext from "../../../contexts/store/index";

export default function DynamicCard({ userData, mapData, postData }) {
  const navigate = useNavigate();
  const { mapInfo } = useContext(MapContext);
  const { postInfo } = useContext(PostContext);
  const { userInfo } = useContext(UserContext);
  const { store } = useContext(GlobalStoreContext);

  function handleUserCardClick(event) {
    event.stopPropagation();
    event.preventDefault();
    userInfo.setCurrentUser(userData);
    navigate(`/profile/${userData._id}`);
  }

  function handleMapCardClick(event) {
    event.stopPropagation();
    event.preventDefault();
    mapInfo.setCurrentMap(mapData);
    if(mapData.isPublished){
      navigate(`/map-detail/${mapData._id}`);
    }
    else{
      navigate(`/map-edit/${mapData._id}`);
    }
  }

  function handlePostCardClick(event) {
    event.stopPropagation();
    event.preventDefault();
    postInfo.setCurrentPost(postData);
    navigate(`/post-detail/${postData._id}`);
  }

  const handleEditPost = (event) => {
    event.stopPropagation();
    event.preventDefault();
    postInfo.setCurrentPost(postData);
    navigate(`/post-edit/${postData._id}`);
  }

  const handleEditMap = (event) => {
    event.stopPropagation();
    event.preventDefault();
    mapInfo.setCurrentMap(mapData);
    navigate(`/map-edit/${mapData._id}`);
  }

  function handleDelete(event) {
    event.stopPropagation();
    event.preventDefault();

    if(postData){
      console.log('delete post')
      store.markPostForDeletion(postData);
    }
    else if(mapData){
      console.log('delete map')
      store.markMapForDeletion(mapData);
    }
  }

  let cardElement = "";

  if (userData) {
    cardElement = (
      <UserCard
        userName={userData.userName}
        clickHandler={handleUserCardClick}
      />
    );
  } else if (mapData) {
    cardElement = (
      <MapCard
        mapData={mapData}
        clickHandler={handleMapCardClick}
        editHandler={handleEditMap}
        deleteHandler={handleDelete}
      />
    );
  } else if (postData) {
    cardElement = (
      <PostCard
        postData={postData}
        clickHandler={handlePostCardClick}
        editHandler={handleEditPost}
        deleteHandler={handleDelete}
      />
    );
  } else {
    cardElement = null;
  }

  return (
    <Box style={{ width: '100%' }}>
      {cardElement}
    </Box>
  );
}
