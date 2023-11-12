import { useState, useContext, useEffect } from 'react';
// import MapContext from './MapContext';

import { Box, FormControl, FormLabel, InputLabel, Select, MenuItem, FormHelperText, Button } from '@mui/material';

function FileDropdown({ fileFormat, setFileFormat, missingFileFormat, tags, setTags }) {    
    // const { mapInfo } = useContext(MapContext);

    useEffect(() => {
        setFileFormat(fileFormat);
    }, [fileFormat])

    // save file format & add new tag based on file format
    function handleFileFormatChange(event) {
        const fileFormat = event.target.value;
        setFileFormat(fileFormat);

        // filter out all file format & add new one
        const newtags = tags.filter((tag) => (tag !== 'GeoJSON') && (tag !== 'Shapefiles') && (tag !== 'Keyhole(KML)'));
        setTags([...newtags, fileFormat]);
    }

    return(
        <Box className='flex-column' id='select-file-container'>
            <Box className='flex-row' id='select-file'>
                <FormLabel style={{ color: 'black', fontSize: '22.5px' }}>Select a file format:</FormLabel>
                <FormControl
                    error={!fileFormat && missingFileFormat}
                    style={{ marginLeft: '1.5%' }}
                >
                    <InputLabel id='map-format'>File format</InputLabel>
                    <Select
                        labelId='map-format-dropdown'
                        label='file-format'
                        value={fileFormat}
                        style={{ width: '19vw', backgroundColor: 'white' }}
                        onChange={handleFileFormatChange}
                    >
                        <MenuItem value='Shapefiles'>Shapefiles</MenuItem>
                        <MenuItem value='GeoJSON'>GeoJSON</MenuItem>
                        <MenuItem value='Keyhole(KML)'>Keyhole (KML)</MenuItem>
                    </Select>
                    <FormHelperText>{!fileFormat && missingFileFormat && 'Please select file format w/ at least one file.'}</FormHelperText>
                </FormControl>
            </Box>
        </Box>
    );
}

export default FileDropdown;