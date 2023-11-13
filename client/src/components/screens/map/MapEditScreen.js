import { Box } from '@mui/material';
import React from 'react';
import MapEditTopBar from '../../appbars/MapEditTopBar';
import MapEditSideBar from '../../appbars/MapEditSideBar';

import MapScreen from './display/MapScreen';

export default function MapEditScreen() {
  return (
    <Box style={{ height: '100%' }}>
    <MapEditTopBar />
      <Box
        style={{ 
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          flex: 1,
        }}
      >
        <MapScreen/>
        <MapEditSideBar/>
      </Box>
     
    </Box>
  );
}
