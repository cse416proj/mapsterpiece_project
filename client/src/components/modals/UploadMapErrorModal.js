import { useContext } from "react";
import * as React from "react";
import { Box, Modal, Button, Typography } from "@mui/material";
import { GlobalStoreContext } from "../../contexts/store";
import MapContext from "../../contexts/map";

export default function UploadMapErrorModal(){
    const { store } = useContext(GlobalStoreContext);

    const buttonStyle = {
        backgroundColor: "#649a92",
        color: "white",
    };

    function handleCloseModal(event){
        event.stopPropagation();
        event.preventDefault();
        store.closeModal();
    }

    return(
        <Modal className="modal" open={store.currentModal === "UPLOAD_ERROR_MODAL"}>
            <Box className="modal-box">
                <Box className="modal-dialog">
                    <Box className="modal-context">
                        <header className="dialog-header">Upload Error</header>
                        <Typography style={{ color: "red" }}>Invalid File Format.</Typography>
                    </Box>

                    <Box id="confirm-cancel-container">
                        <Button
                            id="dialog-yes-button"
                            className="modal-button"
                            variant="contained"
                            style={buttonStyle}
                            onClick={handleCloseModal}
                        >
                            Confirm
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
}