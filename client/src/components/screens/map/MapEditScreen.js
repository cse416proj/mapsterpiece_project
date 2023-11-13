import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import MapEditTopBar from '../../appbars/MapEditTopBar';
import MapEditSideBar from '../../appbars/MapEditSideBar';

export default function MapEditScreen() {
  return (
    <Box style={{ height: '100%' }}>
    <MapEditTopBar />
      <Box style={{ 
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        flex: 1,
        }}>
        <Typography>Welcome to edit map screen</Typography>
        <MapEditSideBar />
      </Box>
     
    </Box>
  );
}
