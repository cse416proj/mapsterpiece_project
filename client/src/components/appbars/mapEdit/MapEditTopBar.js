import React, { useState, useContext, useEffect } from 'react'
import { Box, Typography, Button, Menu, MenuItem, AppBar, Toolbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import AuthContext from '../../../contexts/auth';
import MapContext from '../../../contexts/map';
import UserContext from '../../../contexts/user';
import GlobalStoreContext from '../../../contexts/store';

export default function MapEditTopBar() {
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
    
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [tags, setTags] = useState([]);
    const [hasPublished, setHasPublished] = useState(false);
    const [startPublishing, setStartPublishing] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        if(mapInfo?.currentMap){
            setTitle(mapInfo.currentMap.title);
            setTags(mapInfo.currentMap.tags);
            setHasPublished((mapInfo?.currentMap?.isPublished) ? true : false);
        }
    }, [mapInfo?.currentMap]);

    useEffect(() => {
        if(hasPublished){
            setStartPublishing(false);
            console.log('hasPublished');
            navigate(`/map-detail/${mapInfo.currentMap._id}`);
        }
    }, [hasPublished])

    function handleMyMaps(){
        userInfo.setCurrentUser(auth.user);
        navigate(`/profile/${auth.user._id}`);
    }
    function handleExportPNG(){
        console.log("export PNG file");
    }
    function handleExportJPG(){
        console.log("export JPG file.");
    }
    
    function handlePublishMap(event){
        event.stopPropagation();
        event.preventDefault();
        setStartPublishing(true);
        store.markMapForPublish(mapInfo.currentMap);
    };

    function handleSaveMap(){
        console.log("save this map");
        mapInfo.updateMapById(mapInfo.currentMap._id);
        navigate('/');
    }

    function handleDeleteMap(event) {
        event.stopPropagation();
        event.preventDefault();
        console.log('delete map')
        store.markMapForDeletion(mapInfo.currentMap);
    }

    const openMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const closeMenu = () => {
        setAnchorEl(null);
    };

    function getDropDownMenu(loggedIn, user){
        if(loggedIn && user){
            return (
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={closeMenu}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={handleExportPNG}>.PNG</MenuItem>
                    <MenuItem onClick={handleExportJPG}>.JPG</MenuItem>
                </Menu>
            );
        }
        else{
            return null;
        }
    }

    

  return (
    <AppBar position='static'>
        {
            (startPublishing) ?
                <Alert style={{ position: 'absolute' }}>Now publishing map...</Alert> :
                (hasPublished) ?
                    <Alert style={{ position: 'absolute' }}>Publish success!</Alert>:
                    null
        }
        <Toolbar className='map-screen-topbar'>
            <Button 
                style = {BackButtonStyle}
                onClick={handleMyMaps}
                id ="back">
                &lt;&lt; My Maps
            </Button>
            <Typography sx={{fontWeight: `bold`, color:`black`, fontSize:`30px`}}>{title}</Typography>
            <Box className="map-button-container">
                <Button variant="contained" style = {toolButtonStyle} onClick={handleDeleteMap}>Delete Map</Button>
                <Button variant="contained" style = {toolButtonStyle} onClick={handleSaveMap}>Save Edit</Button>
                <Button variant="contained" style = {toolButtonStyle} onClick={handlePublishMap}>Publish</Button>
                <Button variant="contained" style = {toolButtonStyle} onClick={openMenu}>Export/Download</Button>
            </Box>
            { getDropDownMenu(auth?.loggedIn, auth?.user) }
        </Toolbar>
    </AppBar>
  )
}