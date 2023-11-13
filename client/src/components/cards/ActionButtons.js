import { Box, CardActions, Typography } from "@mui/material";

import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

function ActionButtons({type, comments, clickHandler, deletePostHandler}){
    return(
        <CardActions className="cardActions">
            <Box className='flex-row' id='action-button-container'>
                <ChatBubbleOutlineIcon id={`${type}-action-icon`}/>
                <Typography id={`${type}-action-button-text`}>
                    {comments.length} comments
                </Typography>
            </Box>
            <Box className='flex-row' id='action-button-container'>
                <ShareIcon id={`${type}-action-icon`}/>
                <Typography id={`${type}-action-button-text`}>
                    share {type}
                </Typography>
            </Box>
            <MoreHorizIcon id={`${type}-action-icon`} onClick = {deletePostHandler}/>
        </CardActions>
    );
}

export default ActionButtons;