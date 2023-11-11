import { useContext } from 'react'
import authContext from '../../auth';
import { Box, Modal, Alert, AlertTitle, Button, Typography } from '@mui/material';

function AuthErrorModal() {
    const { auth } = useContext(authContext);

    function handleCloseModal(event){
        auth.closeModal();
    }

    return (
        <Modal open={auth.errMsg !== null}>
            <Box className='modalContainer'>
                <Box className='modal'>
                    <Alert severity="warning">
                        <AlertTitle>ERROR</AlertTitle>
                        {auth.errMsg}
                    </Alert>
                    <Box id="confirm-cancel-container">
                        <Button id='warning-btn' variant="contained" onClick={handleCloseModal}>
                            OK
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
}

export default AuthErrorModal;