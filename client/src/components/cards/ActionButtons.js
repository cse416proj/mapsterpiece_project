import { useState, useContext } from "react";
import AuthContext from "../../contexts/auth";
import { Box, CardActions, Typography, Menu, MenuItem } from "@mui/material";

import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

function ActionButtons({
  type,
  comments,
  clickHandler,
  deleteHandler,
  currentUserName,
}) {
  const { auth } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

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
      <MoreHorizIcon
        className="action-icon"
        id={`${type}-action-icon`}
        onClick={openMenu}
      />
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={closeMenu}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          disabled={!auth || currentUserName != auth?.user?.userName}
          onClick={handleDelete}
        >
          delete
        </MenuItem>
      </Menu>
    </CardActions>
  );
}

export default ActionButtons;
