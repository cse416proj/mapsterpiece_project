import React, { useContext, useState } from "react";
import { PostContext } from "../../../contexts/post";
import { GlobalStoreContext } from "../../../contexts/store";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  SpeedDial,
  SpeedDialIcon,
  Paper,
  InputBase,
  Accordion,
} from "@mui/material";
import { Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import {PostComment} from "../../index"

export default function PostDetailScreen() {
  const navigate = useNavigate();
  const { postInfo } = useContext(PostContext);
  const { store } = useContext(GlobalStoreContext);
  const [addActive, setAddActive] = useState(false);
  const [commentInput, setInput] = useState("");

  function handleAllMaps() {
    store.setCurrentView("ALL_POSTS");
    navigate("/community");
  }

  function handleSpeeddialClick() {
    setAddActive(true);
  }

  function handleInputChange(event) {
    setInput(event.target.value);
  }

  function handleSubmitComment() {
    postInfo.addCommentToCurrentPost(commentInput);
    setAddActive(false);
  }

  if(!postInfo || !postInfo.currentPost){
    return null;
  }

  return (
    <div>
      <Typography
        style={{ textAlign: `start`, padding: `10px`, marginLeft: 0 }}
        onClick={handleAllMaps}
      >
        {"<< All Posts"}
      </Typography>
      <div className="postScreenContent">
        <Box
          sx={{
            bgcolor: "#ddebe4",
            height: "10vh",
            width: "80vw",
            marginTop: "5vh",
          }}
        >
          <Typography
            style={{
              textAlign: `start`,
              padding: `10px`,
              fontWeight: `bold`,
              fontSize: `30px`,
            }}
          >
            {postInfo.currentPost.title}
          </Typography>
        </Box>
        <Box
          sx={{
            bgcolor: "#ddebe4",
            height: "20vh",
            width: "80vw",
            marginTop: "5vh",
          }}
        >
          <Typography style={{ textAlign: `start`, padding: `10px` }}>
            {postInfo.currentPost.postBody}
          </Typography>
        </Box>
        {postInfo.currentPost.comments.map((pair, index) => (
            <PostComment payload={pair} index={index} />
        ))}
        {addActive ? (
          <Accordion
            sx={{
              bgcolor: "#ddebe4",
              width: "80vw",
              marginTop: "2vh",
            }}
          >
            <Paper
              component="form"
              sx={{
                display: "flex",
                alignItems: "center",
                width: 400,
                marginLeft: "10px",
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Enter your comments here..."
                onChange={handleInputChange}
              />
              <Button variant="contained" onClick={handleSubmitComment}>
                Submit
              </Button>
            </Paper>
          </Accordion>
        ) : null}
      </div>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClick={handleSpeeddialClick}
      ></SpeedDial>
    </div>
  );
}
