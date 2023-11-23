import React, { useState } from 'react';
import { Typography, Box, Toolbar, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { MapCommentSideBar } from '../index';

export default function MapCommentSideBox() {
    const [isToolbarExpanded, setIsToolbarExpanded] = useState(false);

    const boxStyle = {
        display: 'flex',
        flexDirection: 'column', // Change to column layout
        justifyContent: 'space-between',
        alignItems: 'flex-start', // Align to the left
        padding: '7px',
        border: isToolbarExpanded ? '1px solid #ddd' : 'none',
        borderRadius: '10px',
        height: isToolbarExpanded ? '80vh' : '40px',
        overflow: 'hidden',
        transition: 'height 0.3s ease',
        textAlign: 'right',
        width: isToolbarExpanded ? '25%' : 'none',
        marginTop: '10px',
        backgroundColor: isToolbarExpanded ? '#cce4e8' : 'transparent',
    };

    const buttonStyle = {
        backgroundColor: '#cce4e8',
        color: 'black',
        fontWeight: 'bold',
        marginLeft: 'auto',
    };

    const toggleCommentBox = () => {
        setIsToolbarExpanded(!isToolbarExpanded);
    };

    const handleToolbarToggle = () => {
        setIsToolbarExpanded((prev) => !prev);
    };

    return (
        <Toolbar style={boxStyle}>
            {isToolbarExpanded && (
                <Box>
                    <Box style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <CloseIcon
                            style={{ cursor: 'pointer', marginRight: '10px' }}
                            onClick={toggleCommentBox}
                        />
                        <Typography
                            style={{ fontWeight: 'bolder' }}
                            onClick={toggleCommentBox}
                        >
                            Close Comment Box
                        </Typography>
                    </Box>
                    <MapCommentSideBar />
                </Box>
            )}

            {!isToolbarExpanded && (
                <Button
                    variant="contained"
                    style={buttonStyle}
                    onClick={toggleCommentBox}
                    startIcon={<AddIcon />}
                >
                    Open Comment Box
                </Button>
            )}
        </Toolbar>
    );
}
