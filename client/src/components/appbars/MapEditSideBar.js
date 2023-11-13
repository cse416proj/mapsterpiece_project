import { Select, Typography, Box, MenuItem, Input, Toolbar } from '@mui/material';
import React from 'react';
import { Sidebar } from 'react-pro-sidebar';
import Tags from '../screens/create/tag/Tags';

function MapEditSideBar() {
    const sideBarStyle = {
        height:'88vh',
        top:'5px',
        width: '30%',
        marginLeft: '1vw',
        backgroundColor: '#DEE9EB',
        boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        borderRadius: '10px',
    }


  return (
    <Sidebar style={sideBarStyle} >
        <Toolbar className='map-screen-sidebar'>
            <Typography sx={{fontWeight:'bold', fontSize:'25px'}}>Edit Map</Typography>
            <Box className="sidebar-block">
                <Typography className='sidebar-block-title'>Map Type</Typography>
                <Select defaultValue={10} className="sidebar-block-content">
                    <MenuItem value={10}>Bin Map</MenuItem>
                    <MenuItem value={20}>Choropleth Map</MenuItem>
                </Select>
            </Box>

            <Box className="sidebar-block">
                <Typography className='sidebar-block-title'>Map Title/Name</Typography>
                <Input 
                    className="sidebar-block-content sidebar-input" 
                    aria-label='title input' 
                    placeholder='type new title' 
                />
            </Box>

            <Box className="sidebar-block">
                <Typography className='sidebar-block-title'>Tags</Typography>
                <Box className="sidebar-block-content tag-block">(here are the tags)</Box>
            </Box>
            <Box className="sidebar-block">
                <Typography className='sidebar-block-title'>Legend</Typography>
                <Box className="legend-title-container sidebar-block-content">
                    <Typography>Title: </Typography>
                    <Input 
                        className="sidebar-input" 
                        aria-label='legend-title input' 
                        placeholder='enter legend title' 
                    />
                </Box>
            </Box>
            <Box className="sidebar-block">
                <Typography className='sidebar-block-title'>Map Data</Typography>
                <Box className="sidebar-block-content data-block"></Box>
                {/* map data table */}
            </Box>
        </Toolbar>
    </Sidebar>
  );
}

export default MapEditSideBar;
