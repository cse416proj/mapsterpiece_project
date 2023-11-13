import React, { useContext } from 'react'
import { Box, Typography, Button, Menu, MenuItem, AppBar, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AuthContext from '../../contexts/auth';

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
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    function handleMyMaps(){
        navigate('/profile');
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
        <Toolbar className='map-screen-topbar'>
            <Button 
                style = {BackButtonStyle}
                onClick={handleMyMaps}>
                &lt;&lt; My Maps
            </Button>
            <Typography sx={{fontWeight: `bold`, color:`black`, fontSize:`30px`}}>Map Title</Typography>
            <Box className="map-button-container">
                <Button variant="contained" style = {toolButtonStyle} onClick={handlePublishMap}>Publish</Button>
                <Button variant="contained" style = {toolButtonStyle} onClick={openMenu}>Export/Download</Button>
            </Box>
            { getDropDownMenu(auth?.loggedIn, auth?.user) }
        </Toolbar>
    </AppBar>
  )
}