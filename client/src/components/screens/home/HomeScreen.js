import { useContext } from 'react';
import { Box } from '@mui/material';

import AuthContext from '../../../contexts/auth';
import { Hero, UserHomeScreen, Copyright } from '../../index';

function HomeScreen(){
    const { auth } = useContext(AuthContext);

    function getClassName() {
        if(auth && auth.loggedIn && auth.user !== null){
            return 'content';
        }
        else{
            return 'default-content';
        }
    }

    return(
        <Box className={getClassName()}>
            {
                (auth?.loggedIn && auth?.user !== null) ?
                    <UserHomeScreen/> :
                    (<> <Hero/> <Copyright/> </>)
            }
        </Box>
    )
}

export default HomeScreen;