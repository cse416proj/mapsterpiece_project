import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";

import { Box, Typography, Button, Menu, MenuItem, AppBar, Toolbar, IconButton } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';

import { Tag } from "../index";

import AuthContext from '../../contexts/auth';
import MapContext from '../../contexts/map';
import GlobalStoreContext from '../../contexts/store';

export function MapDetailTopBar(){
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
    const { mapInfo } = useContext(MapContext);
    const { store } = useContext(GlobalStoreContext);
    const { mapId } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [tags, setTags] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        if(mapInfo){
            if(mapInfo.currentMap){
                setTitle(mapInfo.currentMap.title);
                setTags(mapInfo.currentMap.tags);
            }
        }
    }, []);

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

    function handleDeleteMap(event) {
        event.stopPropagation();
        event.preventDefault();
        console.log('delete map')
        store.markMapForDeletion(mapInfo.currentMap);
    }

    function handleUnpublishMap(event){
        event.stopPropagation();
        event.preventDefault();
        mapInfo.unpublishMapById(mapId);
    };

    function renderLikeButtons(){
        if(!auth?.user){
            return null;
        }

        let likeView = (
            <>
                <ThumbUpOffAltIcon style={{color:"black"}}></ThumbUpOffAltIcon>
                <t style={{color:"black"}}> {likes} </t>
            </>
        );
            
        if(mapInfo?.currentMap){
            const likedUsers = mapInfo?.currentMap?.likedUsers;
            const dislikedUsers = mapInfo?.currentMap?.dislikedUsers;
            if(likedUsers.includes(auth.user._id)){
                likeView = (
                    <>
                        <ThumbUpIcon style={{color:"black"}}></ThumbUpIcon>
                        <t style={{color:"black"}}> {likes} </t>
                    </>
                );
            }
        }
        // <IconButton id="like-button" onClick={handleLikeMap}>
        //     <ThumbUpOffAltIcon style={{color:"black"}}></ThumbUpOffAltIcon>
        //     <t style={{color:"black"}}> {likes} </t>
        // </IconButton>
        // <IconButton id="dislike-button" onClick={handleDislikeMap}>
        //     <ThumbDownOffAltIcon style={{color:"black"}}></ThumbDownOffAltIcon>
        //     <t style={{color:"black"}}>{dislikes}</t>
        // </IconButton>
    }

    function renderActionButtons(){
        let buttonSet = [
            { text: 'Delete', handler: handleDeleteMap },
            { text: 'Unpublish', handler: handleUnpublishMap },
            { text: 'Fork', handler: handleForkMap },
            { text: 'Share Link', handler:handleShareMap },
            { text: 'Export/Download', handler: handleExportJPG}
        ]
        
        if(mapId && auth?.user){
            // logged in but non-owner
            if(!auth.user.maps?.includes(mapId)){
                buttonSet = buttonSet.slice(2);
            }
        }
        else{
            // not logged in -> guest
            buttonSet = buttonSet.slice(3);
        }

        return buttonSet.map((btn) => (<Button variant="contained" style={toolButtonStyle} onClick={btn.handler}>{btn.text}</Button>))
    }

    return (
        <AppBar position='static'>
            <Toolbar className="map-screen-topbar">
                <Button
                    style = {BackButtonStyle}
                    onClick={handleMyMaps}>
                    &lt;&lt; My Maps
                </Button>
                <Typography sx={{fontWeight: `bold`, color:`black`, fontSize:`30px`}}>{title}</Typography>
                <Box className='flex-row' id='tags-container'>
                    {
                        (tags.length === 0) ?
                            null :
                            <>
                                <Typography id='post-tags-text' style={{ color: 'black' }}>Tags:</Typography>
                                {
                                    tags.map((tag, index) => {
                                        return <Tag key={index} index={index} tag={tag} removeTag={null}/>;
                                    })
                                }
                            </>
                    }
                </Box>
                <Box className="map-button-container">
                    {/* <IconButton id="like-button" onClick={handleLikeMap}>
                        <ThumbUpOffAltIcon style={{color:"black"}}></ThumbUpOffAltIcon>
                        <t style={{color:"black"}}> {likes} </t>
                    </IconButton>
                    <IconButton id="dislike-button" onClick={handleDislikeMap}>
                        <ThumbDownOffAltIcon style={{color:"black"}}></ThumbDownOffAltIcon>
                        <t style={{color:"black"}}>{dislikes}</t>
                    </IconButton> */}
                    { renderLikeButtons() }
                    { renderActionButtons() }
                </Box>
            </Toolbar>
        </AppBar>
    );

}