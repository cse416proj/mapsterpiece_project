import { useState, useContext } from 'react';
import { Box, TextField } from '@mui/material';

import FileDropdown from './FileDropdown';
import FileUpload from './FileUpload';
// import MapContext from './MapContext';

function CreateMap(){
    const [title, setTitle] = useState('');

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }

    return (
        <Box className='flex-column' id='create-container'>
            <TextField
                id='title-input'
                label='Map Title'
                variant='outlined'
                placeholder="Map Title"
                onChange={handleTitleChange}
            />
            <FileDropdown/>
            <FileUpload/>
        </Box>
    )
}

export default CreateMap;