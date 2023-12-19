import { useContext } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

import { Box, Modal, Button, Typography, Divider } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { GlobalStoreContext } from "../../contexts/store";
import { PostContext } from "../../contexts/post";

export default function DeletePostModal() {
  const { store } = useContext(GlobalStoreContext);
  const { postInfo } = useContext(PostContext);

  const navigate = useNavigate();
  const location = useLocation();

  function handleDeletePost(event) {
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
    <Modal id='modal-overlay' open={store?.currentModal === 'DELETE_POST_MODAL'}>
      <Box
        severity='warning'
        className='popUpBox'
        id='modal'
        icon='false'
      >
        <Box className='flex-column' id='modal-header'>
          <DeleteForeverIcon id='modal-icon'/>
          <Typography id='modal-title'>Want to delete post?</Typography>
        </Box>

        <Divider id='modal-divider'/>

        <Box className='flex-column' id='modal-text'>
          <Typography variant='h6' id='modal-msg'>
            By clicking confirm, this post will be deleted permanently.
          </Typography>
          <Typography variant='p' id='modal-note'>
            (Note that you cannot undo this action.)
          </Typography>
        </Box>


        <Box className='flex-row' id='modal-buttons'>
          <Button
            variant='contained'
            id='modal-contained-button'
            onClick={handleDeletePost}
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