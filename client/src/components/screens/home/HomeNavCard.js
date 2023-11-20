import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';

import AuthContext from '../../../contexts/auth';
import UserContext from '../../../contexts/user';

function HomeNavCard(){
    const { auth } = useContext(AuthContext);
    const { userInfo } = useContext(UserContext);

    const navigate = useNavigate();

    function handleViewProfile(){
        userInfo.setCurrentUser(auth.user);
        navigate('/profile');
    }

    const buttonInfo = [
        { text: 'CREATE', handler: () => navigate('/create') },
        { text: 'SEARCH', handler: () => navigate('/search') },
        { text: 'MY PROFILE', handler: handleViewProfile },
        { text: 'COMMUNITY', handler: () => navigate('/community') }
    ]

    return (
        <Box id='home-navigation-card'>
            {
                buttonInfo.map((info) =>{
                    return <Button variant='contained' id='filled-btn' onClick={info.handler}>{info.text}</Button>
                })
            }
        </Box>
    );
}

export default HomeNavCard;
