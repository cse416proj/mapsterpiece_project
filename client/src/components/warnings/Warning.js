import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';

import MapContext from "../../contexts/map";

export default function Warning({ message }){
    const navigate = useNavigate();
    const { mapInfo } = useContext(MapContext);

    const handleReturn = () => {
        navigate('/');
        mapInfo.setErrorMsg(null);
    }

    return(
        <Box className='flex-row' id='warning-screen'>
            <Box className='flex-column' id='warning-wrapper'>
                <ReportProblemOutlinedIcon id='warning-icon'/>
                <Typography variant='h2'>{message}</Typography>
                <Button id='warning-outline-btn' variant='outlined' onClick={handleReturn}>Return Home</Button>
            </Box>
        </Box>
    )
}