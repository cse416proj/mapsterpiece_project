import { useRef, useEffect } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { Textarea } from '@mui/joy';

function PostInput({ title, updateTitle, missingTitle, content, updateContent, missingContent}){
    const textareaRef = useRef(null);

    useEffect(() => {
        if(!content && missingContent){
            console.log('should focus')
            textareaRef.current?.focus();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [missingContent]);
    
    return(
        <Box className='flex-column' id='create-post-container'>
            <TextField
                id='title-input'
                label='Post Title'
                variant='outlined'
                placeholder='Post Title'
                value={title}
                error={!title && missingTitle}
                helperText={!title && missingTitle && 'Required to enter post title'}
                onChange={updateTitle}
                style={{ marginBottom: '1.5%' }}
            />
            <Textarea
                minRows={7}
                variant='plain'
                placeholder='Type post content here...'
                value={content}
                sx={{ width: '100%' }}
                onChange={updateContent}
                slotProps={{ textarea: { ref: textareaRef } }}
                color={(!content && missingContent) ? 'danger' : 'neutral'}
                endDecorator={
                    <Typography level='body-xs' sx={{ ml: 'auto' }}>
                        {content.length} character(s)
                    </Typography>
                }
            />
        </Box>
    )
}

export default PostInput;