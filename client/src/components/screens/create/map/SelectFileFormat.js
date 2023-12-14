import { FormControl, RadioGroup, FormLabel, Radio, FormControlLabel, Box, FormHelperText } from '@mui/material';

function SelectFileFormat({ isLoading, fileFormat, fileContent, setFileFormat, missingFileFormat, tags, setTags }) {    
    // save file format & add new tag based on file format
    function handleFileFormatChange(event) {
        const fileFormat = event.target.value;
        setFileFormat(fileFormat);

        // filter out all file format & add new one
        const newtags = tags.filter((tag) => (tag !== 'GeoJSON') && (tag !== 'Shapefiles') && (tag !== 'Keyhole(KML)'));
        setTags([...newtags, fileFormat]);
    }

    return(
        <Box className='flex-row' id='select-file-format'>
            <FormControl error={!fileFormat && missingFileFormat}>
                <FormLabel id="radio-buttons-group-label" style={{ alignSelf: 'flex-start' }}>File format</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="radio-buttons-group-label"
                    name="radio-buttons-group"
                    value={(fileFormat) ? fileFormat : ''}
                    onChange={handleFileFormatChange}
                >
                    <FormControlLabel disabled={isLoading && fileContent !== null} value="GeoJSON" control={<Radio/>} label="GeoJSON"/>
                    <FormControlLabel disabled={isLoading && fileContent !== null} value="Shapefiles" control={<Radio/>} label="Shapefiles(.shp+dbf/.zip)"/>
                    <FormControlLabel disabled={isLoading && fileContent !== null} value="Keyhole(KML)" control={<Radio/>} label="Keyhole(KML)"/>
                </RadioGroup>
                <FormHelperText>{!fileFormat && missingFileFormat && 'Please select file format w/ at least one file.'}</FormHelperText>
            </FormControl>
        </Box>
    );
}

export default SelectFileFormat;