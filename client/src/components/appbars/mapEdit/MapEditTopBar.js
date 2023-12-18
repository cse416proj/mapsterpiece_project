import React, { useState, useContext, useEffect } from 'react'
import { Box, Typography, Button, AppBar, Toolbar, Alert } from '@mui/material';
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
    
    function handlePublishMap(event){
        event.stopPropagation();
        event.preventDefault();
        setStartPublishing(true);
        store.markMapForPublish(mapInfo.currentMap);
    };

    function handleSaveMap(){
        console.log("save this map");

        if(mapInfo.currentMap){
            const trimmedTitle = mapInfo.currentMap.title?.replace(/(\s|\r\n|\n|\r)/gm, '');
            const trimmedLegendTitle = mapInfo.currentMap.mapTypeData?.legendTitle?.replace(/(\s|\r\n|\n|\r)/gm, '');

            if(trimmedTitle.length <= 0){
                mapInfo.setErrorMsg(`Cannot enter blank value for map's title!`);
                return;
            }
            else if(trimmedLegendTitle.length <= 0){
                mapInfo.setErrorMsg(`Cannot enter blank value for a map's legend title!`);
                return;
            }
            else{
                // setStartSaving(true);
                mapInfo.updateMapById(mapInfo.currentMap._id);
                // navigate('/');
            }
        }
    }

    function handleDeleteMap(event) {
        event.stopPropagation();
        event.preventDefault();
        console.log('delete map')
        store.markMapForDeletion(mapInfo.currentMap);
    }

    function handleDuplicateMap(event){
        event.stopPropagation();
        event.preventDefault();
        console.log('duplicate map');
        store.markMapForDuplicate(mapInfo.currentMap);
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
                <Button variant="contained" style = {toolButtonStyle} onClick={handleDuplicateMap}>Duplicate</Button>
            </Box>
        </Toolbar>
    </AppBar>
  )
}