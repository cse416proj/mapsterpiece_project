import { useState } from 'react';
import { styled } from '@mui/material/styles';

import { Box, FormControl, Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

function FileUpload({ isLoading, inputFile, fileContent, handleSelectFile }){
    const [fileName, setFileName] = useState('');

    // handle selected file input
    const selectFile = (event) => {
        setFileName(event.target.files[0].name);
        handleSelectFile(event.target.files);
    };

    function renderUploadPlaceholder(){
        if(fileContent){
            return(
                <Button
                    disabled
                    id='uploaded-file-button'
                    component="label" variant="contained"
                    startIcon={<CloudDoneIcon id='upload-icon'/>}
                >
                    {fileName} Loaded!
                </Button>
            )
        }
        else{
            return(
                <Button
                    id='upload-file-button'
                    component="label" variant="contained"
                    startIcon={(isLoading) ? <RestartAltIcon id='upload-icon'/> : <CloudUploadIcon id='upload-icon'/>}
                    disabled={isLoading}
                >
                    {
                        (isLoading) ?
                            <>Loading...</> :
                        <>
                            Upload file
                            <VisuallyHiddenInput
                                type="file"
                                accept='.zip, .json, .shp, .kml, .dbf'
                                multiple
                                ref={inputFile}
                                id='file-upload-input'
                                onChange={selectFile}
                            />
                        </>
                    }
                </Button>
            )
        }
    }

    return(
        <Box className='flex-row' id='file-create-container'>
            <FormControl style={{ width: '100%' }}>
                { renderUploadPlaceholder() }
            </FormControl>
        </Box>
    )
}

export default FileUpload;