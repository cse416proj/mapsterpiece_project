import { Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function Tag({index, tag, removeTag}){
    // handle tag when x button is clicked
    const handleRemoveTag = () => {
        removeTag(index);
    }

    return (
        <Box className='flex-row' id='tag-display' variant='outlined'>
            {tag}
            <CloseIcon id='remove-tag' size='small' onClick={handleRemoveTag}/>
        </Box>
    )
}

export default Tag;