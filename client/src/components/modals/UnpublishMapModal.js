import { useContext } from 'react';
import { Box, Modal, Button, Typography, Divider } from '@mui/material';
import VisibilityIconOff from '@mui/icons-material/VisibilityOff';

import { GlobalStoreContext } from '../../contexts/store';
import MapContext from '../../contexts/map';

export default function UnpublishMapModal() {
  const { store } = useContext(GlobalStoreContext);
  const { mapInfo } = useContext(MapContext);

  function handleUnpublishMap(event) {
    event.stopPropagation();
    event.preventDefault();
    mapInfo.unpublishMapById(store.mapMarked._id);
  }

  function handleCloseModal(event) {
    event.stopPropagation();
    event.preventDefault();
    store.closeModal();
  }

  return (
    <Modal id='modal-overlay' open={store.currentModal === 'UNPUBLISH_MAP_MODAL'}>
        <Box
            severity='warning'
            className='popUpBox'
            id='modal'
            icon='false'
        >
            <Box className='flex-column' id='modal-header'>
                <VisibilityIconOff id='modal-icon'/>
                <Typography id='modal-title'>Want to unpublish map?</Typography>
            </Box>

            <Divider id='modal-divider'/>

            <Box className='flex-column' id='modal-text'>
                <Typography variant='h6' id='modal-msg'>
                    By clicking confirm, this map will become private to your own view only.<br/>
                </Typography>
                <Typography variant='p' id='modal-note'>
                    (Note that you will still be able to re-publish at anytime.)
                </Typography>
            </Box>


            <Box className='flex-row' id='modal-buttons'>
                <Button
                    variant='contained'
                    id='modal-contained-button'
                    onClick={handleUnpublishMap}
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
