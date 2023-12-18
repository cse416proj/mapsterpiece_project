import { useContext, useRef, useState } from 'react';
// import { useParams } from 'react-router-dom';
import { Box, Typography, Card, CardContent, CardActions, Collapse, IconButton, Button, Divider } from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';

import MapSubComment from './MapSubComment';
import { CommentInput, CommentCard } from '../../commonProps';

import MapContext from '../../../../contexts/map';
import AuthContext from '../../../../contexts/auth';
import GlobalStoreContext from '../../../../contexts/store';

export default function MapComment({ payload }) {
  const { auth } = useContext(AuthContext);
  const { store } = useContext(GlobalStoreContext);
  const { mapInfo } = useContext(MapContext);
  // const { userInfo } = useContext(UserContext);
  // const navigate = useNavigate();

  // const { mapId } = useParams();

  const [expanded, setExpanded] = useState(false);
  const [addActive, setAddActive] = useState(false);
  const [expandSubcomments, setExpandSubcomments] = useState(false);

  // const [commentInput, setInput] = useState("");
  // const [subcomment, setSubcomment] = useState('');
  const inputRef = useRef(null);
  const [subCommentInput, setSubCommentInput] = useState('');
  const [error, setError] = useState('');

  // function handleVisitProfile(event){
  //   event.stopPropagation();
  //   event.preventDefault();
  //   userInfo.setCurrentUser(auth.user);
  //   navigate(`/profile/${auth.user._id}`);
  // }

  const handleExpandComments = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setAddActive((expanded) ? false : addActive);
    setExpanded(!expanded);
  };

  const handleAddComment = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setExpanded(true);
    setAddActive(true);
    setError('');
  }

  const handleDeleteComment = (event) => {
    event.preventDefault();
    event.stopPropagation();
    console.log('handle delete comment');
    mapInfo.setCurrentComment(payload);
    store.setCurrentView("MAP_VIEW");
    store.markCommentForDeletion(payload);
  };

  const handleSubcommentInputChange = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setSubCommentInput(event.target.value);
  }

  const handleAddSubcomments = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const mapId = payload._id;

    if(mapId && auth?.user?.userName) {
      const trimmedComment = subCommentInput.replace(/(\s|\r\n|\n|\r)/gm, '');
      if(trimmedComment.length > 0){
        setError('');
        mapInfo.createSubcomment(mapId, auth?.user?.userName, subCommentInput);
        setAddActive(false);
        setExpandSubcomments(expandSubcomments);
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

  function renderCardActions(){
    let expandIcon = (expanded) ? <ExpandLessIcon/> : <ExpandMoreIcon/>;

    return(
      <Box className='flex-row' id='card-actions'>
        {
          (auth.loggedIn) ?
            <Button id='reply-button' onClick={handleAddComment}>
              <ChatBubbleOutlineRoundedIcon/>
              <Typography>Reply</Typography>
            </Button> :
            null
        }
        <IconButton onClick={handleExpandComments}>
          { expandIcon }
        </IconButton>
      </Box>
    )
  }

  return (
    <Card
      id='comment-card'
      style={
        (expanded) ?
          (
            (payload?.subComments?.length === 0) ?
              { minHeight: '22.5vh' }
              :
              (payload?.subComments?.length === 1) ?
                { minHeight: '35vh' }
                :
                (payload?.subComments?.length === 2) ?
                  { minHeight: '47.5vh' }
                  :
                  { minHeight: '100%' }
          )
          :
          { minHeight: '20vh' }
      }
    >
      <CommentCard
        type='comment'
        comment={payload}
        deleteHandler={handleDeleteComment}
      />

      <CardActions disableSpacing>
        { renderCardActions() }
      </CardActions>

      <Collapse in={expanded} timeout='auto' unmountOnExit>
        {
          (addActive) ? 
            <CommentInput
              type='subcomment'
              commentInput={subCommentInput}
              inputRef={inputRef}
              error={error}
              handleInputChange={handleSubcommentInputChange}
              handleSubmitComment={handleAddSubcomments}
            /> :
            null
        }
        {
          (payload?.subComments?.length === 0) ?
            <Box id='empty-subcomment'>
              <Typography style={{ alignItems: 'flex-start' }}>No comment has added yet.</Typography>
            </Box>
            :
            payload?.subComments?.map((subcomment, index) => (
              <>
                <MapSubComment key={index} parentComment={payload} subcomment={subcomment}/>
              </>
            ))
        }
      </Collapse>
    </Card>
  );
}