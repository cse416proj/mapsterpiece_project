import { useContext } from 'react';
import { Box, Button } from '@mui/material';

import AuthContext from '../../../auth';

function Profile(){
    const { auth } = useContext(AuthContext);

    function handleDeleteAccount(event){
        auth.deleteUser(auth.user);
    }

    return(
        <Box className='content'>
            <Button onClick={handleDeleteAccount}>Delete Account</Button>
        </Box>
    )
}

export default Profile;