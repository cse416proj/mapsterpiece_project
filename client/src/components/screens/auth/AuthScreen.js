import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';

import Login from './Login';
import Register from './Register';
// import Copyright from '../../Copyright';
import { Copyright } from '../../index';

function AuthScreen(){
    // use current web location to determine whether render sign-in/sign-up screen
    const location = useLocation();

    return(
        <Box className='content'>
            {
                (location.pathname === '/login')
                    ? <Login/>
                    : <Register/>
            }
            <Copyright/>
        </Box>
    )
}

export default AuthScreen;