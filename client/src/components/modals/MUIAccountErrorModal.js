import { useContext } from 'react'
import authContext from "../../auth";
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function MUIAccountErrorModal() {
    const { auth } = useContext(authContext);
    function handleCloseModal(event){
        auth.closeModal();
    }

    return (
        <Modal
            open={auth.errMsg !== null}
        >
            <Box sx={style}>
                <div className="modal-dialog">
                    <Alert severity="warning">{auth.errMsg}</Alert>
                    <div id="confirm-cancel-container">
                        <Button 
                        variant="contained"
                        className="modal-button"
                        onClick={handleCloseModal}
                        >OK</Button>
                    </div>
                    
                </div>
            </Box>
        </Modal>
    );
}