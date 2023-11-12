import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';

import { Login, Register, Copyright } from '../../index';

function AuthScreen(){
    // use current web location to determine whether render sign-in/sign-up screen
    const location = useLocation();

    return(
        <Box className='default-content'>
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