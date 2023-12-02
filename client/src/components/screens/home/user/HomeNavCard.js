import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button } from '@mui/material';

import ExploreRoundedIcon from '@mui/icons-material/ExploreRounded';
import PostAddRoundedIcon from '@mui/icons-material/PostAddRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import AssignmentIndRoundedIcon from '@mui/icons-material/AssignmentIndRounded';
import PeopleIcon from '@mui/icons-material/People';

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

    function handleCreateMap(){
        store.setCurrentView("CREATE_MAP");
        navigate('/create');
    }

    function handleCreatePost(){
        store.setCurrentView("CREATE_POST");
        navigate('/create');
    }

    const buttonInfo = [
        { text: 'CREATE MAP', icon: <ExploreRoundedIcon/>, handler: handleCreateMap },
        { text: 'CREATE POST', icon: <PostAddRoundedIcon/>, handler: handleCreatePost },
        { text: 'SEARCH', icon: <SearchRoundedIcon/>, handler: handleSearch },
        { text: 'MY PROFILE', icon: <AssignmentIndRoundedIcon/>, handler: handleViewProfile },
        { text: 'COMMUNITY', icon: <PeopleIcon/>, handler: handleViewCommunity }
    ]

    return (
        <Box id='home-navigation-card'>
            {
                buttonInfo.map((btn) =>{
                    return(
                        <Button
                            key={btn.text} className={btn.text} id='filled-btn'
                            variant='contained'
                            onClick={btn.handler}
                            startIcon={btn.icon}
                        >
                            {btn.text}
                        </Button>
                    )
                })
            }
        </Box>
    );
}

export default HomeNavCard;
