import React, { useContext, useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  Box,
  Typography,
  Button,
  Menu,
  MenuItem,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";

import { Tag } from "../../index";

import AuthContext from '../../../contexts/auth';
import MapContext from '../../../contexts/map';
import UserContext from '../../../contexts/user';
import GlobalStoreContext from '../../../contexts/store';
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  RedditIcon,
  RedditShareButton, TwitterIcon, TwitterShareButton
} from "react-share";

export default function MapDetailTopBar() {
  const BackButtonStyle = {
    color: "black",
    fontSize: "15px",
    fontWeight: "bold",
  };
  const toolButtonStyle = {
    backgroundColor: "#E9E1FF",
    color: "black",
    fontWeight: "bold",
  };

  const { auth } = useContext(AuthContext);
  const { mapInfo } = useContext(MapContext);
  const { userInfo } = useContext(UserContext);
  const { store } = useContext(GlobalStoreContext);

  const { mapId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [likes, setLikes] = useState([]);
  const [dislikes, setDislikes] = useState([]);
  const [hasUnpublished, setHasUnpublished] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    setHasUnpublished(false);
    if(mapInfo?.currentMap?.likedUsers && mapInfo?.currentMap?.dislikedUsers){
      setLikes(mapInfo.currentMap.likedUsers);
      setDislikes(mapInfo.currentMap.dislikedUsers);
    }
  }, []);

  useEffect(() => {
    if (mapInfo?.currentMap) {
      setTitle(mapInfo.currentMap.title);
      setTags(mapInfo.currentMap.tags);
      setHasUnpublished(!mapInfo?.currentMap?.isPublished ? true : false);
    }
  }, [mapInfo?.currentMap]);

  // once unpublished, redirect
  useEffect(() => {
    if (hasUnpublished) {
      console.log("hasUnpublished");
      navigate(`/map-edit/${mapId}`);
    }
  }, [hasUnpublished]);

  // mark map & open modal when user clicks on delete map
  function handleDeleteMap(event) {
    event.stopPropagation();
    event.preventDefault();
    store.markMapForDeletion(mapInfo.currentMap);
  }

  // mark map & open modal when user clicks on unpublish map
  function handleUnpublishMap(event) {
    event.stopPropagation();
    event.preventDefault();
    store.markMapForUnpublish(mapInfo.currentMap);
  }

  // redirect user to view community / their own profile
  function handleCommunity() {
    navigate("/community");
  }

  function handleMyMaps() {
    userInfo.setCurrentUser(auth.user);
    navigate(`/profile/${auth.user._id}`);
  }

  function handleCommunity(){
    navigate('/community');
  }

  function handleForkMap(event) {
    event.stopPropagation();
    event.preventDefault();
    console.log("fork this map");

    if(!auth.user){
      console.log('user not loggedin, cannot fork');
    }else{
      store.markMapForDuplicate(mapInfo.currentMap);
    }
  }

  function handleShareMap(event) {
    console.log("share this map");
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  }

  const closeMenu = () => {
    setAnchorEl(null);
  };

  // update likedUsers array when user click on like
  function handleLikeMap() {
    if (!auth.user) {
      navigate("/login");
      return;
    }
    const userLikedMap = likes.find(
      (user) => String(user) === String(auth.user._id)
    );
    const userDislikedMap = dislikes.find(
      (user) => String(user) === String(auth.user._id)
    );
    if (userLikedMap) {
      return;
    }
    if (userDislikedMap) {
      const tmpDislikes = dislikes.filter(
        (user) => String(user) !== String(auth.user._id)
      );
      setDislikes(tmpDislikes);
    }
    setLikes([...likes, auth.user._id]);
    mapInfo.updateMapLikeDislike(mapId, true);
  }

  // update dislikedUsers array when user click on like
  function handleDislikeMap() {
    if (!auth.user) {
      navigate("/login");
      return;
    }

    const userLikedMap = likes.find(
      (user) => String(user) === String(auth.user._id)
    );
    const userDislikedMap = dislikes.find(
      (user) => String(user) === String(auth.user._id)
    );

    if (userDislikedMap) {
      return;
    }

    if (userLikedMap) {
      const tmpLikes = likes.filter(
        (user) => String(user) !== String(auth.user._id)
      );
      setLikes(tmpLikes);
    }

    setDislikes([...dislikes, auth.user._id]);
    mapInfo.updateMapLikeDislike(mapId, false);
  }

  function renderLikeButtons() {
    return (
      <>
        <IconButton id="like-button" onClick={handleLikeMap}>
          {likes.includes(auth?.user?._id) ? (
            <ThumbUpIcon style={{ color: "black" }}></ThumbUpIcon>
          ) : (
            <ThumbUpOffAltIcon style={{ color: "black" }}></ThumbUpOffAltIcon>
          )}
          <t style={{ color: "black" }}> {likes.length} </t>
        </IconButton>

        <IconButton id="dislike-button" onClick={handleDislikeMap}>
          {dislikes?.includes(auth?.user?._id) ? (
            <ThumbDownIcon style={{ color: "black" }}></ThumbDownIcon>
          ) : (
            <ThumbDownOffAltIcon
              style={{ color: "black" }}
            ></ThumbDownOffAltIcon>
          )}
          <t style={{ color: "black" }}>{dislikes.length}</t>
        </IconButton>
      </>
    );
  }

  function renderActionButtons() {
    let buttonSet = [
      { text: "Delete", handler: handleDeleteMap },
      { text: "Unpublish", handler: handleUnpublishMap },
      { text: "Fork", handler: handleForkMap },
      { text: "Share Link", handler: handleShareMap },
    ];

    if (mapId && auth?.user) {
      // logged in but non-owner
      if (!auth.user.maps?.includes(mapId)) {
        buttonSet = buttonSet.slice(2);
      }
    } else {
      // not logged in -> guest
      buttonSet = buttonSet.slice(3);
    }

    return buttonSet.map((btn, index) => (
      <Button
        key={index}
        variant="contained"
        style={toolButtonStyle}
        onClick={btn.handler}
      >
        {btn.text}
      </Button>
    ));
  }

  return (
    <AppBar position="static">
      <Toolbar className="map-screen-topbar">
        {auth.user ? (
          <Button style={BackButtonStyle} onClick={handleMyMaps} id ="back">
            &lt;&lt; My Maps
          </Button>
        ) : (
          <Button style={BackButtonStyle} onClick={handleCommunity} id ="back">
            &lt;&lt; Back to Community
          </Button>
        )}

        <Typography
          sx={{ fontWeight: `bold`, color: `black`, fontSize: `30px` }}
        >
          {title}
        </Typography>

        <Box className="flex-row" id="tags-container">
          {tags?.length === 0 ? null : (
            <>
              <Typography id="post-tags-text" style={{ color: "black" }}>
                Tags:
              </Typography>
              {tags?.map((tag, index) => {
                return (
                  <Tag key={index} index={index} tag={tag} removeTag={null} />
                );
              })}
            </>
          )}
        </Box>

        <Box className="map-button-container">
          <Menu
            id="share-menu"
            style={{ zIndex: '2500' }}
            anchorEl={anchorEl}
            open={open}
            onClose={closeMenu}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onMouseLeave={closeMenu}>
              <EmailShareButton url={window.location.href} onMouseLeave={closeMenu}><EmailIcon>E-Mail</EmailIcon></EmailShareButton>
              <FacebookShareButton url={window.location.href} hashtag={"#Mapsterpiece"} onMouseLeave={closeMenu}><FacebookIcon>Facebook</FacebookIcon></FacebookShareButton>
              <RedditShareButton url={window.location.href} onMouseLeave={closeMenu}><RedditIcon>Reddit</RedditIcon></RedditShareButton>
              <TwitterShareButton url={window.location.href} onMouseLeave={closeMenu}><TwitterIcon>Twitter</TwitterIcon></TwitterShareButton>
            </MenuItem>
          </Menu>
          { renderLikeButtons() }
          { renderActionButtons() }
        </Box>
      </Toolbar>
    </AppBar>
  );
}
