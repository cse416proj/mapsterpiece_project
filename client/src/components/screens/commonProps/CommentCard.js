import { useContext } from "react";

import { Box, Typography, CardContent, IconButton } from '@mui/material';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

import { DeleteCommentModal } from "../../modals";
import AuthContext from '../../../contexts/auth';

export default function CommentCard({ type, comment, deleteHandler }){
    const { auth } = useContext(AuthContext);

    function renderDeleteBtn(){
        if(auth.loggedIn){
            return <IconButton onClick={deleteHandler}><DeleteForeverOutlinedIcon/></IconButton>
        }
        return null;
    }

    return (
        <CardContent id='comment-user-info-container' style={(type === 'comment') ? { height: '7.5vh' } : { height: '9.5vh' }}>
            <Box className='flex-row' id='comment-user-info-box'>
                <Box className='flex-row' id='comment-user-info'>
                    <AccountCircleIcon/>
                    <Typography id='comment-owner-name'> {comment?.commenterUserName} </Typography>
                </Box>
                { renderDeleteBtn() }
            </Box>
            <Typography id='comment'>{comment?.content}</Typography>
            {
                (type==='comment') ? <DeleteCommentModal type='map'/> : null
            }
        </CardContent>
    )
}