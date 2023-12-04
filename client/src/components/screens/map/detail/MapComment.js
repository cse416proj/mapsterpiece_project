import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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

  const [subcomment, setSubcomment] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [addActive, setAddActive] = useState(false);
  const [commentInput, setInput] = useState("");
  const [expandSubcomments, setExpandSubcomments] = useState(false);

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
    setSubcomment(event.target.value);
    setInput(event.target.value);
  }

  const handleAddSubcomments = (event) => {
    event.preventDefault();
    event.stopPropagation();
    console.log('handle add subcomment', commentInput, payload);
    mapInfo.createSubcomment(payload._id, auth.user.userName, commentInput);
    setAddActive(false);
    setExpandSubcomments(expandSubcomments);
  };

  const handleDeleteSubcomment = (event) => {
    event.preventDefault();
    event.stopPropagation();
    console.log('handle delete subcomment', payload);
    mapInfo.setCurrentSubcomment(payload, subcomment);
    store.setCurrentView("MAP_VIEW");
    store.markSubcommentForDeletion(subcomment);
  };

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

  //const fakeSubComments = [ { commenterUserName: 'me', content: 'bruh'  }, { commenterUserName: 'me', content: 'sadge'  } ]
  const fakeSubComments = []
  console.log(payload.subComments);

  return (
    <Card id='comment-card' style={ (expanded) ? { minHeight: '100%' } : { minHeight: '20vh' } }>
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
              commentInput={subcomment}
              handleInputChange={handleSubcommentInputChange}
              handleSubmitComment={handleAddSubcomments}
            /> :
            null
        }
       {
        payload?.subComments?.map((subcomm, index) => (
          <>
            <MapSubComment key={index} subcomment={subcomm} deleteHandler={handleDeleteSubcomment}/>
            {/* {
              (index === fakeSubComments.length-1) ? null : <Divider sx={{ width: '97.5%', margin: '0 auto' , borderColor: '#1c1e1d' }} />
            } */}
          </>
        ))
      }
      </Collapse>
    </Card>
  );
}