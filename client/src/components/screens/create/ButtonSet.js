import { Box, Button } from '@mui/material';

function ButtonSet({ handleClear, handleUpload, prompt }){
    return(
        <Box className='flex-row' id='button-container'>
            <Button
                variant='outlined'
                id='clear-button'
                style={{ borderRadius: 50 }}
                onClick={handleClear}
            >
                Clear
            </Button>
            <Button
                variant='contained'
                id='upload-button'
                style={{ borderRadius: 50 }}
                onClick={handleUpload}
            >
                {prompt}
            </Button>
        </Box>
    )
}

export default ButtonSet;