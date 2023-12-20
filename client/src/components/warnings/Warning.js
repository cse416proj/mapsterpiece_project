import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';

import MapContext from "../../contexts/map";
import PostContext from "../../contexts/post";
import UserContext from "../../contexts/user";
import GlobalStoreContext from "../../contexts/store";

export default function Warning({ message }){
    const navigate = useNavigate();

    const { mapInfo } = useContext(MapContext);
    const { postInfo } = useContext(PostContext);
    const { userInfo } = useContext(UserContext);
    const { store } = useContext(GlobalStoreContext);

    const handleReturn = () => {
        navigate('/');
        store?.setError(null);
        mapInfo?.setErrorMsg(null);
        postInfo?.setErrorMsg(null);
        userInfo?.setErrorMsg(null);
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