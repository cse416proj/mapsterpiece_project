import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Card, CardContent, CardActions, Collapse, IconButton, Button } from '@mui/material';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

import MapContext from '../../../../contexts/map';
import AuthContext from '../../../../contexts/auth';

export default function MapComment({payload, index}) {
  const { mapInfo } = useContext(MapContext);
  const { auth } = useContext(AuthContext);
  // const { userInfo } = useContext(UserContext);
  // const navigate = useNavigate();

  const { mapId } = useParams();
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    mapInfo.getMapById(mapId);
  }, []);

  useEffect(() => {
    if (mapInfo.currentMap) {
      mapInfo.getAllCommentsFromPublishedMap(mapId);
    }
  }, [mapInfo.currentMap]);

  // function handleVisitProfile(event){
  //   event.stopPropagation();
  //   event.preventDefault();
  //   userInfo.setCurrentUser(auth.user);
  //   navigate(`/profile/${auth.user._id}`);
  // }

  const handleExpandComments = () => {
    setExpanded(!expanded);
  };

  const deleteHandler = () => {
    console.log('handle delete comment');
  };

  const handleAddSubcomments = () => {
    console.log('handle add subcomment');
  };

  function renderDeleteBtn(){
    if(auth.loggedIn){
      return <IconButton><DeleteForeverOutlinedIcon onClick={deleteHandler}/></IconButton>
    }
    return null;
  }

  function renderCardActions(){
    let expandIcon = (expanded) ? <ExpandLessIcon/> : <ExpandMoreIcon/>;

    return(
      <Box class='flex-row' id='card-actions'>
        {
          (auth.loggedIn) ?
            <Button id='reply-button'>
              <ChatBubbleOutlineIcon onClick={handleAddSubcomments}/>
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
    <Card style={{ marginBottom: '1.5vh' }}>
      <CardContent style={{height: '7.5vh'}}>
        <Box>
          <Box className='flex-row' id='comment-user-info-container'>
            <Box className='flex-row' id='comment-user-info'>
              <AccountCircleIcon/>
              <Typography id='comment-owner-name'> {payload?.commenterUserName} </Typography>
            </Box>
            { renderDeleteBtn() }
          </Box>
          <Typography id='comment'>
            {payload?.content}
          </Typography>
        </Box>
      </CardContent>
      <CardActions disableSpacing>
        { renderCardActions() }
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          hi
        </CardContent>
      </Collapse>
    </Card>
  );
}