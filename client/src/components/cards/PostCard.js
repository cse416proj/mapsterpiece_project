import { Box, Card, CardContent, Typography } from "@mui/material";

import ActionButtons from "./ActionButtons";

function PostCard({postData, clickHandler}){
    return(
        <Card className="individualDynamicCard">
            <CardContent
                style={{ height: `100%` }}
                className="cardContent"
                onClick={clickHandler}
            >
                <Box className="flex-row">
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
                >
                    {
                        (postData.postBody.length > 200) ? 
                            `${postData.postBody.substring(0,200)}...`
                            : postData.postBody
                    }
                </Typography>
                <ActionButtons
                    type='post'
                    comments={postData.comments}
                    clickHandler={clickHandler}
                />
            </CardContent>
        </Card>
    )
}

export default PostCard;