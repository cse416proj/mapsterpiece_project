import { useContext } from "react";

import { Box, Modal, Button, Typography, Divider } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { GlobalStoreContext } from "../../contexts/store";
import MapContext from "../../contexts/map";

export default function DeleteMapModal() {
  const { store } = useContext(GlobalStoreContext);
  const { mapInfo } = useContext(MapContext);

  function handleDeleteMap(event) {
    event.stopPropagation();
    event.preventDefault();
    mapInfo.deleteMapById(store.mapMarked._id);
  }

  function handleCloseModal(event) {
    event.stopPropagation();
    event.preventDefault();
    store.closeModal();
  }

  return (
    <Modal id='modal-overlay' open={store.currentModal === 'DELETE_MAP_MODAL'}>
      <Box
        severity='warning'
        className='popUpBox'
        id='modal'
        icon='false'
      >
        <Box className='flex-column' id='modal-header'>
          <DeleteForeverIcon id='modal-icon'/>
          <Typography id='modal-title'>Want to delete map?</Typography>
        </Box>

        <Divider id='modal-divider'/>

        <Box className='flex-column' id='modal-text'>
          <Typography variant='h6' id='modal-msg'>
            By clicking confirm, this map will be deleted permanently.
          </Typography>
          <Typography variant='p' id='modal-note'>
            (Note that you cannot undo this action.)
          </Typography>
        </Box>


        <Box className='flex-row' id='modal-buttons'>
          <Button
            variant='contained'
            id='modal-contained-button'
            onClick={handleDeleteMap}
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