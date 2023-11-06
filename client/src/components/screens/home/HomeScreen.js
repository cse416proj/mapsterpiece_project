import { useContext } from 'react';
import { Box } from '@mui/material';

import Hero from './Hero';
import Copyright from '../../Copyright';
import AuthContext from '../../../auth';
import UserHomeScreen from './UserHomeScreen';

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