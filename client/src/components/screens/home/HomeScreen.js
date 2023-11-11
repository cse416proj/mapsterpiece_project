import { useContext } from 'react';
import { Box } from '@mui/material';

import AuthContext from '../../../contexts/auth';
import { Hero, UserHomeScreen, Copyright } from '../../index';

function HomeScreen(){
    const { auth } = useContext(AuthContext);

    return(
        <Box className='content'>
            {
                (auth?.loggedIn && auth?.user !== null) ?
                    <UserHomeScreen/>
                    : (
                        <>
                            <Hero/>
                            <Copyright/>
                        </>
                    )
                    
            }
        </Box>
    )
}

export default HomeScreen;