import React, { useState, useContext, useEffect } from 'react';
import { Sidebar } from 'react-pro-sidebar';
import { Select, Typography, Box, MenuItem, Input, Toolbar } from '@mui/material';

import { Tags } from "../index";
import MapContext from '../../contexts/map';

function MapEditSideBar() {
  const { mapInfo } = useContext(MapContext);

  const [title, setTitle] = useState('');
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if(mapInfo){
      if(mapInfo.currentMap){
        console.log(mapInfo.currentMap);
        setTitle(mapInfo.currentMap.title);
        setTags(mapInfo.currentMap.tags);
      }
    }
  }, []);

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
            value={title}
          />
        </Box>

        <Box className="sidebar-block">
          <Typography className='sidebar-block-title'>Tags</Typography>
          <Tags tags={tags} setTags={setTags}/>
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
