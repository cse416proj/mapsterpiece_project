import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';

import Tags from '../tag/Tags';
import PostInput from './PostInput';
// import PostContext from './PostContext';

function CreatePost(){
    // set up navigation to visit other link
    const navigate = useNavigate();

    // set up input variables
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState([]);

    // set up error flags for these input
    const [missingTitle, setMissingTitle] = useState(false);
    const [missingContent, setMissingContent] = useState(false);

    // handler when title/content changes
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }

    const handleContentChange = (event) => {
        setContent(event.target.value);
    }

    // handler to clear all input
    const handleClear = () => {
        setTitle('');
        setContent('');
        setTags([]);
    };

    // handler to upload the post
    const handlePost = () => {
        if(title.length === 0){
            setMissingTitle(true);
        }
        else if(content.length === 0){
            setMissingContent(true);
        }
        else{
            setMissingTitle(false);
            setMissingContent(false);
            navigate('/');
        }
    }

    return (
        <Box className='flex-column' id='create-container'>
            <PostInput
                title={title}
                updateTitle={handleTitleChange}
                missingTitle={missingTitle}
                content={content}
                updateContent={handleContentChange}
                missingContent={missingContent}
            />

            <Tags tags={tags} setTags={setTags}/>
            
            <Box className='flex-row' id='button-container'>
                <Button
                    id='clear-button'
                    variant='outlined'
                    style={{ borderRadius: 50 }}
                    onClick={handleClear}
                >
                    Clear
                </Button>
                <Button
                    id='upload-button'
                    variant='contained'
                    style={{ borderRadius: 50 }}
                    onClick={handlePost}
                >
                    Post
                </Button>
            </Box>
        </Box>
    )
}

export default CreatePost;