import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Box, Avatar, Menu, MenuItem } from '@mui/material';

import PersonIcon from '@mui/icons-material/Person';

function NavBar(){
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
        navigate('/signin');
    }

    function handleRegister(event){
        closeMenu();
        navigate('/signup');
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
                    <PersonIcon id='icon'/>
                </Avatar>
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
            </Toolbar>
        </AppBar>
    )
}

export default NavBar;