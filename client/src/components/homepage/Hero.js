import { Box, Typography, Button } from '@mui/material';

function Hero(){
    return(
        <Box id='content'>
            <Box className='flex-row' id='hero'>
                <Box className='flex-column'>
                    <Box
                        component='img'
                        alt='Mapsterpiece Hero'
                        src='/assets/hero_logo.png'
                        style={{ width: '55vw' }}
                    />
                    <Typography variant='h6' style={{ fontWeight: '600', fontStyle: 'italic' }}>A platform for map lovers</Typography>
                </Box>
                <Button variant='outlined' id='outline-btn'>Continue as Guest</Button>
            </Box>
            <Box className='flex-row' id='prompt'>
                <Typography variant='h6' style={{ fontWeight: '600', fontStyle: 'italic' }}>
                    Ready for full experience in creating,
                    <br/>
                    <span id='highlight'>sharing & discussing map on forum?</span>
                </Typography>
                <Box className='flex-row'>
                    <Button variant='contained' id='filled-btn'>Create Account</Button>
                    <Button variant='contained' id='filled-btn' style={{ marginLeft: '2.5vw' }}>Login</Button>
                </Box>
            </Box>
        </Box>
    )
}

export default Hero;