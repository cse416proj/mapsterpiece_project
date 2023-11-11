import { useState, useContext } from 'react';
import { Box, TextField, Typography, Button } from '@mui/material';
import Textarea from '@mui/joy/Textarea';

// import PostContext from './PostContext';

function CreatePost(){
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }

    const handleContentChange = (event) => {
        setContent(event.target.value);
    }

    const handleClear = () => {
        setTitle('');
        setContent('');
    };

    return (
        <Box className='flex-column' id='create-container'>
            <Box className='flex-column' id='create-post-container'>
                <TextField
                    id='title-input'
                    label='Post Title'
                    variant='outlined'
                    placeholder="Post Title"
                    value={title}
                    style={{ marginBottom: '1.5%' }}
                    onChange={handleTitleChange}
                />
                <Textarea
                    required
                    minRows={8}
                    color="neutral"
                    variant="plain"
                    placeholder="Type post content here..."
                    endDecorator={
                        <Typography level="body-xs" sx={{ ml: 'auto' }}>
                            {content.length} character(s)
                        </Typography>
                    }
                    value={content}
                    sx={{ width: '100%' }}
                    onChange={handleContentChange}
                />
            </Box>
            <Box className='flex-row' id='button-container'>
                <Button
                    variant='outlined'
                    id='clear-button'
                    style={{ borderRadius: 50 }}
                    onClick={handleClear}
                >
                    Clear
                </Button>
                <Button
                    variant='contained'
                    id='upload-button'
                    style={{ borderRadius: 50 }}
                    // onClick={handleUpload}
                >
                    Upload
                </Button>
            </Box>
        </Box>
    )
}

export default CreatePost;