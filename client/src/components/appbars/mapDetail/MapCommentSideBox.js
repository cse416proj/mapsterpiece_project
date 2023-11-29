import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Box, Toolbar, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import MapContext from '../../../contexts/map';
import MapCommentSideBar from './MapCommentSideBar';

export default function MapCommentSideBox() {
    const { mapInfo } = useContext(MapContext);
    const { mapId } = useParams();

    const [isToolbarExpanded, setIsToolbarExpanded] = useState(false);

    useEffect(() => {
      mapInfo.getMapById(mapId);
    }, []);

    useEffect(() => {
      if(mapInfo.currentMap){
        mapInfo.getAllCommentsFromPublishedMap(mapId);
      }
    }, [mapInfo?.currentMap]);

    const boxStyle = {
      border: (isToolbarExpanded) ? '1px solid #ddd' : 'none',
      backgroundColor: (isToolbarExpanded) ? '#ebf9f5' : 'transparent',
      '& .MuiToolbarGutters': {
        paddingLeft: 0,
        paddingRight: 0,
      }
    };

    const toggleCommentBox = () => {
      setIsToolbarExpanded(!isToolbarExpanded);
    };

    function renderToolBar(){
      if(isToolbarExpanded){
        return <MapCommentSideBar toggleCommentBox={toggleCommentBox}/>
      }
      return null;
    }

    function renderToolBtn(){
      if(!isToolbarExpanded){
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