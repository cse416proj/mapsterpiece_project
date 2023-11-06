import { useContext } from 'react'
import authContext from '../../auth';
import { Box, Modal, Alert, Button } from '@mui/material';

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

function AuthErrorModal() {
    const { auth } = useContext(authContext);

    function handleCloseModal(event){
        auth.closeModal();
    }

    return (
        <Modal
            open={auth.errMsg !== null}
        >
            <Box sx={style}>
                <Box className="modal-dialog">
                    <Alert severity="warning">{auth.errMsg}</Alert>
                    <Box id="confirm-cancel-container">
                        <Button 
                            variant="contained"
                            className="modal-button"
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