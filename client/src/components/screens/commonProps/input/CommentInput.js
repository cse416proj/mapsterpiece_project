import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Textarea } from '@mui/joy';
import { Box, Button, Typography, Divider } from '@mui/material';

import AuthContext from "../../../../contexts/auth";
import UserContext from "../../../../contexts/user";

export default function CommentInput({ type, commentInput, inputRef, handleInputChange, handleSubmitComment }){
    const { auth } = useContext(AuthContext);
    const { userInfo } = useContext(UserContext);
    const navigate = useNavigate();

    const isComment = (type !== 'subcomment');

    // useEffect(() => {
        //     if(!content && missingContent){
        //         console.log('should focus')
        //         textareaRef.current?.focus();
        //     }
        //     // eslint-disable-next-line react-hooks/exhaustive-deps
        // }, [missingContent]);

    function handleVisitProfile(event){
        event.stopPropagation();
        event.preventDefault();
        userInfo.setCurrentUser(auth.user);
        navigate(`/profile/${auth.user._id}`);
    }

    function renderPrompt(){
        if(isComment){
            <Typography id='comment-username-text'>
                Comment as <span id='comment-username' onClick={handleVisitProfile}>{auth?.user?.userName}</span>
            </Typography>
        }
        return;
    }

    if(!auth?.user){
        return null;
    }

    return(
        <Box className='flex-column' id='comment-input-container'>
            { renderPrompt() }
            <Box className='flex-row' id='comment-input-wrapper' style={(isComment) ? { width: '100%'} : { width: '95%', borderLeft: 'solid'}}>
                <Textarea
                    id='comment-input'
                    color='white'
                    minRows={1}
                    maxRows={2}
                    variant='soft'
                    placeholder={ (isComment) ? 'Enter your comment here...' : 'Enter your subcomment here...'}
                    sx={{ width: '100%', '& input': { padding: '0' } }}
                    slotProps={{ textarea: { ref: inputRef } }}
                    onChange={handleInputChange}
                    // color={(!content && missingContent) ? 'danger' : 'neutral'}
                    endDecorator={
                        <Box
                            sx={{
                                display: 'flex',
                                borderTop: '1px solid',
                                borderColor: 'divider',
                                gap: 'var(--Textarea-paddingBlock)',
                                pt: 'var(--Textarea-paddingBlock)',
                                flex: 'auto',
                                alignItems: 'center'
                            }}
                        >
                            <Typography level='body-xs' sx={{ ml: '1vw' }}>
                                {(commentInput) ? commentInput?.length : 0} character(s)
                            </Typography>
                            <Button
                                variant="contained" id="comment-submit-btn"
                                sx={{ ml: 'auto' }}
                                onClick={handleSubmitComment}
                            >
                                Submit
                            </Button>
                        </Box>
                    }
                />
            </Box>
        </Box>
    )
}