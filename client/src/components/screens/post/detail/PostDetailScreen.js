import { useContext, useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  Typography,
  Box,
  Button,
  Alert,
  Menu,
  MenuItem,
  Divider
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from "@mui/icons-material/Share";
import SmsRoundedIcon from '@mui/icons-material/SmsRounded';

import { PostComment, Tag, Modals, Warning, CommentInput } from "../../../index";

import AuthContext from "../../../../contexts/auth";
import { PostContext } from "../../../../contexts/post";
import { GlobalStoreContext } from "../../../../contexts/store";

import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  RedditIcon,
  RedditShareButton, TwitterIcon, TwitterShareButton
} from "react-share";

export default function PostDetailScreen() {
  const navigate = useNavigate();
  const { postId } = useParams();

  const { postInfo } = useContext(PostContext);
  const { store } = useContext(GlobalStoreContext);
  const { auth } = useContext(AuthContext);

  // const [addActive, setAddActive] = useState(false);
  const inputRef = useRef(null);
  const [commentInput, setCommentInput] = useState("");
  const [error, setError] = useState('');
  const [tags, setTags] = useState([]);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // success alert
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  useEffect(() => {
    postInfo.getPostById(postId);
  }, []);

  useEffect(() => {
    if(postInfo.currentPost){
      postInfo.getCommentsByCommentIds(postInfo.currentPost?.comments);
      setTags(postInfo.currentPost.tags);
    }
  }, [postInfo.currentPost]);

  function handleAllPosts() {
    store.setCurrentView("ALL_POSTS");
    navigate("/community");
  }

  function handleInputChange(event) {
    setCommentInput(event.target.value);
  }

  function handleSubmitComment() {
    const postId = postInfo.currentPost._id;

    if (postId && auth?.user?.userName) {
        const trimmedComment = commentInput.replace(/(\s|\r\n|\n|\r)/gm, '');

        if(trimmedComment.length > 0){
          setError('');
          postInfo.createComment(postId, auth?.user?.userName, commentInput);
        }
        else{
          setError('Cannot submit blank text!');
        }
        
        // Reset the input value using the ref
        setCommentInput('');
        if(inputRef.current){
          inputRef.current.value = '';
        }
    }
  }

  function handleEditPost(event){
    event.stopPropagation();
    event.preventDefault();
    postInfo.setCurrentPost(postInfo.currentPost);
    navigate(`/post-edit/${postInfo.currentPost._id}`);
  }

  function handleDeletePost(event){
    event.stopPropagation();
    event.preventDefault();
    store.markPostForDeletion(postInfo.currentPost);

    // if(store.currentModal !== "DELETE_POST_MODAL" && postInfo.errorMessage === null) {
    //   setDeleteSuccess(true);
    //   setTimeout(() => {
    //     setDeleteSuccess(false);
    //     navigate('/');
    //   }, 1000);
    // }
  }

  function handleShareMap(event) {
    console.log("share this map");
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  }

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const isLoggedInUser = auth.user && postInfo.currentPost && auth.user.userName === postInfo.currentPost.ownerUserName;

  function renderButton(){
    const menu = (
      <Menu
        id="share-menu"
        style={{ zIndex: '2500' }}
        anchorEl={anchorEl}
        open={open}
        onClose={closeMenu}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onMouseLeave={closeMenu}>
          <EmailShareButton url={window.location.href} onShareWindowClose={closeMenu}><EmailIcon>E-Mail</EmailIcon></EmailShareButton>
          <FacebookShareButton url={window.location.href} hashtag={"#Mapsterpiece"} onShareWindowClose={closeMenu}><FacebookIcon>Facebook</FacebookIcon></FacebookShareButton>
          <RedditShareButton url={window.location.href} onShareWindowClose={closeMenu}><RedditIcon>Reddit</RedditIcon></RedditShareButton>
          <TwitterShareButton url={window.location.href} onShareWindowClose={closeMenu}><TwitterIcon>Twitter</TwitterIcon></TwitterShareButton>
        </MenuItem>
      </Menu>
    )
    if(isLoggedInUser){
      return(
        <Box id="post-btn-container">
          <Button variant="outlined" id="post-outline-btn" onClick={handleShareMap}>
            <ShareIcon className="post-icon"/>
            Share Post
          </Button>
          <Button variant="outlined" id="post-outline-btn" onClick={handleEditPost}>
            <EditIcon className="post-icon"/>
            Edit Post
          </Button>
          <Button variant="contained" id="post-filled-btn" onClick={handleDeletePost}>
            <DeleteIcon className="post-icon"/>
            Delete Post
          </Button>
          {menu}
        </Box>
      )
    }
    else{
      return(
        <Box id="post-btn-container" style={{ width: '15vw' }}>
          <Button variant="outlined" id="post-outline-btn" style={{ width: '100%' }} onClick={handleShareMap}>
            <ShareIcon className="post-icon"/>
            Share Post
          </Button>
          {menu}
        </Box>
      )
    }
  }

  const handleSignUp = () => {
    navigate('/register');
}

  const handleSignIn = () => {
    navigate('/login');
  }

  if (!postInfo) {
    return null;
  }

  if(!postInfo.currentPost){
    return <Warning message='Post not found'/>;
  }

  if(postInfo?.errorMessage){
    return <Warning message={postInfo?.errorMessage}/>;
  }

  return (
    <Box>
      {deleteSuccess && <Alert severity="success">Post has been deleted! Redirecting...</Alert>}

      <Box className='flex-row' id='post-detail-bar'>
      <Typography id='redirect-all-posts'onClick={handleAllPosts}>{"<< All Posts"}</Typography>
        {renderButton()}
      </Box>
      <Box className="postScreenContent">
        <Box className='flex-column' id='post-header-container'>
          <Box className='flex-row' id="post-header">
            <Typography id='post-title'>{postInfo.currentPost.title}</Typography>
            <Typography>By {postInfo.currentPost.ownerUserName}</Typography>
            <Box className='flex-row' id='tags-container'>
              {
                (tags && tags.length === 0) ?
                  null :
                  <>
                    <Typography id='post-tags-text'>Tags:</Typography>
                    {
                      tags.map((tag, index) => {
                        return <Tag key={index} index={index} tag={tag} removeTag={null}/>;
                      })
                    }
                  </>
              }
            </Box>
          </Box>
          <Box id='post-content'>
            <Typography style={{ textAlign: `start`, padding: `10px` }}>
              {postInfo.currentPost.content}
            </Typography>
          </Box>
        </Box>
        <Box id="post-comment-section">
          <Divider id='comment-section-divider' style={{ margin: '2.5vh auto' }}>
            Comment Section
          </Divider>
          {
            (auth.user) ? 
              <Box className='flex-column' style={{ width: '97.5%', margin: 'auto' }}>
                <CommentInput
                  type='comment'
                  commentInput={commentInput} 
                  inputRef={inputRef}
                  error={error}
                  handleInputChange={handleInputChange}
                  handleSubmitComment={handleSubmitComment}
                />
              </Box> :
              <Box className='flex-column' id='account-prompt'>
                <Box className='flex-row' id='account-prompt-description' style={{ width: '25%' }}>
                  <SmsRoundedIcon id='account-prompt-icon'/> 
                  <Typography variant='h6' id='account-prompt-text'>Want to leave a comment?</Typography>
                </Box>
                <Box className='flex-row' id='account-prompt-actions'  style={{ width: '65%' }}>
                  <Button variant='contained' className='account-prompt-btns' id='account-signup' onClick={handleSignUp}>Sign Up</Button>
                  <Button variant='contained' className='account-prompt-btns' id='account-login' onClick={handleSignIn}>Login</Button>
                </Box>
              </Box>
          }
          {
            postInfo.allCommentsForPost?.map((pair, index) => (
              <PostComment key={`comment-${index}`} payload={pair} index={index} />
            ))
          }
        </Box>
      </Box>
      <Modals/>
    </Box>
  );
}
