import React, { useState } from 'react';
import { Sidebar } from 'react-pro-sidebar';
import { Select, Typography, Box, MenuItem, Input } from '@mui/material';

import { Tags } from "../index";

function MapEditSideBar() {
  const sideBarStyle = {
    height:'88vh',
    top:'5px',
    width: '30%',
    marginLeft: '1vw',
    backgroundColor: '#DEE9EB',
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    borderRadius: '10px'
  }

  const [tags, setTags] = useState([]);

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
      <Box style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        <Typography>Tags</Typography>
        <Tags tags={tags} setTags={setTags}/>
      </Box>
      <Box>
        <Typography>Legend</Typography>
        <Typography>Title: </Typography>
        <Input aria-label='legend-title input' placeholder='Enter legend title'></Input>
      </Box>
    </Sidebar>
  );
}

export default MapEditSideBar;
