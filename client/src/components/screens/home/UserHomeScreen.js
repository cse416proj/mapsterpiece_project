import React, { useContext } from 'react';
import { Box, Typography } from '@mui/material';
import { DynamicCard } from '../../index';
import { GlobalStoreContext } from "../../../store";
import HomeCard from './HomeCard';
import "./HomeScreen.css"


import AuthContext from '../../../auth';

function UserHomeScreen(){
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);

    if(!auth || !auth.user){
        return null;
    }

    let mapCard = (
        <Box sx={{ width: "95%" }}>
            {store.allMaps.map((pair) => (
                <DynamicCard userData={null} mapData={pair} postData={null} />
            ))}
        </Box>
    );

    let postCard = (
        <Box sx={{ width: "95%" }}>
            {store.allPosts.map((pair) => (
                <DynamicCard userData={null} mapData={null} postData={pair} />
            ))}
        </Box>
    );

    return(
        <Box className='HomeContent'>
            <Box className = 'userWelcome'>
                <Typography variant='h3'>Welcome, { auth.user.firstName }!</Typography>
            </Box>
            <Box className ='HomeBoth'>
                <Box className='HomeFeed'>
                    <Box className="mapsDisplay">{mapCard}</Box>
                    <Box className="postsDisplay">{postCard}</Box>
                </Box>
                <HomeCard isLoggedInUser={auth.user} />
            </Box>
        </Box>
    )
}

export default UserHomeScreen;