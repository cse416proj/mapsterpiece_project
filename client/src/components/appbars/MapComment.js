import React from 'react';
import { Input, Button, Box, Toolbar, Typography} from '@mui/material';

export default function MapComment(payload, index){
    payload = payload.payload;
    console.log(payload);
    return (
        <Box>
            <Typography>this is one comment</Typography>
        </Box>
    );
}