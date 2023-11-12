import { useContext } from 'react';
import { Box, Button, Avatar, Typography } from '@mui/material';
import AuthContext from '../../../contexts/auth';

function UserCard({ initials, name, userName, numMaps, numPosts, isLoggedInUser }){
    const { auth } = useContext(AuthContext);
    
    function handleDeleteAccount(event){
        auth.deleteUser(auth.user);
    }
    
    function renderDeleteAccountButton(){
        return(
            (isLoggedInUser) ? <Button onClick={handleDeleteAccount}>Delete Account</Button> : null
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
                        <Typography variant='p' className='stats'>{ numMaps }</Typography>
                        <Typography variant='p' className='stats'>{ numPosts }</Typography>
                    </Box>
                    { renderDeleteAccountButton() }
                </Box>
            </Box>
        </Box>
    );
}

export default UserCard;