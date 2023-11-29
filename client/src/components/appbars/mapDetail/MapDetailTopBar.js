import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";

import { Box, Typography, Button, Menu, MenuItem, AppBar, Toolbar, IconButton } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';

import { Tag } from "../../index";

import AuthContext from '../../../contexts/auth';
import MapContext from '../../../contexts/map';
import UserContext from '../../../contexts/user';
import GlobalStoreContext from '../../../contexts/store';

export default function MapDetailTopBar(){
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
    const { userInfo } = useContext(UserContext);
    const { store } = useContext(GlobalStoreContext);
    const { mapId } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [tags, setTags] = useState([]);
    const [likedUsers, setLikedUsers] = useState([]);
    const [dislikedUsers, setDislikedUsers] = useState([]);

    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        if(mapInfo?.currentMap){
            setTitle(mapInfo.currentMap.title);
            setTags(mapInfo.currentMap.tags);
            setLikedUsers(mapInfo.currentMap.likedUsers);
            setDislikedUsers(mapInfo.currentMap.dislikedUsers);
        }
    }, [mapInfo?.currentMap]);

    useEffect(() => {
        setLikes(likedUsers.length);
    }, [likedUsers]);

    useEffect(() => {
        setDislikes(dislikedUsers.length);
    }, [dislikedUsers]);

    function handleMyMaps(){
        userInfo.setCurrentUser(auth.user);
        navigate(`/profile/${auth.user._id}`);
    }
    function handleCommunity(){
        navigate('/community');
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
        setLikes(likes+1);
    }

    function handleDislikeMap(){
        setDislikes(dislikes+1);
    }

    function handleDeleteMap(event) {
        event.stopPropagation();
        event.preventDefault();
        store.markMapForDeletion(mapInfo.currentMap);
    }

    function handleUnpublishMap(event){
        event.stopPropagation();
        event.preventDefault();
        mapInfo.unpublishMapById(mapId);
        navigate(`/map-edit/${mapId}`);
    };

    function renderLikeButtons(){
        if(!auth?.user){
            return null;
        }

        return(
            <>
                <IconButton id="like-button" onClick={handleLikeMap}>
                    {
                        (mapInfo?.currentMap?.likedUsers?.includes(auth.user._id)) ?
                            <ThumbUpIcon style={{color:"black"}}></ThumbUpIcon> :
                            <ThumbUpOffAltIcon style={{color:"black"}}></ThumbUpOffAltIcon>
                    }
                    <Typography style={{color:"black"}}> {likes} </Typography>
                </IconButton>
                <IconButton id="dislike-button" onClick={handleDislikeMap}>
                    {
                        (mapInfo?.currentMap?.dislikedUsers?.includes(auth.user._id)) ?
                            <ThumbDownIcon style={{color:"black"}}></ThumbDownIcon> :
                            <ThumbDownOffAltIcon style={{color:"black"}}></ThumbDownOffAltIcon>
                    }
                    <Typography style={{color:"black"}}>{dislikes}</Typography>
                </IconButton>
            </>
        );
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

        return buttonSet.map((btn, index) => (
            <Button key={index} variant="contained" style={toolButtonStyle} onClick={btn.handler}>{btn.text}</Button>)
        )
    }

    return (
        <AppBar position='static'>
            <Toolbar className="map-screen-topbar">
                {(auth.user) ? 
                    (
                        <Button
                            style = {BackButtonStyle}
                            onClick={handleMyMaps}
                        >
                            &lt;&lt; My Maps
                        </Button>
                    ) :
                    (
                        <Button
                            style = {BackButtonStyle}
                            onClick = {handleCommunity}
                        >
                            &lt;&lt; Back to Community
                        </Button>
                    )
                }
               
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
                    { renderLikeButtons() }
                    { renderActionButtons() }
                </Box>
            </Toolbar>
        </AppBar>
    );

}