import { useContext } from 'react';
import { Box, Button, Avatar, Typography } from '@mui/material';
//import AuthContext from '../../../contexts/auth';

function HomeCard({isLoggedInUser}){
    //const { auth } = useContext(AuthContext)

    return (
        <Box id='home-navigation-card'>
            <Box className='flex-column' id='home-navigation-box'>
                <Box id='cover'></Box>
                <Typography variant='p' className='create-box'>{ "CREATE" }</Typography>
                <Typography variant='p' className='search-box'>{ "SEARCH" }</Typography>
                <Typography variant='p' className='maps-box'>{ "MY MAPS" }</Typography>
                <Typography variant='p' className='posts-box'>{ "MY POSTS" }</Typography>
                <Typography variant='p' className='community-box'>{ "COMMUNITY" }</Typography>
            </Box>
        </Box>
    );
}

export default HomeCard;
