import { useContext } from 'react';
import { Box, Button, Avatar, Typography } from '@mui/material';

import { Modals } from "../../index";

import AuthContext from '../../../contexts/auth';
import { GlobalStoreContext } from "../../../contexts/store";

function ProfileCard({ initials, name, userName, numMaps, numPosts, isLoggedInUser }){
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);

    function markAccountForDeletion(){
        store.markAccountForDeletion(auth.user._id);
    }
    
    function renderDeleteAccountButton(){
        return(
            (isLoggedInUser) ?
                <Button variant='contained' id='delete-account' onClick={markAccountForDeletion}>Delete Account</Button> :
                null
        );
    }

    return (
        <Box id='user-info-card'>
            <Box className='flex-column' id='user-info-box'>
                <Box id='cover'></Box>
                <Avatar id='user-initials-icon'>{initials}</Avatar>
                <Box className='flex-column' id='user-info-container'>
                    <Box>
                        <Typography variant='h5' id='user-full-name'>{ name }</Typography>
                        <Typography variant='p' id='user-name'>{ userName }</Typography>
                    </Box>
                    <Box className='flex-row' id='user-stats'>
                        <Typography variant='p' className='stats'>{ numMaps } {(numMaps > 1) ? 'Maps' : 'Map'}</Typography>
                        <Typography variant='p' className='stats'>{ numPosts } {(numPosts > 1) ? 'Posts' : 'Post'}</Typography>
                    </Box>
                    { renderDeleteAccountButton() }
                </Box>
            </Box>
            <Modals/>
        </Box>
    );
}

export default ProfileCard;