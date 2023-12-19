import { useContext } from 'react';
import { Box, Modal, Button, Typography, Divider } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { GlobalStoreContext } from '../../contexts/store';
import MapContext from '../../contexts/map';

export default function PublishMapModal() {
  const { store } = useContext(GlobalStoreContext);
  const { mapInfo } = useContext(MapContext);

  function handlePublishMap(event) {
    event.stopPropagation();
    event.preventDefault();
    mapInfo.publishMapById(store.mapMarked._id);
  }

  function handleCloseModal(event) {
    event.stopPropagation();
    event.preventDefault();
    store.closeModal();
  }

  return (
    <Modal id='modal-overlay' open={store?.currentModal === 'PUBLISH_MAP_MODAL'}>
        <Box
            severity='warning'
            className='popUpBox'
            id='modal'
            icon='false'
        >
            <Box className='flex-column' id='modal-header'>
                <VisibilityIcon id='modal-icon'/>
                <Typography id='modal-title'>Ready to publish map?</Typography>
            </Box>

            <Divider id='modal-divider'/>

            <Box className='flex-column' id='modal-text'>
                <Typography variant='h6' id='modal-msg'>
                    By clicking confirm, you agree to publish this map to the community, where everyone will have access to view your map.<br/>
                </Typography>
                <Typography variant='p' id='modal-note'>
                    (Note that you will still be able to unpublish at anytime.)
                </Typography>
            </Box>


            <Box className='flex-row' id='modal-buttons'>
                <Button
                    variant='contained'
                    id='modal-contained-button'
                    onClick={handlePublishMap}
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
