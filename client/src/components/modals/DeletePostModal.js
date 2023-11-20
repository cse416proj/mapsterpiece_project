import { useContext } from "react";
import * as React from "react";
import { Box, Modal, Button, Typography } from "@mui/material";
import { GlobalStoreContext } from "../../contexts/store";
import { PostContext } from "../../contexts/post";

import { useNavigate, useLocation } from 'react-router-dom';

export default function DeletePostModal() {
  const { store } = useContext(GlobalStoreContext);
  const { postInfo } = useContext(PostContext);

  const navigate = useNavigate();
  const location = useLocation();

  const buttonStyle = {
    backgroundColor: "#649a92",
    color: "white",
  };

  function handleDeleteModal(event) {
    event.stopPropagation();
    event.preventDefault();
    postInfo.deletePostById(store.postMarkedForDeletion._id);
    store.closeModal();
    if(location.pathname===`/post-detail/${store.postMarkedForDeletion._id}`){
      navigate('/');
    }
  }

  function handleCloseModal(event) {
    event.stopPropagation();
    event.preventDefault();
    store.closeModal();
  }

  return (
    <Modal className="modal" open={store.currentModal === "DELETE_POST_MODAL"}>
      <Box className="modal-box">
        <Box className="modal-dialog">
          <Box className="modal-context">
            <header className="dialog-header">Delete post</header>
            <Typography style={{ color: "red" }}>This will delete this post permanently. You cannot undo thisaction.</Typography>
          </Box>

          <Box id="confirm-cancel-container">
            <Button
              id="dialog-yes-button"
              className="modal-button"
              variant="contained"
              style={buttonStyle}
              onClick={handleDeleteModal}
            >
              Confirm
            </Button>
            <Button
              id="dialog-no-button"
              className="modal-button"
              variant="contained"
              style={buttonStyle}
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}