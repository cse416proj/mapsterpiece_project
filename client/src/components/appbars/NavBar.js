import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Box, Avatar, Menu, MenuItem } from '@mui/material';

import PersonIcon from '@mui/icons-material/Person';
import AuthContext from '../../contexts/auth';
import MapContext from '../../contexts/map';
import UserContext from '../../contexts/user';
import GlobalStoreContext from '../../contexts/store';

function NavBar(){
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const { userInfo } = useContext(UserContext);
    const { mapInfo } = useContext(MapContext);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const navigate = useNavigate();

    const openMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const closeMenu = () => {
        setAnchorEl(null);
    };
    
    function handleGoHome(event){
        event.stopPropagation();
        event.preventDefault();
        store.setCurrentView("USER_HOME");
        mapInfo.clear();
        navigate('/');
    }

    function handleSignin(event){
        event.stopPropagation();
        event.preventDefault();
        closeMenu();
        auth.clearMsg();
        navigate('/login');
    }

    function handleRegister(event){
        event.stopPropagation();
        event.preventDefault();
        closeMenu();
        auth.clearMsg();
        navigate('/register');
    }

    function handleViewProfile(event){
        event.stopPropagation();
        event.preventDefault();
        closeMenu();
        mapInfo.clear();
        userInfo.setCurrentUser(auth.user);
        navigate(`/profile/${auth.user._id}`);
    }

    function handleLogout(event){
        event.stopPropagation();
        event.preventDefault();
        closeMenu();
        mapInfo.clear();
        auth.logoutUser();
    }

    function getDropDownMenu(loggedIn, user){
        if(loggedIn && user){
            return (
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={closeMenu}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={handleViewProfile}>Profile</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
            );
        }
        else{
            return (
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={closeMenu}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={handleRegister}>Register</MenuItem>
                    <MenuItem onClick={handleSignin}>Login</MenuItem>
                </Menu>
            )
        }
    }

    function getAccountMenu(loggedIn){
        let userInitials = auth.getUserInitials();
        if (loggedIn)
            return <Avatar id='initialsIcon'>{userInitials}</Avatar>;
        else
            return <PersonIcon id='icon'/>;
    }

    return(
        <AppBar position='static'>
            <Toolbar id='navbar'>
                <Box
                    component='img'
                    alt='Mapsterpiece Logo'
                    src='/assets/nav_logo.png'
                    id='logo'
                    onClick={handleGoHome}
                />
                <Avatar
                    onClick={openMenu}
                    id='avatar'
                >
                    { getAccountMenu(auth?.loggedIn) }
                </Avatar>
                { getDropDownMenu(auth?.loggedIn, auth?.user) }
            </Toolbar>
        </AppBar>
    )
}

export default NavBar;