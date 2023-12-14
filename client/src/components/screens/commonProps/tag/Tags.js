import { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import Tag from './Tag';

function Tags({tags, setTags, isEditingTag, setIsEditingTag}){
    const [tag, setTag] = useState('');
    const [tagError, setTagError] = useState('');

    // handle adding tag
    const handleAddTag = () => {
        setIsEditingTag(true);
    };

    const handleEditTag = (event) => {
        setTag(event.target.value);
    };

    const handleEnterTag = (event) => {
        if(event.key === 'Enter'){
            handleSaveTag();
        }
    };

    const handleSaveTag = () => {
        const trimmedTag = tag.replace(/(\s|\r\n|\n|\r)/gm, '');

        if(trimmedTag.length > 0){
            if(!tags.includes(tag)){
                setIsEditingTag(false);
                setTags([...tags, tag]);
                setTag('');
                setTagError('');
            }
            else{
                setTagError('Cannot enter tag with same name!');
            }
        }
        else{
            setTagError('Cannot submit blank text for a tag!');
        }
    }

    const handleRemoveTag = (index) => {
        const tagToRemove = tags[index];
        const newtags = tags.filter((tag) => (tag !== tagToRemove));
        setTags(newtags);
    }

    let addTag = (
        (isEditingTag) ?
        <TextField
            id='tag-input' margin='none' size='small' placeholder='Enter tag here'
            error={tagError !== ''}
            helperText={(tagError !== '') ? tagError : ''}
            onChange={handleEditTag}
            onKeyDown={handleEnterTag}
            onBlur={handleSaveTag}
        /> :
        <Button
            id='add-tag-button' variant='filledTonal'
            style={{ borderRadius: 50 }}
            onClick={handleAddTag}>
            + tag
        </Button>
    );

    return(
        <Box className='flex-row' id='tags'>
            {
                (tags?.length > 0) ? 
                    tags.map((tag, index) => {
                        return <Tag key={index} index={index} tag={tag} removeTag={handleRemoveTag}/>;
                    }) : 
                    null
            }
            {addTag}
        </Box>
    )
}

export default Tags;