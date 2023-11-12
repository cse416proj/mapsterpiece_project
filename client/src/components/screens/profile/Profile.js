import { useContext, useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';

import ProfileCard from './ProfileCard';
import { DynamicCard } from '../../index';
import ActionButton from './ActionButton';
import UserContext from '../../../contexts/user';
import AuthContext from '../../../contexts/auth';

function Profile(){
    const { auth } = useContext(AuthContext);
    const { userInfo } = useContext(UserContext);

    const [tab, setTab] = useState('map');

    const handleChangeTab = (event, newTab) => {
        setTab(newTab);
    }

    if(!userInfo.currentUser){
        return null;
    }

    function fetchContent(){
        if(tab === 'map'){
            console.log(userInfo.currentMaps);
            return userInfo.currentMaps.map((map) => (
                <DynamicCard userData={null} mapData={map} postData={null} />
            ))
        }
        else{
            return userInfo.currentPosts.map((post) => (
                <DynamicCard userData={null} mapData={null} postData={post} />
            ))
        }
    }

    return(
        <Box className='content' id='user-info-content'>
            <Box className='flex-row' id='user-info'>
                <Box id='all-maps-posts'>
                    <Tabs
                        className='flex-row' id='tab-section'
                        onChange={handleChangeTab} value={tab}
                    >
                        <Tab
                            id={(tab === 'map') ? 'profile-tab-selected' : 'profile-tab'}
                            label='Create Map'
                            value='map'
                        />
                        <Tab
                            id={(tab === 'post') ? 'profile-tab-selected' : 'profile-tab'}
                            label='Create Post'
                            value='post'
                        />
                    </Tabs>
                    <Box> { fetchContent() } </Box>
                </Box>
                <ProfileCard
                    initials={auth.getUserInitials().toUpperCase()}
                    name={userInfo.getUserFullName()}
                    userName={userInfo.getUserName()}
                    numMaps={userInfo.getNumMaps()}
                    numPosts={userInfo.getNumPosts()}
                    isLoggedInUser={auth.user !== null && auth.user === userInfo.currentUser}
                />
            </Box>
            <ActionButton/>
        </Box>
    )
}

export default Profile;