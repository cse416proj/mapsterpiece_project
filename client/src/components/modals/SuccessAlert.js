import { useState, useEffect } from "react";
import { Box, Alert, AlertTitle, Typography } from "@mui/material";

import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PublicIcon from '@mui/icons-material/Public';
import PublicOffIcon from '@mui/icons-material/PublicOff';
import FileCopyIcon from '@mui/icons-material/FileCopy';

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
            case 'map-create':
            case 'post-create':
                const typeName = (type === 'map-create') ? 'Map' : 'Post';
                setMsg(`${typeName} has been created successfully!`)
                setIcon(<DoneRoundedIcon style={iconStyle}/>)
                break;
            case 'map-save':
                setMsg('Map has been saved successfully!')
                setIcon(<DoneRoundedIcon style={iconStyle}/>)
                break;
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
            case 'map-duplicate':
                setMsg('Map has been duplicated successfully!')
                setIcon(<FileCopyIcon  style={iconStyle}/>)
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
                <Typography variant='h6' style={{ fontSize: '1.5vw' }}>
                    {(type === 'map-save') ? 'Refreshing...' : 'Redirecting...'}
                </Typography>
            </Alert>
        </Box>
    );
}