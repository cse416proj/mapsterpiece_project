import React, { useContext } from 'react'
import {Box, Typography, Button, Menu, MenuItem, AppBar, Toolbar, IconButton} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
//import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AuthContext from '../../contexts/auth';
import {useNavigate} from "react-router-dom";
export function MapDetailUserTopBar(){
    const BackButtonStyle = {
        color: 'black',
        fontSize: '15px',
        fontWeight: 'bold',
    }
    const toolButtonStyle={
        backgroundColor: '#E9E1FF',
        color: 'black',
        fontWeight: 'bold',
    }

    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    let dislikes = 0
    let likes = 0

    function handleMyMaps(){
        navigate(`/profile/${auth.user._id}`);
    }
    function handleExportPNG(){
        console.log("export PNG file");
    }
    function handleExportJPG(){
        console.log("export JPG file.");
    }
    function handlePublishMap(){
        console.log("publish this map");
    }

    function handleForkMap(){
        console.log("fork this map");
    }

    function handleShareMap(){
        console.log("share this map");
    }

    const openMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const closeMenu = () => {
        setAnchorEl(null);
    };

    function handleLikeMap(){
        likes = likes + 1;
        console.log("Likes =" + likes);
    }

    function handleDislikeMap(){
        dislikes = dislikes + 1;
        console.log("Dislikes = " + dislikes);
    }

    return (
        <AppBar position='static'>
            <Toolbar className="map-screen-topbar">
                <Button
                    style = {BackButtonStyle}
                    onClick={handleMyMaps}>
                    &lt;&lt; My Maps
                </Button>
                <Box className="map-button-container">
                    <IconButton id="like-button" onClick={handleLikeMap}>
                        <ThumbUpOffAltIcon style={{color:"black"}}></ThumbUpOffAltIcon>
                        <t style={{color:"black"}}> {likes} </t>
                    </IconButton>
                    <IconButton id="dislike-button" onClick={handleDislikeMap}>
                        <ThumbDownOffAltIcon style={{color:"black"}}></ThumbDownOffAltIcon>
                        <t style={{color:"black"}}>{dislikes}</t>
                    </IconButton>
                    <Button variant="contained" style = {toolButtonStyle} onClick={handleShareMap}>Share Link</Button>
                    <Button variant="contained" style = {toolButtonStyle} onClick={handleForkMap}>Fork</Button>
                    <Button variant="contained" style = {toolButtonStyle} onClick={handleExportJPG}>Export/Download</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );

}