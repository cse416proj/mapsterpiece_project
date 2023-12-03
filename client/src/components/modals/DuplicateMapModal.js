import { useContext } from 'react';
import { Box, Modal, Button, Typography, Divider } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';

import { GlobalStoreContext } from '../../contexts/store';
import MapContext from '../../contexts/map';

export default function DuplicateMapModal() {
  const { store } = useContext(GlobalStoreContext);
  const { mapInfo } = useContext(MapContext);

  function handleDuplicateMap(event) {
    event.stopPropagation();
    event.preventDefault();
    console.log("real duplicate map.");
    mapInfo.duplicateMapById(store.mapMarked._id);
  }

  function handleCloseModal(event) {
    event.stopPropagation();
    event.preventDefault();
    store.closeModal();
  }

  return (
    <Modal open={store.currentModal === 'DUPLICATE_MAP_MODAL'}>
        <Box
            severity='warning'
            className='popUpBox'
            id='modal'
            icon='false'
        >
            <Box className='flex-column' id='modal-header'>
                <FileCopyIcon id='modal-icon'/>
                <Typography id='modal-title'>Ready to duplicate/fork map?</Typography>
            </Box>

            <Divider id='modal-divider'/>

            <Box className='flex-column' id='modal-text'>
                <Typography variant='h6' id='modal-msg'>
                    By clicking confirm, you will be redirected to the edit page of the duplicated map. <br/>
                </Typography>
                <Typography variant='p' id='modal-note'>
                    (Note that you will be able to view the duplicated map on your home/profile screen.)
                </Typography>
            </Box>


            <Box className='flex-row' id='modal-buttons'>
                <Button
                    variant='contained'
                    id='modal-contained-button'
                    onClick={handleDuplicateMap}
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
