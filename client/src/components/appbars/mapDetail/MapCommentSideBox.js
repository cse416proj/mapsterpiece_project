import { useContext, useState } from 'react';

import { Box, Toolbar, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import MapContext from '../../../contexts/map';
import MapCommentSideBar from './MapCommentSideBar';

export default function MapCommentSideBox() {
    const { mapInfo } = useContext(MapContext);

    const [isCommentBoxExpanded, setIsCommentBoxExpanded] = useState(false);

    const boxStyle = {
      border: (isCommentBoxExpanded) ? '1px solid #ddd' : 'none',
      backgroundColor: (isCommentBoxExpanded) ? '#ebf9f5' : 'transparent',
      '& .MuiToolbarGutters': {
        paddingLeft: 0,
        paddingRight: 0,
      }
    };

    const toggleCommentBox = () => {
      setIsCommentBoxExpanded(!isCommentBoxExpanded);
    };

    function renderToolBar(){
      if(isCommentBoxExpanded){
        return <MapCommentSideBar toggleCommentBox={toggleCommentBox}/>
      }
      return null;
    }

    function renderToolBtn(){
      if(!isCommentBoxExpanded){
        return(
          <Button
            id='expand-comment-btn'
            variant="contained"
            onClick={toggleCommentBox}
            startIcon={<AddIcon/>}
          >
            Open Comment Box
          </Button>
        );
      }
      return null;
    }

    if (!mapInfo || !mapInfo.currentMap) {
      return null;
    }

    return (
      <Box className='flex-column' id='comment-side-bar'>
        { renderToolBtn() }
        <Toolbar id='toolbar' style={boxStyle}>
          { renderToolBar() }
        </Toolbar>
      </Box>
    );
}