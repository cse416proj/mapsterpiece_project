import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import MapEditTopBar from '../../appbars/MapEditTopBar';
import MapEditSideBar from '../../appbars/MapEditSideBar';

export default function MapEditScreen() {
  return (
    <Box>
    <MapEditTopBar />
      <Box className="map-screen-container">
        <Typography>Welcome to edit map screen</Typography>
        <MapEditSideBar />
      </Box>
     
    </Box>
  );
}
