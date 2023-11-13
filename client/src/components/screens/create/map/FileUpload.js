import { Box, FormControl } from '@mui/material';

// import MapContext from './MapContext';

function FileUpload({ inputFile, handleSelectFile }){
    // handle selected file input
    const selectFile = (event) => {
        console.log('selectFile');
        console.log(event.target.files);
        console.log('now call handleSelectFile');
        handleSelectFile(event.target.files);
    };

    return(
        <Box className='flex-row' id='file-create-container'>
            <FormControl style={{ width: '100%' }}>
                <input
                    type='file'
                    accept='.zip, .json, .shp, .kml, .dbf'
                    multiple
                    ref={inputFile}
                    id='file-upload-input'
                    onChange={selectFile}
                />
            </FormControl>
            
        </Box>
    )
}

export default FileUpload;