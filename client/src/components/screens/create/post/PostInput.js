import { useRef, useEffect } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { Textarea } from '@mui/joy';

function PostInput({ title, updateTitle, missingTitle, content, updateContent, missingContent}){
    const textareaRef = useRef(null);

    useEffect(() => {
        if(missingContent){
            console.log('should focus')
            textareaRef.current?.focus();
        }
    }, [missingContent]);
    
    return(
        <Box className='flex-column' id='create-post-container'>
            <TextField
                id='title-input'
                label='Post Title'
                variant='outlined'
                placeholder='Post Title'
                value={title}
                error={missingTitle}
                helperText={missingTitle && 'Required to enter post title'}
                onChange={updateTitle}
                style={{ marginBottom: '1.5%' }}
            />
            <Textarea
                minRows={8}
                variant='plain'
                placeholder='Type post content here...'
                value={content}
                color={(missingContent) ? 'danger' : 'neutral'}
                slotProps={{ textarea: { ref: textareaRef } }}
                onChange={updateContent}
                sx={{ width: '100%' }}
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