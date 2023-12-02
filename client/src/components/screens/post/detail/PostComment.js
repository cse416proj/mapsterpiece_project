import React, { useContext, useState, useEffect } from "react";

import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

import { GlobalStoreContext } from "../../../../contexts/store";
import { PostContext } from "../../../../contexts/post";
import AuthContext from "../../../../contexts/auth";

import PostSubComment from './PostSubComment';
import PostCommentInput from "./PostCommentInput";

import { Modals } from "../../../index";

export default function PostComment({payload, index}) {
  const { postInfo } = useContext(PostContext);
  const { auth } = useContext(AuthContext);
  const [addActive, setAddActive] = useState(false);
  const [commentInput, setInput] = useState("");
  const { store } = useContext(GlobalStoreContext);

  const [expandSubcomments, setExpandSubcomments] = useState(false);

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

  function handleInputChange(event) {
    setInput(event.target.value);
  }

  function handleSubmitComment() {
    postInfo.createSubcomment(payload._id, auth.user.userName, commentInput);
    setAddActive(false);
    setExpandSubcomments(expandSubcomments);
  }

  function handleSetEditFalse() {
    setAddActive(false);
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
    setExpandSubcomments(!expandSubcomments);
  }

  function renderAccordionDetails(){
    if(payload?.subComments?.length > 0){
      return payload?.subComments?.map((subcomment, index) => (
        <PostSubComment key={`subcomment-${index}`} parentComment={payload} subcomment={subcomment} />
      ));
    }
    return <Typography>No comment has added yet.</Typography>;
  }

  function renderCommentInput(){
    if(addActive){
      return <PostCommentInput handleInputChange={handleInputChange} handleSetEditFalse={handleSetEditFalse} handleSubmitComment={handleSubmitComment}/>;
    }
    return null;
  }

  if(!payload){
    return null;
  }

  return (
    <div>
      <Accordion expanded={expandSubcomments} sx={{ bgcolor: "#ddebe4", width: "80vw", marginBottom: "2vh", marginTop: "2vh" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon onClick={handleExpand} />}>
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