import { useContext } from 'react';
import { Box, Typography } from '@mui/material';

import AuthContext from '../../../auth';

function UserHomeScreen(){
    const { auth } = useContext(AuthContext);

    if(!auth || !auth.user){
        return null;
    }

    return(
        <Box className='content'>
            <Typography variant='h3'>Welcome, { auth.user.firstName }!</Typography>
        </Box>
    )
}

export default UserHomeScreen;