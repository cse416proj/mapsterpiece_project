import { useContext } from "react";
import * as React from "react";
import { Box, Modal, Button, Typography } from "@mui/material";
import { GlobalStoreContext } from "../../contexts/store";
import MapContext from "../../contexts/map";

export default function DeleteMapModal() {
  const { store } = useContext(GlobalStoreContext);
  const { mapInfo } = useContext(MapContext);

  const buttonStyle = {
    backgroundColor: "#649a92",
    color: "white",
  };

  function handleDeleteModal(event) {
    event.stopPropagation();
    event.preventDefault();
    mapInfo.deleteMapById(store.mapMarkedForDeletion._id.$oid);
    // mapInfo.deleteMapById(store.mapMarkedForDeletion._id);
    store.closeModal();
  }

  function handleCloseModal(event) {
    event.stopPropagation();
    event.preventDefault();
    store.closeModal();
  }

  return (
    <Modal className="modal" open={store.currentModal === "DELETE_MAP_MODAL"}>
      <Box className="modal-box">
        <Box className="modal-dialog">
          <Box className="modal-context">
            <header className="dialog-header">Delete map</header>
            <Typography style={{ color: "red" }}>This will delete this map permanently. You cannot undo thisaction.</Typography>
          </Box>

          <Box id="confirm-cancel-container">
            <Button
              id="dialog-yes-button"
              className="modal-button"
              variant="contained"
              style={buttonStyle}
              onClick={handleDeleteModal}
            >
              Confirm
            </Button>
            <Button
              id="dialog-no-button"
              className="modal-button"
              variant="contained"
              style={buttonStyle}
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}