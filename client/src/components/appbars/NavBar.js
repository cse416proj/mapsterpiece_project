import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Box, Avatar, Menu, MenuItem } from '@mui/material';

import PersonIcon from '@mui/icons-material/Person';
import AuthContext from '../../contexts/auth';
import UserContext from '../../contexts/user';

function NavBar(){
    const { auth } = useContext(AuthContext);
    const { userInfo } = useContext(UserContext);

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
        navigate('/');
    }

    function handleSignin(event){
        closeMenu();
        navigate('/login');
    }

    function handleRegister(event){
        closeMenu();
        navigate('/register');
    }

    function handleViewProfile(event){
        closeMenu();
        userInfo.setCurrentUser(auth.user);
        navigate('/profile');
    }

    function handleLogout(event){
        closeMenu();
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