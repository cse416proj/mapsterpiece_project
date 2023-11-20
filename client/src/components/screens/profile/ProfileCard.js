import { useContext } from 'react';
import { Box, Button, Avatar, Typography } from '@mui/material';
import AuthContext from '../../../contexts/auth';
import UserContext from '../../../contexts/user';
import { GlobalStoreContext } from "../../../contexts/store";
import { DeleteAccountModal } from "../../index";


function ProfileCard({ initials, name, userName, numMaps, numPosts, isLoggedInUser }){
    const { auth } = useContext(AuthContext);
    const { userInfo } = useContext(UserContext);
    const { store } = useContext(GlobalStoreContext);

    function markAccountForDeletion(){
        store.markAccountForDeletion(auth.user._id);
    }
    
    function renderDeleteAccountButton(){
        return(
            (isLoggedInUser) ? <Button onClick={markAccountForDeletion}>Delete Account</Button> : null
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
                        <Typography variant='p' className='stats'>{ numMaps } Maps</Typography>
                        <Typography variant='p' className='stats'>{ numPosts } Posts</Typography>
                    </Box>
                    { renderDeleteAccountButton() }
                </Box>
            </Box>
            <DeleteAccountModal />
        </Box>
    );
}

export default ProfileCard;