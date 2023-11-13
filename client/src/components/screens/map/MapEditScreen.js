import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import MapEditTopBar from '../../appbars/MapEditTopBar';
import MapEditSideBar from '../../appbars/MapEditSideBar';

export default function MapEditScreen() {
  return (
    <Box>
        <MapEditTopBar/>
        <Typography>Welcome to edit map screen</Typography>
        <MapEditSideBar/>
        
    </Box>
  );
}
