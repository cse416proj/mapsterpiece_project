import { useContext } from "react";
import { Box, Modal, Button, Typography, Divider } from "@mui/material";

import { GlobalStoreContext } from "../../contexts/store";
import { PostContext } from "../../contexts/post";
import MapContext from "../../contexts/map";

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function DeleteCommentModal() {
  const { store } = useContext(GlobalStoreContext);
  const { mapInfo } = useContext(MapContext);
  const { postInfo } = useContext(PostContext);

  function handleDeleteComment(event) {
    event.stopPropagation();
    event.preventDefault();
    console.log("on click confirm delete comment");
    console.log(store.currentView);
    // postInfo.deleteCommentById(store.commentMarkedForDeletion._id);
    if(store.currentView==="MAP_VIEW"){
      console.log('map comm');
      mapInfo.deleteCommentById(store.commentMarkedForDeletion._id);
    }
    else{
      console.log('post comm');
      postInfo.deleteCommentById(store.commentMarkedForDeletion._id);
    }
    store.closeModal();
  }

  function handleCloseModal(event) {
    event.stopPropagation();
    event.preventDefault();
    store.closeModal();
  }

  return (
    <Modal id='modal-overlay' open={store.currentModal === 'DELETE_COMMENT_MODAL'}>
      <Box
        severity='warning'
        className='popUpBox'
        id='modal'
        icon='false'
      >
        <Box className='flex-column' id='modal-header'>
          <DeleteForeverIcon id='modal-icon'/>
          <Typography id='modal-title'>Want to delete comment?</Typography>
        </Box>

        <Divider id='modal-divider'/>

        <Box className='flex-column' id='modal-text'>
          <Typography variant='h6' id='modal-msg'>
            By clicking confirm, this comment will be deleted permanently.
          </Typography>
          <Typography variant='p' id='modal-note'>
            (Note that you cannot undo this action.)
          </Typography>
        </Box>


        <Box className='flex-row' id='modal-buttons'>
          <Button
            variant='contained'
            id='modal-contained-button'
            onClick={handleDeleteComment}
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