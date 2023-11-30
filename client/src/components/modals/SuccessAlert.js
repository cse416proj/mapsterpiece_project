import { useState, useEffect } from "react";
import { Box, Alert, AlertTitle, Typography } from "@mui/material";

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PublicIcon from '@mui/icons-material/Public';
import PublicOffIcon from '@mui/icons-material/PublicOff';

export default function SuccessAlert({type}){
    const [msg, setMsg] = useState('');
    const [icon, setIcon] = useState(null);

    const iconStyle = {
        height: '7.5vw',
        width: '7.5vw',
        color: 'var(--icon)'
    }

    useEffect(() => {
        switch(type){
            case 'map-delete':
                setMsg('Map has been deleted successfully!')
                setIcon(<DeleteForeverIcon style={iconStyle}/>)
                break;
            case 'map-publish':
                setMsg('Map has been published successfully!')
                setIcon(<PublicIcon style={iconStyle}/>)
                break;
            case 'map-unpublish':
                setMsg('Map has been unpublished successfully!')
                setIcon(<PublicOffIcon style={iconStyle}/>)
                break;
            default:
                break;
        }
    }, [])

    return(
        <Box className="popUpBoxOverlay">
            <Alert
                severity="success"
                className="popUpBox"
                style={{ zIndex: 1000, transform: 'translate(-50%, -50%)' }}
                iconMapping={{
                    success: icon
                }}
            >
                <AlertTitle style={{ fontSize: '2.25vw' }}>{ msg }</AlertTitle>
                <Typography variant='h6' style={{ fontSize: '1.5vw' }}>Redirecting...</Typography>
            </Alert>
        </Box>
    );
}