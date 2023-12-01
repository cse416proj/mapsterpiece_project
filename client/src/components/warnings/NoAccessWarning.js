import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';

export default function NoAccessWarning(){
    const navigate = useNavigate();

    const handleReturn = () => {
        navigate('/');
    }

    return(
        <Box className='flex-row' id='warning-screen'>
            <Box className='flex-column' id='warning-wrapper'>
                <ReportProblemOutlinedIcon id='warning-icon'/>
                <Typography variant='h2'>You have no permission to access this page.</Typography>
                <Button id='warning-outline-btn' variant='outlined' onClick={handleReturn}>Return Home</Button>
            </Box>
        </Box>
    )
}