import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, FormControl, Typography, Alert } from '@mui/material';

import { Tags, PostInput, ButtonSet } from '../../commonProps';
import PostContext from '../../../../contexts/post';

export default function PostEditScreen() {
    const { postInfo } = useContext(PostContext);

    // set up navigation to visit other link
    const navigate = useNavigate();

    // set up input variables
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState([]);

    // set up error flags for these input
    const [missingTitle, setMissingTitle] = useState(false);
    const [missingContent, setMissingContent] = useState(false);

    // success alert
    const [openSuccess, setOpenSuccess] = useState(false);

    useEffect(() => {
        if(postInfo){
            setTitle(postInfo.currentPost.title);
            setContent(postInfo.currentPost.content);
            setTags(postInfo.currentPost.tags);
        }
    }, [])

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

    const handleEdit = () => {
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
            postInfo.updatePostById(postInfo.currentPost._id, title, tags, content);

            if (postInfo.errorMessage === null) {
                setOpenSuccess(true);
            }

            setTimeout(() => {
                setOpenSuccess(false);
                navigate(`/post-detail/${postInfo.currentPost._id}`);
            }, 1000);
        }
    }

    if(!postInfo || !postInfo.currentPost){
        return <Typography>Post does not exist</Typography>;
    }

    return (
        <Box className='flex-column' id='content'>
            <FormControl className='flex-column' id='upload-form'>
                <Box className='flex-row' id='edit-header-section'>
                    <Typography variant='h5'>Edit Post</Typography>
                </Box>
                <Box className='flex-column' id='create-container'>
                    {openSuccess && <Alert severity="success">Post updated! Redirecting...</Alert>}
                    <PostInput
                        title={title}
                        updateTitle={handleTitleChange}
                        missingTitle={missingTitle}
                        content={content}
                        updateContent={handleContentChange}
                        missingContent={missingContent}
                    />

                    <Tags tags={tags} setTags={setTags}/>

                    <ButtonSet prompt='Save Edit' handleClear={handleClear} handleUpload={handleEdit}/>
                </Box>
            </FormControl>
        </Box>
    )
}