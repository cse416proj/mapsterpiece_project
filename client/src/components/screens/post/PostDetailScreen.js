import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../../contexts/auth";
import { PostContext } from "../../../contexts/post";
import { GlobalStoreContext } from "../../../contexts/store";
import { useNavigate, useParams } from "react-router-dom";
import {
  Typography,
  Box,
  Button,
  SpeedDial,
  SpeedDialIcon,
  Paper,
  InputBase,
  Accordion,
} from "@mui/material";
import { PostComment } from "../../index";

export default function PostDetailScreen() {
  const navigate = useNavigate();
  const { postId } = useParams();

  const { postInfo } = useContext(PostContext);
  const { store } = useContext(GlobalStoreContext);
  const { auth } = useContext(AuthContext);
  const [addActive, setAddActive] = useState(false);
  const [commentInput, setInput] = useState("");

  useEffect(() => {
    postInfo.getPostById(postId);
  }, []);

  useEffect(() => {
    postInfo.getCommentsByCommentIds(postInfo.currentPost?.comments);
  }, [postInfo.currentPost]);

  function handleAllPosts() {
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
    postInfo.createComment(
      postInfo.currentPost._id,
      auth?.user?.userName,
      commentInput
    );
    setAddActive(false);
  }

  if (!postInfo || !postInfo.currentPost) {
    return null;
  }

  return (
    <Box>
      <Typography
        style={{ textAlign: `start`, padding: `10px`, marginLeft: 0 }}
        onClick={handleAllPosts}
      >
        {"<< All Posts"}
      </Typography>
      <Box className="postScreenContent">
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
            {postInfo.currentPost.content}
          </Typography>
        </Box>
        {postInfo.allCommentsForPost?.map((pair, index) => (
          <PostComment key={`comment-${index}`} payload={pair} index={index} />
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
      </Box>
      {auth.loggedIn ? (
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: "absolute", bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
          onClick={handleSpeeddialClick}
        ></SpeedDial>
      ) : null}
    </Box>
  );
}
