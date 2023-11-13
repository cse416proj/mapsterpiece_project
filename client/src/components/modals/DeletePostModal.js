import { useContext } from 'react';
import * as React from 'react';
import { Box, Modal, Button, Typography } from '@mui/material';
import { GlobalStoreContext } from '../../contexts/store';

export default function DeletePostModal(){
    const { store } = useContext(GlobalStoreContext);
    // const curScreen = store.currentView;
    // console.log("post modal position",curScreen);

    const buttonStyle = {
        backgroundColor: '#649a92', 
        color: 'white' 
    };

    // only close modal at this point, temp setup 
    function handleDeleteModal(event){
        event.stopPropagation();
        event.preventDefault();
        store.closeModal();
    }

    function handleCloseModal(event){
        event.stopPropagation();
        event.preventDefault();
        store.closeModal();
    }

    return (
        <Modal className='modal'
            open={store.currentModal === "DELETE_POST_MODAL"}
        >
            <Box className="modal-box">
                <Box className="modal-dialog">
                    <Box className="modal-context">
                        <header className="dialog-header">
                            Delete post
                        </header>
                        <Typography style={{color:'red'}}>
                            This will delete this map/post permanently. You cannot undo this action.
                        </Typography>
                    </Box>

                    <Box id="confirm-cancel-container">
                        <Button
                            id="dialog-yes-button"
                            className="modal-button"
                            variant="contained"
                            style={buttonStyle}
                            onClick={handleDeleteModal}
                        >Confirm</Button>
                        <Button
                            id="dialog-no-button"
                            className="modal-button"
                            variant="contained"
                            style={buttonStyle}
                            onClick={handleCloseModal}
                        >Cancel</Button>
                    </Box>
                </Box>
            </Box>
            
        </Modal>
    );
}