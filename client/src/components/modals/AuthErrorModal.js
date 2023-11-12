import { useContext } from 'react'
import authContext from '../../contexts/auth';
import { Box, Modal, Alert, AlertTitle, Button } from '@mui/material';

function AuthErrorModal() {

    // style buttons here since this doesn't work in css
    const buttonStyle = {
        backgroundColor: '#649a92', 
        color: 'white' 
    };

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
                        <Button 
                            variant="contained"
                            className="modal-button"
                            style={buttonStyle}
                            onClick={handleCloseModal}
                        >
                            OK
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
}

export default AuthErrorModal;