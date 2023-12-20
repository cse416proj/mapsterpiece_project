import { useContext } from "react";
import { Box, Modal, Button, Typography, Divider } from "@mui/material";
import PersonOffIcon from '@mui/icons-material/PersonOff';

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
    <Modal id='modal-overlay' open={store.currentModal === 'DELETE_ACCOUNT_MODAL'}>
      <Box
        severity='warning'
        className='popUpBox'
        id='modal'
        icon='false'
      >
        <Box className='flex-column' id='modal-header'>
          <PersonOffIcon id='modal-icon'/>
          <Typography id='modal-title'>Want to delete your account?</Typography>
        </Box>

        <Divider id='modal-divider'/>

        <Box className='flex-column' id='modal-text'>
          <Typography variant='h6' id='modal-msg'>
            By clicking confirm, this current user acccount will be deleted permanently.
          </Typography>
          <Typography variant='p' id='modal-note'>
            (Note that you cannot undo this action, and you will not be able to retrieve this account again.)
          </Typography>
        </Box>


        <Box className='flex-row' id='modal-buttons'>
          <Button
            variant='contained'
            id='modal-contained-button'
            onClick={handleDeleteModal}
          >
            Confirm
          </Button>
          <Button
            variant='outlined'
            id='modal-outline-button'
            onClick={handleCloseModal}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
