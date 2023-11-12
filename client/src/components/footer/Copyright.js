import { Box, Typography } from '@mui/material';

function Copyright(){
    return(
        <Box className='flex-row' id='footer'>
            <Typography variant='p'>
                {`Copyright © 2023 by Team Mint (Choi Ying, Zian, Shiying & Sahil) | All rights reserved`}
            </Typography>
        </Box>
    )
}

export default Copyright;