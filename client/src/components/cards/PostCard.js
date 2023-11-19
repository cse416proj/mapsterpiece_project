import { Box, Card, CardContent, Typography } from "@mui/material";

import ActionButtons from "./ActionButtons";

function PostCard({postData, clickHandler, deleteHandler}){

    return(
        <Card className="individualDynamicCard" id='PostDynamicCard'>
            <CardContent style={{ height: `100%` }} className="cardContent">
                <Box 
                    className="flex-row" 
                    onClick={clickHandler}>
                    <Typography
                        sx={{ fontSize: 16, fontWeight: `bold` }}
                        color="black"
                        gutterBottom
                    >
                        {postData.title}
                    </Typography>
                    <Typography
                        sx={{ fontSize: 12, marginLeft: 3 }}
                        color="grey"
                        gutterBottom
                    >
                        Posted by @{postData.ownerUserName}
                    </Typography>
                </Box>
                <Typography
                    sx={{ fontSize: 12, marginLeft: 3, textAlign: `start` }}
                    color="grey"
                    onClick={clickHandler}
                >
                    {
                        (postData.content.length > 200) ? 
                            `${postData.content.substring(0,200)}...`
                            : postData.content
                    }
                </Typography>

                <ActionButtons
                    type='post'
                    comments={postData.comments}
                    clickHandler={clickHandler}
                    deleteHandler = {deleteHandler}
                    currentUserName={postData.ownerUserName}
                />
            </CardContent>
        </Card>
    )
}

export default PostCard;