import { Box, Typography, Button } from "@mui/material";

export default function Loading({message, cancelHandler=null}){
    return (
        <Box className="flex-column" style={{ width: '100%' }}>
            <Typography variant="h4">{message}</Typography>
            <Box className="loadingCircle" style={{ width: '5vw', height: '5vw', margin: '2vh auto' }}></Box>
            { cancelHandler && <Button id="cancel-load-button" variant="contained" onClick={cancelHandler}>Cancel Load</Button> }
        </Box>
    );
}