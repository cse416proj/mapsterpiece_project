import { useContext, useRef, useState } from 'react';
import { Typography, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import CommentInput from '../../screens/commonProps/input/CommentInput';
import { MapComment } from '../../index';

import MapContext from '../../../contexts/map';
import AuthContext from '../../../contexts/auth';

export default function MapCommentSideBar({ toggleCommentBox }){
    const { mapInfo } = useContext(MapContext);
    const { auth } = useContext(AuthContext);

    // const inputRef = useRef(null);
    const [commentInput, setCommentInput] = useState('');

    const handleInputChange = (event) => {
        setCommentInput(event.target.value);
    }

    const handleSubmitComment = () => {
        const mapId = mapInfo.currentMap._id;

        if (mapId && auth?.user?.userName && commentInput !== '') {
            mapInfo.createMapComment(mapId, auth?.user?.userName, commentInput);
            setCommentInput('');

            // // Reset the input value using the ref
            // if(inputRef.current){
            //     inputRef.current.value = '';
            // }
        }
        else
        {
            console.log('no map / no user / no comment');
        }
    }

    return (
        <Box className='flex-column' id='comment-sidebar-container'>
            <Box className='flex-row' id='close-comment-sidebar'>
                <Typography style={{ fontWeight: 'bolder' }} onClick={toggleCommentBox}>
                    Close Comment Box
                </Typography>
                <CloseIcon id='close-comment-btn' onClick={toggleCommentBox}/>
            </Box>

            <CommentInput
                commentInput={commentInput} 
                // inputRef={inputRef}
                handleInputChange={handleInputChange}
                handleSubmitComment={handleSubmitComment}
            />

            <Box id='map-comments-container'>
                {
                    mapInfo?.allCommentsForMap?.map((pair, index) => (
                        <MapComment id='map-comment' key={`comment-${index}`} payload={pair} index={index}/>
                    ))
                }
            </Box>
        </Box>
    )
}