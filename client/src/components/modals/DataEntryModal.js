import { useContext } from "react";
import * as React from "react";
import { Box, Modal, Button, Typography, TextField } from "@mui/material";

export default function DataEntryModal(props) {
  const [inputValue, setInputValue] = React.useState("");
  const { isOpen, handleClose, setData } = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    setData(inputValue);
    handleClose();
  };

  const buttonStyle = {
    backgroundColor: "#649a92",
    color: "white",
  };

  return (
    <Modal className="modal" open={isOpen}>
      <Box className="modal-box">
        <Box className="modal-dialog">
          <Box className="modal-context">
            <header className="dialog-header">
              Enter data for this region
            </header>
            <TextField
              label="value"
              name="value"
              variant="outlined"
              error={isNaN(inputValue)}
              helperText={"Please enter numeric value only"}
              fullWidth
              onChange={(e) => setInputValue(e.target.value)}
            />
          </Box>

          <Box id="confirm-cancel-container">
            <Button
              id="dialog-yes-button"
              className="modal-button"
              variant="contained"
              style={buttonStyle}
              onClick={handleSubmit}
              disabled={isNaN(inputValue)} 
            >
              Confirm
            </Button>
            <Button
              id="dialog-no-button"
              className="modal-button"
              variant="contained"
              style={buttonStyle}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
