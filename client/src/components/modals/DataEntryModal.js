import { useState, useContext } from 'react';
import { Box, Modal, Button, Typography, Divider, TextField } from '@mui/material';
import DataArrayIcon from '@mui/icons-material/DataArray';

export default function DataEntryModal({ isOpen, handleClose, setData }) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    event.preventDefault();
    setInputValue(event.target.value);
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedInput = inputValue.replace(/(\s|\r\n|\n|\r)/gm, '');
    if(trimmedInput.length > 0){
      setData(inputValue);
      handleClose();
    }
  };

  const handleCloseModal = (event) => {
    event.preventDefault();
    setInputValue('');
    handleClose();
  }

  return (
    <Modal id='modal-overlay' open={isOpen}>
      <Box
        className='popUpBox'
        id='data-entry-box'
      >
        <Box className='flex-column' id='modal-header'>
          <DataArrayIcon id='modal-icon'/>
          <Typography id='modal-title'>Edit data for current region</Typography>
        </Box>

        <Divider id='modal-divider'/>

        <TextField
          label='value'
          name='value'
          variant='outlined'
          value={inputValue}
          error={isNaN(inputValue) || inputValue < 0} 
          helperText={"Please enter numeric value that's greater than or equal to 0"}
          fullWidth
          onChange={handleInputChange}
        />

        <Box className='flex-row' id='data-entry-buttons'>
          <Button
            variant='contained'
            id='modal-contained-button'
            onClick={handleSubmit}
            disabled={isNaN(inputValue) || inputValue < 0} 
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
