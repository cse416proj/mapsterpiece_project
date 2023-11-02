import { Box } from '@mui/material';

import Hero from './Hero';
import Copyright from './Copyright';

function Home(){
    return(
        <Box id='content'>
            <Hero/>
            <Copyright/>
        </Box>
    )
}

export default Home;