import { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Typography, Box, Divider, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SmsRoundedIcon from '@mui/icons-material/SmsRounded';

import CommentInput from '../../screens/commonProps/input/CommentInput';
import { MapComment } from '../../index';

import MapContext from '../../../contexts/map';
import AuthContext from '../../../contexts/auth';

export default function MapCommentSideBar({ toggleCommentBox }){
    const { mapInfo } = useContext(MapContext);
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();

    const inputRef = useRef(null);
    const [commentInput, setCommentInput] = useState('');
    const [error, setError] = useState('');

    const handleInputChange = (event) => {
        setCommentInput(event.target.value);
    }

    const handleSubmitComment = () => {
        const mapId = mapInfo.currentMap._id;

        if (mapId && auth?.user?.userName) {
            const trimmedInputWithoutSpace = commentInput.replace(/(\s|\r\n|\n|\r)/gm, '');

            if(trimmedInputWithoutSpace.length > 0){
                setError('');
                mapInfo.createMapComment(mapId, auth?.user?.userName, commentInput);
            }
            else{
                setError('Cannot submit blank text!');
            }
            
            // Reset the input value using the ref
            setCommentInput('');
            if(inputRef.current){
                inputRef.current.value = '';
            }
        }
    }

    const handleSignUp = () => {
        navigate('/register');
    }

    const handleSignIn = () => {
        navigate('/login');
    }

    return (
        <Box className='flex-column' id='comment-sidebar-container'>
            <Box className='flex-row' id='close-comment-sidebar'>
                <Typography style={{ fontWeight: 'bolder' }}>
                    Close Comment Box
                </Typography>
                <CloseIcon id='close-comment-btn' onClick={toggleCommentBox}/>
            </Box>

            <Divider id='comment-section-divider' style={{ margin: '0 auto 2vh auto' }}/>

            {
                (auth.user) ? 
                    <CommentInput
                        type='comment'
                        commentInput={commentInput} 
                        inputRef={inputRef}
                        error={error}
                        handleInputChange={handleInputChange}
                        handleSubmitComment={handleSubmitComment}
                    /> :
                    <Box className='flex-column' id='account-prompt'>
                        <Box className='flex-row' id='account-prompt-description'>
                            <SmsRoundedIcon id='account-prompt-icon'/> 
                            <Typography variant='h6' id='account-prompt-text'>Want to leave a comment?</Typography>
                        </Box>
                        <Box className='flex-row' id='account-prompt-actions'>
                            <Button variant='contained' className='account-prompt-btns' id='account-signup' onClick={handleSignUp}>Sign Up</Button>
                            <Button variant='contained' className='account-prompt-btns' id='account-login' onClick={handleSignIn}>Login</Button>
                        </Box>
                    </Box>
            }

            <Divider id='comment-section-divider'>
                Comment Section
            </Divider>

            <Box id='map-comments-container'>
                {
                    mapInfo?.allCommentsForMap?.map((pair, index) => (
                        <MapComment key={`comment-${index}`} payload={pair} index={index}/>
                    ))
                }
            </Box>
        </Box>
    )
}