import React, { useContext } from "react";
import { PostContext } from "../../contexts/post";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Typography,
  Chip,
  Stack,
} from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useNavigate } from "react-router-dom";

export default function DynamicCard(payload) {
  const navigate = useNavigate();
  const { postInfo } = useContext(PostContext);

  function handlePostCardClick() {
    postInfo.setCurrentPost(payload.postData);
    navigate("/post-detail");
  }
  let cardElement = "";

  if (payload.userData) {
    cardElement = (
      <Card className="individualDynamicCard">
        <CardContent>
          <Typography
            sx={{ fontSize: 14, width: `15%` }}
            color="black"
            gutterBottom
          >
            {payload.userData.userName}
          </Typography>
        </CardContent>
      </Card>
    );
  } else if (payload.mapData) {
    cardElement = (
      <Card className="individualDynamicCard">
        <CardContent
          style={{ height: `100%`, background: `#86C9B5` }}
          className="cardContent"
        >
          <Box className="flex-row">
            <Typography
              sx={{ fontSize: 16, fontWeight: `bold` }}
              color="black"
              gutterBottom
            >
              {payload.mapData.title}
            </Typography>
            <Typography
              sx={{ fontSize: 12, marginLeft: 3 }}
              color="white"
              gutterBottom
            >
              Published by @{payload.mapData.ownerUserName}
            </Typography>
          </Box>
          <Stack direction="row" spacing={1}>
            {payload.mapData.tags.map((tag) => (
              <Chip label={tag} size="small" style={{ color: 'white' }}/>
            ))}
          </Stack>
          <CardActions className="cardActions">
            <ChatBubbleOutlineIcon style={{ color: `white` }} />
            <Typography sx={{ fontSize: 12 }} color="white" gutterBottom>
              {payload.mapData.comments.length} comments
            </Typography>
            <ShareIcon style={{ color: `white`, marginLeft: `2%` }} />
            <Typography sx={{ fontSize: 12 }} color="white" gutterBottom>
              share map
            </Typography>
            <MoreHorizIcon style={{ color: `white`, marginLeft: `2%` }} />
          </CardActions>
        </CardContent>
      </Card>
    );
  } else if (payload.postData) {
    cardElement = (
      <Card className="individualDynamicCard">
        <CardContent
          style={{ height: `100%` }}
          className="cardContent"
          onClick={handlePostCardClick}
        >
          <Box className="flex-row">
            <Typography
              sx={{ fontSize: 16, fontWeight: `bold` }}
              color="black"
              gutterBottom
            >
              {payload.postData.title}
            </Typography>
            <Typography
              sx={{ fontSize: 12, marginLeft: 3 }}
              color="grey"
              gutterBottom
            >
              Posted by @{payload.postData.ownerUserName}
            </Typography>
          </Box>
          <Typography
            sx={{ fontSize: 12, marginLeft: 3, textAlign: `start` }}
            color="grey"
          >
            {payload.postData.postBody.length>200 
            ? `${payload.postData.postBody.substring(0,200)}...`
            : payload.postData.postBody
            }
          </Typography>
          <CardActions className="cardActions">
            <ChatBubbleOutlineIcon style={{ color: `#393c40` }} />
            <Typography sx={{ fontSize: 12 }} color="#86cab5" gutterBottom>
              {payload.postData.comments.length} comments
            </Typography>
            <ShareIcon style={{ color: `#393c40`, marginLeft: `2%` }} />
            <Typography sx={{ fontSize: 12 }} color="#86cab5" gutterBottom>
              share map
            </Typography>
            <MoreHorizIcon style={{ color: `#393c40`, marginLeft: `2%` }} />
          </CardActions>
        </CardContent>
      </Card>
    );
  }

  return <Box>{cardElement}</Box>;
}
