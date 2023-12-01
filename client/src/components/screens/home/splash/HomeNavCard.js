import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';

import AuthContext from '../../../../contexts/auth';
import UserContext from '../../../../contexts/user';
import GlobalStoreContext from '../../../../contexts/store';

function HomeNavCard(){
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const { userInfo } = useContext(UserContext);

    const navigate = useNavigate();

    function handleViewProfile(){
        userInfo.setCurrentUser(auth.user);
        navigate(`/profile/${auth.user._id}`);
    }

    function handleSearch(){
        userInfo.setCurrentUser(auth.user);
        store.setCurrentView("SEARCH");
        navigate(`/search/${auth.user._id}`);
    }

    function handleViewCommunity(){
        userInfo.setCurrentUser(auth.user);
        store.setCurrentView("COMMUNITY");
        navigate("/community");
    }

    const buttonInfo = [
        { text: 'CREATE', handler: () => navigate('/create') },
        { text: 'SEARCH', handler: handleSearch },
        { text: 'MY PROFILE', handler: handleViewProfile },
        { text: 'COMMUNITY', handler: handleViewCommunity }
    ]

    return (
        <Box id='home-navigation-card'>
            {
                buttonInfo.map((info) =>{
                    return <Button key={info.text} variant='contained' id='filled-btn' onClick={info.handler} className={info.text}>{info.text}</Button>
                })
            }
        </Box>
    );
}

export default HomeNavCard;
