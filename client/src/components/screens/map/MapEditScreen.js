import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function MapEditScreen() {
    const navigate = useNavigate();

    function handleMyMaps(){
        navigate('/profile');
    }

  return (
    <Box>
        <Button onClick={handleMyMaps}>
            &lt;&lt; My Maps
        </Button>
        <Typography>Welcome to edit map screen</Typography>
    </Box>
  );
}
