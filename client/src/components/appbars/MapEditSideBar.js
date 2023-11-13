import { Select, Typography, Box, MenuItem, Input } from '@mui/material';
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
    <Sidebar className='map-screen-sidebar' style={sideBarStyle} >
      <Typography sx={{fontWeight:'bold', fontSize:'25px'}}>Edit Map</Typography>
      <Box>
        <Typography>Map Type</Typography>
        <Select defaultValue={10}>
          <MenuItem value={10}>Bin Map</MenuItem>
          <MenuItem value={20}>Choropleth Map</MenuItem>
        </Select>
      </Box>
      <Box>
        <Typography>Map Title/Name</Typography>
        <Input aria-label='title input' placeholder='type new title'></Input>
      </Box>
      <Box>
        <Typography>Tags</Typography>
        <Box>here are the tags</Box>
      </Box>
      <Box>
        <Typography>Legend</Typography>
        <Typography>Title: </Typography>
        <Input aria-label='legend-title input' placeholder='enter legen title'></Input>
      </Box>
    </Sidebar>
  );
}

export default MapEditSideBar;
