import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Textarea } from '@mui/joy';
import { Box, Button, Typography } from '@mui/material';

import AuthContext from "../../../../contexts/auth";
import UserContext from "../../../../contexts/user";

export default function CommentInput({ commentInput, handleInputChange, handleSubmitComment }){
    const { auth } = useContext(AuthContext);
    const { userInfo } = useContext(UserContext);
    const navigate = useNavigate();

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

    if(!auth?.user){
        return null;
    }

    return(
        <Box class='flex-column' id='comment-input-container'>
            <Typography id='comment-username-text'>
                Comment as <span id='comment-username' onClick={handleVisitProfile}>{auth?.user?.userName}</span>
            </Typography>
            <Textarea
                id='comment-input'
                color='white'
                minRow={1}
                maxRows={2}
                variant="soft"
                placeholder='Enter your comments here...'
                sx={{ width: '100%', '& input': { padding: '0' } }}
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
    )
}