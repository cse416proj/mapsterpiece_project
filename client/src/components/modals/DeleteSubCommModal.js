import { useContext } from "react";

import { Box, Modal, Button, Typography, Divider } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { GlobalStoreContext } from "../../contexts/store";
import { PostContext } from "../../contexts/post";
import MapContext from "../../contexts/map";

export default function DeleteSubCommModal() {
  const { store } = useContext(GlobalStoreContext);
  const { postInfo } = useContext(PostContext);
  const { mapInfo } = useContext(MapContext);

  function handleDeleteComment(event) {
    event.stopPropagation();
    event.preventDefault();
    console.log("on click confirm delete SubComment");
    // console.log(store.subcommentMarkedForDeletion._id);

    if(store.currentView==="MAP_VIEW"){
      console.log('map subcomm');
      // console.log(mapInfo);
      mapInfo.deleteSubCommentById(store.subcommentMarkedForDeletion._id);
    }
    else{
      console.log('post subcomm');
      postInfo.deleteSubCommById(store.subcommentMarkedForDeletion._id);
    }
    store.closeModal();
  }

  function handleCloseModal(event) {
    event.stopPropagation();
    event.preventDefault();
    store.closeModal();
  }

  return (
    <Modal id='modal-overlay' open={store?.currentModal === 'DELETE_SUBCOMMENT_MODAL'}>
      <Box
        severity='warning'
        className='popUpBox'
        id='modal'
        icon='false'
      >
        <Box className='flex-column' id='modal-header'>
          <DeleteForeverIcon id='modal-icon'/>
          <Typography id='modal-title'>Want to delete subcomment?</Typography>
        </Box>

        <Divider id='modal-divider'/>

        <Box className='flex-column' id='modal-text'>
          <Typography variant='h6' id='modal-msg'>
            By clicking confirm, this subcomment will be deleted permanently.
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