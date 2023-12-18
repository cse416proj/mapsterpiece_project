import { Box, FormControl, Select, MenuItem, FormLabel, InputLabel, RadioGroup, Radio, FormControlLabel, FormHelperText, Typography } from '@mui/material';

export default function SelectMapType({ isLoading, fileContent, mapType, setMapType, missingMapType, tags, setTags }) {    
    const mapTypes = ['PINMAP', 'HEATMAP', 'CHOROPLETH', 'DOT_DISTRIBUTION', 'GRADUATED_SYMBOL'];

    // save map type & add new tag based on type
    function handleMapTypeChange(event) {
        const mapType = event.target.value;
        setMapType(mapType);

        // filter out all file format & add new one
        const newtags = tags.filter((tag) => !mapTypes.includes(tag));
        setTags([...newtags, mapType]);
    }

    function getText(type){
        const dict = {
            '': 'Select Map Type...',
            'PINMAP': 'Pin Map',
            'HEATMAP': 'Heat Map',
            'CHOROPLETH': 'Choropleth Map',
            'DOT_DISTRIBUTION': 'Dot Distribution Map',
            'GRADUATED_SYMBOL': 'Graduated Symbol Map'
        }
        return dict[type];
    }

    return(
        <Box className='flex-row' id='select-map-type'>
            <FormControl error={!mapType && missingMapType} disabled={isLoading && fileContent !== null}>
                <FormLabel style={{ alignSelf: 'flex-start' }}>Map Type</FormLabel>
                {/* <InputLabel id="map-type-dropdown-label">Select Map Type...</InputLabel> */}
                <Select
                    id="map-type-dropdown"
                    label="map-type"
                    value={mapType}
                    displayEmpty
                    renderValue={
                        (selectedValue) => (
                            <Typography style={{ textAlign: 'left' }}>
                                { getText(selectedValue) }
                            </Typography>
                        )
                    }
                    onChange={handleMapTypeChange}
                >
                    <MenuItem disabled value="">Select A Map Type...</MenuItem>
                    <MenuItem value={"PINMAP"}>Pin Map</MenuItem>
                    <MenuItem value={"HEATMAP"}>Heat Map</MenuItem>
                    <MenuItem value={"CHOROPLETH"}>Choropleth Map</MenuItem>
                    <MenuItem value={"DOT_DISTRIBUTION"}>Dot Distribution Map</MenuItem>
                    <MenuItem value={"GRADUATED_SYMBOL"}>Graduated Symbol Map</MenuItem>
                </Select>
                <FormHelperText>{!mapType && missingMapType && 'Please select map type.'}</FormHelperText>
            </FormControl>
        </Box>
    );
}