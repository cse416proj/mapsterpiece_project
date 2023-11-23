import React from 'react';
import { Input, Button, Box, Toolbar} from '@mui/material';

export default function MapCommentSideBar(){
    return (
        <Toolbar>
            <Box>
                <Input className='map-sidebar-input' placeholder="Type your comment here..." rows="4" cols="25" />
                <Button variant="contained">Submit</Button>
            </Box>
            
        </Toolbar>
    );
}