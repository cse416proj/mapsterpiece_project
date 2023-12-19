import { useContext } from "react";
import * as React from "react";
import { Box, Modal, Button, Typography } from "@mui/material";
import { GlobalStoreContext } from "../../contexts/store";
import { PostContext } from "../../contexts/post";
import { UserContext } from "../../contexts/user";
import AuthContext from "../../contexts/auth";

export default function DeleteAccountModal() {
  const { store } = useContext(GlobalStoreContext);
  const { postInfo } = useContext(PostContext);
  const { userInfo } = useContext(UserContext);
  const { auth } = useContext(AuthContext);

  const buttonStyle = {
    backgroundColor: "#649a92",
    color: "white",
  };

  function handleDeleteModal(event) {
    event.stopPropagation();
    event.preventDefault();
    auth.logoutUser();
    setTimeout(() => {
      userInfo.deleteUserById(auth.user._id);
    }, 1000);
    store.closeModal();
  }

  function handleCloseModal(event) {
    event.stopPropagation();
    event.preventDefault();
    store.closeModal();
  }

  return (
    <Modal
      className="modal"
      open={store?.currentModal === "DELETE_ACCOUNT_MODAL"}
    >
      <Box className="modal-box">
        <Box className="modal-dialog">
          <Box className="modal-context">
            <header className="dialog-header">Delete Account</header>
            <Typography style={{ color: "red" }}>
              This will delete your account permanently. You cannot undo this
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
