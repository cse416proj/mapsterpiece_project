import { useContext, useState, useEffect } from 'react';
import { Box, Modal, Button, Typography, Divider, TextField, Alert, Select } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';

import { GlobalStoreContext } from '../../contexts/store';
import MapContext from '../../contexts/map';

export default function DuplicateMapModal() {
    const { store } = useContext(GlobalStoreContext);
    const { mapInfo } = useContext(MapContext);

    const [title, setTitle] = useState('Map Copy');
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        setErrorMsg(null);
    }, []);

    useEffect(() => {
        if(store.mapMarked?.title){
            setTitle(`Copy of ${store.mapMarked.title}`);
        }
    }, [store.mapMarked?.title]);

    // handle title change
    const handleTitleChange = (event) => {
        event.stopPropagation();
        event.preventDefault();
        setTitle(event.target.value);
    }
    
    // handle duplicate map
    function handleDuplicateMap(event) {
        event.stopPropagation();
        event.preventDefault();

        const trimmedTitle = title.replace(/(\s|\r\n|\n|\r)/gm, '');
        if(trimmedTitle.length <= 0){
            setErrorMsg(`Cannot enter blank value for map title!`);
            return;
        }
        mapInfo.duplicateMapById(store.mapMarked?._id, title);
    }

    // handle close modal
    function handleCloseModal(event) {
        event.stopPropagation();
        event.preventDefault();
        setErrorMsg(null);
        store.closeModal();
    }

    return (
        <Modal id='modal-overlay' open={store?.currentModal === 'DUPLICATE_MAP_MODAL'}>
            <Box
                severity='warning'
                className='popUpBox'
                id='modal'
                icon='false'
                style={{ width: '50vw', height: '65vh' }}
            >
                { errorMsg && <Alert severity='warning'>{errorMsg}</Alert>}

                <Box className='flex-column' id='modal-header'>
                    <FileCopyIcon id='modal-icon'/>
                    <Typography id='modal-title'>Ready to duplicate/fork map?</Typography>
                </Box>

                <Divider id='modal-divider'/>

                <Box className='flex-column' id='duplicate-entry-container'>
                    <Box className='flex-row' id='duplicate-entry'>
                        <Typography>Map Title</Typography>
                        <TextField
                            style={{ width: '75%' }}
                            value={title}
                            onChange={handleTitleChange}
                        />
                    </Box>
                </Box>

                <Box className='flex-column' id='modal-text' style={{ width: '97.5%', margin: '2vh auto' }}>
                    <Typography variant='h6' id='modal-msg' style={{ width: '97.5%' }}>
                        By clicking confirm, your own copy of this current map will be created.<br/>
                    </Typography>
                    <Typography variant='p' id='modal-note'>
                        (Note that your new copy is first unpublished by default.)
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
