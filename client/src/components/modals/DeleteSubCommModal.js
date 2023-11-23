import { useContext } from "react";
import * as React from "react";
import { Box, Modal, Button, Typography } from "@mui/material";
import { GlobalStoreContext } from "../../contexts/store";
import { PostContext } from "../../contexts/post";

export default function DeleteSubCommModal() {
  const { store } = useContext(GlobalStoreContext);
  const { postInfo } = useContext(PostContext);

  const buttonStyle = {
    backgroundColor: "#649a92",
    color: "white",
  };

  function handleDeleteModal(event) {
    event.stopPropagation();
    event.preventDefault();
    console.log("on click confirm delete SubComment");
    // console.log(store.subcommentMarkedForDeletion._id);
    postInfo.deleteSubCommById(store.subcommentMarkedForDeletion._id);
    store.closeModal();
  }

  function handleCloseModal(event) {
    event.stopPropagation();
    event.preventDefault();
    store.closeModal();
  }

  return (
    <Modal className="modal" open={store.currentModal === "DELETE_SUBCOMMENT_MODAL"}>
      <Box className="modal-box">
        <Box className="modal-dialog">
          <Box className="modal-context">
            <header className="dialog-header">Delete comment</header>
            <Typography style={{ color: "red" }}>
              This will delete this subComment permanently. You cannot undo this
              action.
            </Typography>
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