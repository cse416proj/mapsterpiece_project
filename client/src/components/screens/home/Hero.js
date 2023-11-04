import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Hero(){
    const navigate = useNavigate();

    function handleSignin(event){
        navigate('/signin');
    }

    function handleRegister(event){
        navigate('/signup');
    }

    return(
        <Box className='content'>
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
                    <Button
                        id='filled-btn'
                        variant='contained'
                        onClick={handleSignin}
                    >
                        Create Account
                    </Button>
                    <Button
                        id='filled-btn'
                        variant='contained'
                        style={{ marginLeft: '2.5vw' }}
                        onClick={handleRegister}
                    >
                        Login
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

export default Hero;