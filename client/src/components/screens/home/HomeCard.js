import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function HomeCard(){
    const navigate = useNavigate();

    return (
        <Box id='home-navigation-card'>
            <Box className='flex-column' id='home-navigation-box'>
                <Box id='cover'></Box>
                <Button className='create-box' variant='contained' id='filled-btn' onClick={() => { navigate('/create') }}>{ "CREATE" }</Button>
                <Button className='search-box' variant='contained' id='filled-btn' onClick={() => { navigate('/search') }}>{ "SEARCH" }</Button>
                <Button className='maps-box' variant='contained' id='filled-btn' onClick={() => { navigate('/profile') }}>{ "MY MAPS" }</Button>
                <Button className='posts-box' variant='contained' id='filled-btn' onClick={() => { navigate('/profile') }}>{ "MY POSTS" }</Button>
                <Button className='community-box' variant='contained' id='filled-btn' onClick={() => { navigate('/community') }}>{ "COMMUNITY" }</Button>
            </Box>
        </Box>
    );
}

export default HomeCard;
