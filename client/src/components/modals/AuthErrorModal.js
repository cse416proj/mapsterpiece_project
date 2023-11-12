import { useContext } from 'react'
import authContext from '../../auth';
import { Box, Modal, Alert, Button } from '@mui/material';

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
        <Modal className='modal'
            open={auth.errMsg !== null}
        >
            <Box className="modal-box">
                <Box className="modal-dialog">
                    <Box className="modal-context">
                        <Alert severity="warning">{auth.errMsg}</Alert>
                    </Box>
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