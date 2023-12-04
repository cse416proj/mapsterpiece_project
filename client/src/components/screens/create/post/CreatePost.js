import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

import { Tags, PostInput, ButtonSet } from '../../commonProps';
import { Modals, SuccessAlert } from "../../../index";
import { PostContext } from '../../../../contexts/post';
import GlobalStoreContext from '../../../../contexts/store';

function CreatePost(){
    const { postInfo } = useContext(PostContext);
    const { store } = useContext(GlobalStoreContext);

    // set up navigation to visit other link
    const navigate = useNavigate();

    // set up input variables
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState([]);
    const [isEditingTag, setIsEditingTag] = useState(false);

    // set up error flags for these input
    const [missingTitle, setMissingTitle] = useState(false);
    const [missingContent, setMissingContent] = useState(false);

    // success alert
    const [createSuccess, setCreateSuccess] = useState(false);

    // reset post create success status
    useEffect(() => {
        setCreateSuccess(false);
    }, [])

    // update post create success status
    useEffect(() => {
        if((store?.createSuccess === true)){
            setCreateSuccess(true);
        }
        else{
            setCreateSuccess(false);
        }
    }, [store?.createSuccess]);

    // update & redirect if post got successfully created
    useEffect(() => {
        console.log(`createSuccess: ${createSuccess}`);
        if(createSuccess === true && postInfo.currentPost){
            setTimeout(() => {
                navigate(`/post-detail/${postInfo.currentPost._id}`);
                store.clearCreateSuccess();
            }, 2250);
        }
    }, [createSuccess, postInfo.currentPost]);

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
        const trimmedTitle = title.replace(/(\s|\r\n|\n|\r)/gm, '');
        const trimmedContent = content.replace(/(\s|\r\n|\n|\r)/gm, '');

        setMissingTitle(trimmedTitle.length === 0);
        setMissingContent(trimmedContent.length === 0);
        postInfo.createPost(title, tags, content);
    }

    return (
        <Box className='flex-column' id='create-container'>
            { createSuccess && <SuccessAlert type='post-create'/> }
            <Modals/>

            <PostInput
                title={title}
                updateTitle={handleTitleChange}
                missingTitle={missingTitle}
                content={content}
                updateContent={handleContentChange}
                missingContent={missingContent}
            />

            <Tags tags={tags} setTags={setTags} isEditingTag={isEditingTag} setIsEditingTag={setIsEditingTag}/>
            
            <ButtonSet prompt='post' handleClear={handleClear} handleUpload={handlePost}/>
        </Box>
    )
}

export default CreatePost;