import React, { useContext, useState, useEffect, useRef } from 'react';
import { Typography, Box, Toolbar, Button, Accordion, Paper, InputBase } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { MapComment } from '../index';
import MapContext from '../../contexts/map';
import AuthContext from '../../contexts/auth';
import { useParams } from 'react-router-dom';

export default function MapCommentSideBox() {
    const { mapInfo } = useContext(MapContext);
    const { auth } = useContext(AuthContext);
    const { mapId } = useParams();

    const [isToolbarExpanded, setIsToolbarExpanded] = useState(false);
    const [addActive, setAddActive] = useState(false);
    const [commentInput, setInput] = useState("");
    const inputRef = useRef(null);

    useEffect(() => {
        mapInfo.getMapById(mapId);
    }, []);

    useEffect(() => {
        if(mapInfo.currentMap){
          mapInfo.getAllCommentsFromPublishedMap(mapId);
        }
      }, [mapInfo.currentMap]);

    const boxStyle = {
        display: 'flex',
        flexDirection: 'column', // Change to column layout
        justifyContent: 'space-between',
        alignItems: 'flex-start', // Align to the left
        padding: '7px',
        border: isToolbarExpanded ? '1px solid #ddd' : 'none',
        borderRadius: '10px',
        height: isToolbarExpanded ? '89vh' : '40px',
        overflow:'hidden',
        transition: 'height 0.3s ease',
        textAlign: 'right',
        width: isToolbarExpanded ? '30%' : 'none',
        marginTop: '7px',
        backgroundColor: isToolbarExpanded ? '#cce4e8' : 'transparent',
    };

    const buttonStyle = {
        backgroundColor: '#cce4e8',
        color: 'black',
        fontWeight: 'bold',
        marginLeft: 'auto',
    };

    const toggleCommentBox = () => {
        setIsToolbarExpanded(!isToolbarExpanded);
        setAddActive(!addActive);
    };
   
    const handleSubmitComment = () => {
        const mapId = mapInfo.currentMap._id;
        if (mapId && auth?.user?.userName && commentInput !== "") {
          mapInfo.createMapComment(mapId, auth?.user?.userName, commentInput);
          setInput("");
    
          // Reset the input value using the ref
          if (inputRef.current) {
            inputRef.current.value = "";
          }
        } else {
          console.log("no map / no user / no comment");
        }
      };
    
    const handleInputChange = (event) => {
        setInput(event.target.value);
    }
    // console.log("comment input: ",commentInput);

    const handleOnSubmit = (event) =>{
        event.stopPropagation();
        event.preventDefault();
        handleSubmitComment();
    }

    if (!mapInfo || !mapInfo.currentMap) {
        return null;
    }

    const hasComments = mapInfo.allCommentsForMap.length===0;
    // console.log(mapInfo.allCommentsForMap.length===0);

    return (
        <Toolbar style={boxStyle}>
          {/* actual toolbar */}
          {isToolbarExpanded && (
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', height: '100%' }}>
              {/* handle close side bar */}
              <Box style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <CloseIcon
                  style={{ cursor: 'pointer', marginRight: '10px' }}
                  onClick={toggleCommentBox}
                  id="close-comment"
                />
                <Typography
                  style={{ fontWeight: 'bolder' }}
                  onClick={toggleCommentBox}
                  id="close-comment"
                >
                  Close Comment Box
                </Typography>
              </Box>
      
              {/* actual comments */}
                <Box sx={{ flex: 1, overflowY: 'auto' }}>
                <Box id="map-comments" sx={{ alignContent: 'center', width: '100%' }}>
                  {mapInfo.allCommentsForMap?.map((pair, index) => (
                    <MapComment sx={{}} key={`comment-${index}`} payload={pair} index={index} />
                  ))}
                </Box>
              </Box>
              
              {/* input map comment */}
              <Box id="input-comment" sx={{ marginTop: 'auto', width: '99%' }}>
                {addActive ? (
                  <Accordion>
                    <Paper component="form" onSubmit={handleOnSubmit}>
                      <InputBase
                        sx={{
                            ml: 1,
                            flex: 1,
                            width: '80%',
                            '& input': {
                              padding: '0',
                            },
                          }}
                        placeholder="Enter your comments here..."
                        onChange={handleInputChange}
                        inputRef={inputRef}
                      />
                      <Button
                        variant="contained"
                        id="comment-submit-btn"
                        onClick={handleSubmitComment}
                      >
                        Submit
                      </Button>
                    </Paper>
                  </Accordion>
                ) : null}
              </Box>
            </Box>
          )}
      
          {/* open toolbar button */}
          {!isToolbarExpanded && (
            <Button
              variant="contained"
              style={buttonStyle}
              onClick={toggleCommentBox}
              startIcon={<AddIcon />}
              id = "open-comment"
            >
              Open Comment Box
            </Button>
          )}
        </Toolbar>
    );
      

}
