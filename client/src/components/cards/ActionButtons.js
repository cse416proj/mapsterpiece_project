import { useState, useContext } from "react";
import { Box, CardActions, Typography, Menu, MenuItem } from "@mui/material";

import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import AuthContext from "../../contexts/auth";
// import UserContext from "../../contexts/user";

function ActionButtons({ type, currentUserName, comments, clickHandler, deleteHandler, editHandler, isPublished=false, publishHandler=null, unpublishHandler=null }) {
  const { auth } = useContext(AuthContext);
  // const { userInfo } = useContext(UserContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const isLoggedInUser = auth.user && auth.user.userName === currentUserName;
  console.log(isLoggedInUser);

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
        <MenuItem key={action.name} onClick={action.handler}>
          {action.icon}
          <Typography id='action-button-text'>{action.name}</Typography>
        </MenuItem>
      );
    });
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
          {comments.length} comments
        </Typography>
      </Box>
      <Box className="flex-row" id="action-button-container">
        <ShareIcon id={`${type}-action-icon`} />
        <Typography id={`${type}-action-button-text`}>share {type}</Typography>
      </Box>
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

export default ActionButtons;
