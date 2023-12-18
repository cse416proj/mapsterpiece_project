import React, { useContext, useState, useEffect, useRef } from "react";

import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

import { GlobalStoreContext } from "../../../../contexts/store";
import { PostContext } from "../../../../contexts/post";
import AuthContext from "../../../../contexts/auth";

import PostSubComment from './PostSubComment';
import { Modals, CommentInput } from "../../../index";

export default function PostComment({payload, index}) {
  const { postInfo } = useContext(PostContext);
  const { auth } = useContext(AuthContext);
  const { store } = useContext(GlobalStoreContext);

  const [expandSubcomments, setExpandSubcomments] = useState(false);
  const [addActive, setAddActive] = useState(false);
  const inputRef = useRef(null);
  const [subCommentInput, setSubCommentInput] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if(expandSubcomments){
      console.log(`Card ${payload._id} is now expanded`);
      postInfo.setCurrentComment(payload);
    }
    else{
      console.log(`Card ${payload._id} is now closed`);
      postInfo.clearCurrentComment();
    }
  }, [expandSubcomments]);

  function handlePlusIconClick(event) {
    event.stopPropagation();
    postInfo.setCurrentComment(payload);
    setAddActive(true);
    setExpandSubcomments(!expandSubcomments);
  }

  function handleSubcommentInputChange(event) {
    setSubCommentInput(event.target.value);
  }

  function handleAddSubcomments(event) {
    event.preventDefault();
    event.stopPropagation();

    const postId = payload._id;

    if(postId && auth?.user?.userName) {
      const trimmedComment = subCommentInput.replace(/(\s|\r\n|\n|\r)/gm, '');
      if(trimmedComment.length > 0){
        setError('');
        setAddActive(false);
        setExpandSubcomments(expandSubcomments);
        postInfo.createSubcomment(payload._id, auth.user.userName, subCommentInput);
      }
      else{
        console.log('Cannot submit blank text!');
        setError('Cannot submit blank text!');
      }
      
      // Reset the input value using the ref
      setSubCommentInput('');
      if(inputRef.current){
        inputRef.current.value = '';
      }
    }
  }

  function deleteHandler(event){
    event.stopPropagation();
    event.preventDefault();
    console.log("on click trash can icon", payload);
    postInfo.setCurrentComment(payload);
    store.markCommentForDeletion(payload);
  }

  function handleExpand(event){
    event.preventDefault();
    setError('');
    setAddActive(false);
    setExpandSubcomments(!expandSubcomments);
  }

  function renderAccordionDetails(){
    if(payload?.subComments?.length > 0){
      return payload?.subComments?.map((subcomment, index) => (
        <PostSubComment key={`subcomment-${index}`} parentComment={payload} subcomment={subcomment} />
      ));
    }
    return <Typography style={{ marginBottom:'1vh' }}>No comment has added yet.</Typography>;
  }

  function renderCommentInput(){
    if(addActive){
      return(
        <CommentInput
          type='subcomment'
          commentInput={subCommentInput}
          inputRef={inputRef}
          error={error}
          handleInputChange={handleSubcommentInputChange}
          handleSubmitComment={handleAddSubcomments}
        />
      )
    }
    return null;
  }

  if(!payload){
    return null;
  }

  return (
    <div>
      <Accordion expanded={expandSubcomments} sx={{ bgcolor: "#ddebe4", width: "80vw", marginBottom: "2vh", marginTop: "2vh" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon onClick={handleExpand}/>}>
          <Box className="accordionSummary">
            <Box>
              <Box className="commentUserInfo">
                <AccountCircleIcon />
                <Typography style={{ textAlign: `start`, padding: `10px`, fontWeight: `bold` }}>
                  {payload.commenterUserName}
                </Typography>
                <DeleteForeverOutlinedIcon onClick={deleteHandler}/>
              </Box>
              <Typography style={{ textAlign: `start`, padding: `10px` }}>
                {payload.content}
              </Typography>
            </Box>
            {(auth.loggedIn) ? <AddIcon onClick={handlePlusIconClick} /> : null}
          </Box>
        </AccordionSummary>
        <AccordionDetails sx={{ bgcolor: "#b1d7c4" }}>
          {renderAccordionDetails()}
          {renderCommentInput()}
        </AccordionDetails>
        <Modals/>
      </Accordion>
    </div>
  );
}