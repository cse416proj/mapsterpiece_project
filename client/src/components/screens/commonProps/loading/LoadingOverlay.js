import { Box, Typography } from "@mui/material";

export default function LoadingOverlay({message}){
    return (
        <Box className="popUpBoxOverlay">
            <Box className="popUpBox">
                <Typography variant="h4">{message}</Typography>
                <Box className="loadingCircle"></Box>
            </Box>
        </Box>
    );
}