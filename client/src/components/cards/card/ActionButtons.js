import { useState, useContext } from "react";
import { useLocation } from 'react-router-dom';
import { Box, CardActions, Typography, Menu, MenuItem } from "@mui/material";

import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

import {
  EmailIcon,
  FacebookIcon,
  EmailShareButton,
  FacebookShareButton,
  RedditShareButton,
  RedditIcon, TwitterShareButton, TwitterIcon
} from "react-share";

import AuthContext from "../../../contexts/auth";
import { client_base_url } from '../../../config';

// import UserContext from "../../contexts/user";

export default function ActionButtons({ type, cardId, currentUserName, comments, clickHandler, deleteHandler, editHandler, isPublished=false, publishHandler=null, unpublishHandler=null }) {
  const { auth } = useContext(AuthContext);
  const location = useLocation();
  // const { userInfo } = useContext(UserContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorShareEl, setAnchorShareEl] = useState(null);
  const open = Boolean(anchorEl);
  const openShare = Boolean(anchorShareEl)

  const isLoggedInUser = auth.user && auth.user.userName === currentUserName;

  const openMenu = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const handleDelete = (event) => {
    event.stopPropagation();
    event.preventDefault();
    closeMenu();
    deleteHandler(event);
  };

  const handleEdit = (event) => {
    event.stopPropagation();
    event.preventDefault();
    closeMenu();
    editHandler(event);
  };

  const handlePublishMap = (event) => {
    event.stopPropagation();
    event.preventDefault();
    if(publishHandler){
      publishHandler(event);
    }
    closeMenu();
  };

  const handleUnpublishMap = (event) => {
    event.stopPropagation();
    event.preventDefault();
    if(unpublishHandler){
      unpublishHandler(event);
    }
    closeMenu();
  };

  function renderDynamicMenuItems(){
    let actions = [];

    const editItem = { icon: <EditIcon id='action-icon'/>, name: `Edit ${type}`, handler: handleEdit };
    const deleteItem = { icon: <DeleteIcon id='action-icon'/>, name: `Delete ${type}`, handler: handleDelete };
    
    if(type === "post"){
      actions = [editItem, deleteItem]
    }
    else{
      const publishItem = { icon: <VisibilityIcon id='action-icon'/>, name: `Publish map`, handler: handlePublishMap };
      const unpublishItem = { icon: <VisibilityOffIcon id='action-icon'/>, name: `Unpublish map`, handler: handleUnpublishMap };

      if(!isPublished){
        actions = [editItem, publishItem, deleteItem]
      }
      else{
        actions = [unpublishItem, deleteItem]
      }
    }

    return actions.map((action) => {
      return (
        <MenuItem key={action.name} onClick={action.handler} onMouseLeave={closeMenu}>
          {action.icon}
          <Typography id='action-button-text'>{action.name}</Typography>
        </MenuItem>
      );
    });
  }

  const openShareMenu = (event) => {
    event.stopPropagation();
    event.preventDefault();
    console.log('openShareMenu');
    setAnchorShareEl(event.currentTarget);
  };

  const closeShareMenu = () => {
    setAnchorShareEl(null)
  }

  const url = `${client_base_url}/${(type === 'map') ? 'map-detail' : 'post-detail'}/${cardId}`;
  
  function renderShare(){
    if(type === 'post' || (type === 'map' && isPublished)){
      return(
        <Box className={`flex-row ${type}-action`} id="action-button-container" onClick={openShareMenu}>
          <ShareIcon id={`${type}-action-icon`}/>
          <Typography id={`${type}-action-button-text`}>share {type}</Typography>
          <Menu
            id="share-menu"
            style={{ zIndex: '2500' }}
            anchorEl={anchorShareEl}
            open={openShare}
            onClose={closeShareMenu}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onMouseLeave={closeShareMenu}>
              <EmailShareButton url={url} onShareWindowClose={closeShareMenu}><EmailIcon>E-Mail</EmailIcon></EmailShareButton>
              <FacebookShareButton url={url} hashtag={"#Mapsterpiece"} onShareWindowClose={closeShareMenu}><FacebookIcon>Facebook</FacebookIcon></FacebookShareButton>
              <RedditShareButton url={url} onShareWindowClose={closeShareMenu}><RedditIcon>Reddit</RedditIcon></RedditShareButton>
              <TwitterShareButton url={url} onShareWindowClose={closeShareMenu}><TwitterIcon>Twitter</TwitterIcon></TwitterShareButton>
            </MenuItem>
          </Menu>
        </Box>
      )
    }
    return null;
  }

  return (
    <CardActions className="cardActions">
      <Box
        className="flex-row"
        id="action-button-container"
        onClick={clickHandler}
      >
        <ChatBubbleOutlineIcon id={`${type}-action-icon`} />
        <Typography id={`${type}-action-button-text`}>
          {comments && comments.length} comments
        </Typography>
      </Box>
      { renderShare() }
      {
        (!isLoggedInUser) ?
          null :
          <>
            <MoreHorizIcon className="action-icon" id={`${type}-action-icon`} onClick={openMenu}/>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={closeMenu}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              { renderDynamicMenuItems() }
            </Menu>
          </>
      }
    </CardActions>
  );
}