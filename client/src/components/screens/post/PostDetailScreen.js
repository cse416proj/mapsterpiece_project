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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { PostComment, Tag } from "../../index";
import { PostComment } from "../../index";

export default function PostDetailScreen() {
  const navigate = useNavigate();
  const { postId } = useParams();

  const { postInfo } = useContext(PostContext);
  const { store } = useContext(GlobalStoreContext);
  const { auth } = useContext(AuthContext);

  const [addActive, setAddActive] = useState(false);
  const [commentInput, setInput] = useState("");
  const [tags, setTags] = useState([]);

  useEffect(() => {
    postInfo.getPostById(postId);
  }, []);

  useEffect(() => {
    if(postInfo.currentPost){
      postInfo.getCommentsByCommentIds(postInfo.currentPost?.comments);
      setTags(postInfo.currentPost.tags);
    }
  }, [postInfo.currentPost]);

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

  function handleOnSubmit(event){
    event.stopPropagation();
    event.preventDefault();
    handleSubmitComment();
  }

  function handleEditPost(event){
    event.stopPropagation();
    event.preventDefault();
    postInfo.setCurrentPost(postInfo.currentPost);
    navigate(`/post-edit/${postInfo.currentPost._id}`);
  }

  const fabStyle = {
    sx: {
      bgcolor: 'var(--icon-hover)',
      color: 'white',
      '&:hover': {
        bgcolor: 'var(--icon)',
        color: 'white',
      }
    }
  };

  if (!postInfo || !postInfo.currentPost) {
    return null;
  }

  return (
    <Box>
      <Box className='flex-row' id='post-detail-bar'>
        <Typography id='redirect-all-posts'onClick={handleAllPosts}>{"<< All Posts"}</Typography>
        <Box id="post-btn-container">
          <Button variant="outlined" id="post-outline-btn" onClick={handleEditPost}>
            <EditIcon className="post-icon"/>
            Edit Post
          </Button>
          <Button variant="contained" id="post-filled-btn">
            <DeleteIcon className="post-icon"/>
            Delete Post
          </Button>
        </Box>
      </Box>
      <Box className="postScreenContent">
        <Box className='flex-column' id='post-header-container'>
          <Box className='flex-row' id="post-header">
            <Typography id='post-title'>{postInfo.currentPost.title}</Typography>
            <Box className='flex-row' id='tags-container'>
              <Typography id='post-tags-text'>Tags:</Typography>
              {
                (tags.length === 0) ?
                  null :
                  tags.map((tag, index) => {
                    return <Tag key={index} index={index} tag={tag} removeTag={null}/>;
                  })
              }
            </Box>
          </Box>
          <Box id='post-content'>
            <Typography style={{ textAlign: `start`, padding: `10px` }}>
              {postInfo.currentPost.content}
            </Typography>
          </Box>
        </Box>
        <Box id="post-comments">
          {
            postInfo.allCommentsForPost?.map((pair, index) => (
              <PostComment key={`comment-${index}`} payload={pair} index={index} />
            ))}
            {addActive ? (
              <Accordion id='post-accordion'>
                <Paper
                  component="form"
                  id='post-form'
                  onSubmit={handleOnSubmit}
                >
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Enter your comments here..."
                    onChange={handleInputChange}
                  />
                  <Button variant="contained" id="comment-submit-btn" onClick={handleSubmitComment}>
                    Submit
                  </Button>
                </Paper>
              </Accordion>
            ) : null
          }
        </Box>
        {
          auth.loggedIn ? (
            <SpeedDial
              ariaLabel="SpeedDial basic example"
              sx={{ position: "absolute", bottom: 16, right: 16 }}
              icon={<SpeedDialIcon />}
              onClick={handleSpeeddialClick}
              FabProps={fabStyle}
            />
          ) : null
        }
      </Box>
    </Box>
  );
}
