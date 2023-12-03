import { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import Tag from './Tag';

function Tags({tags, setTags}){
    const [tag, setTag] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [tagError, setTagError] = useState(false);

    const handleAddTag = () => {
        setIsEditing(true);
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
        if(tag.length > 0){
            if(!tags.includes(tag)){
                setIsEditing(false);
                setTagError(false);
                setTags([...tags, tag]);
                setTag('');
            }
            else{
                setTagError(true);
            }
        }
    }

    const handleRemoveTag = (index) => {
        const tagToRemove = tags[index];
        const newtags = tags.filter((tag) => (tag !== tagToRemove));
        setTags(newtags);
    }

    let addTag = (
        (isEditing) ?
        <TextField
            id='tag-input' margin='none' size='small' placeholder='Enter tag here'
            error={tagError}
            helperText={tagError && 'Cannot enter tag with same name'}
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