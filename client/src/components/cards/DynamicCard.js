import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

import UserCard from "./UserCard";
import MapCard from "./MapCard";
import PostCard from "./PostCard";

import { PostContext } from "../../contexts/post";
import { UserContext } from "../../contexts/user";

export default function DynamicCard(payload) {
  const navigate = useNavigate();
  const { postInfo } = useContext(PostContext);
  const { userInfo } = useContext(UserContext);

  function handleUserCardClick() {
    userInfo.setCurrentUser(payload.userData);
    navigate("/profile");
  }

  function handleMapCardClick() {
    // postInfo.setCurrentPost(payload.postData);
    navigate("/profile");
  }

  function handlePostCardClick() {
    postInfo.setCurrentPost(payload.postData);
    navigate("/post-detail");
  }

  let cardElement = "";

  if (payload.userData) {
    cardElement = <UserCard userName={payload.userData.userName} clickHandler={handleUserCardClick}/>;
  } else if (payload.mapData) {
    cardElement = <MapCard mapData={payload.mapData} clickHandler={handleMapCardClick}/>;
  } else if (payload.postData) {
    cardElement = <PostCard postData={payload.postData} clickHandler={handlePostCardClick}/>;
  }
  else{
    cardElement = null;
  }

  return <Box>{cardElement}</Box>;
}
