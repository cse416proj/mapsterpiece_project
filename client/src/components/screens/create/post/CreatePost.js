import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

import Tags from '../tag/Tags';
import PostInput from './PostInput';
import ButtonSet from '../ButtonSet';
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
        setMissingTitle(false);
        setMissingContent(false);
    };

    // handler to upload the post
    const handlePost = () => {
        if(title.length === 0 || content.length === 0){
            if(title.length === 0){
                setMissingTitle(true);
            }
            if(content.length === 0){
                setMissingContent(true);
            }
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
            
            <ButtonSet prompt='post' handleClear={handleClear} handleUpload={handlePost}/>
        </Box>
    )
}

export default CreatePost;