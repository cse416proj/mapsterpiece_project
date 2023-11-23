import React, {useState} from 'react';
import { Select, Typography, Box, MenuItem, Input, Toolbar, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { MapCommentSideBar } from '../index';

export default function MapCommentSideBox(){

    const [isOpen, setIsOpen] = useState(false);

    const boxStyle = {
        padding: '7px',
        margin: '10px',
        border: isOpen ? '1px solid #ddd' : 'none',
        borderRadius: '10px',
        height: isOpen ? '80vh' : '40px', // Set the height based on the isOpen state
        overflow: 'hidden',
        transition: 'height 0.3s ease', // Add a smooth transition effect
        textAlign: 'right',
        width: isOpen ? '25%':'none',
    };

    const buttonStyle = {
        backgroundColor: '#cce4e8',
        color: 'black',
        fontWeight: 'bold',
    };

    const toggleCommentBox = () => {
        setIsOpen(!isOpen);
    };

    return(
        <div style={boxStyle}>
            <Button 
                variant="contained" 
                style={buttonStyle}
                onClick={toggleCommentBox}
                startIcon={isOpen ? <CloseIcon /> : <AddIcon />}
            >
                {isOpen ? 'Close Comment Box' : 'Open Comment Box'}
            </Button>

            {isOpen && (<MapCommentSideBar/>)}
        </div>

    );
}