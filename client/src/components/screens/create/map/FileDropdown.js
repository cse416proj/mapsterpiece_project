import { useState, useContext, useEffect } from 'react';
// import MapContext from './MapContext';

import { Box, FormControl, FormLabel, InputLabel, Select, MenuItem, Button } from '@mui/material';

function FileDropdown() {
    const [fileFormat, setFileFormat] = useState('');
    
    // const { mapInfo } = useContext(MapContext);

    // useEffect(() => {
    //     if(mapInfo){
    //         mapInfo.setFileFormat(fileFormat);
    //     }
    // }, [fileFormat])

    function handleFileFormatChange(event) {
        setFileFormat(event.target.value);
    }

    const handleClear = (event) => {
        setFileFormat('');
    }

    return(
        <Box className='flex-column' id='select-file-container'>
            <Box className='flex-row' id='select-file'>
                <FormLabel style={{ color: 'black', fontSize: '22.5px' }}>Select a file format:</FormLabel>
                <FormControl style={{ marginLeft: '1.5%' }}>
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
                </FormControl>
                <Button
                    variant='outlined'
                    onClick={handleClear}
                    style={{ height: 50, marginLeft: '2%' }}
                >
                    Clear Map Format
                </Button>
            </Box>
        </Box>
    );
}

export default FileDropdown;