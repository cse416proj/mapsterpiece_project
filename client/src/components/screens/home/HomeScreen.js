import { Box } from '@mui/material';

import Hero from './Hero';
import Copyright from '../../Copyright';

function HomeScreen(){
    return(
        <Box className='content'>
            <Hero/>
            <Copyright/>
        </Box>
    )
}

export default HomeScreen;