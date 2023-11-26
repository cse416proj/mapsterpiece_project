import React, { useContext, useState, useEffect } from 'react';
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

    useEffect(() => {
        mapInfo.getMapById(mapId);
    }, []);

    useEffect(() => {
        if(mapInfo?.map?.map){
          mapInfo.getAllCommentsFromPublishedMap(mapInfo.map.map._id);
        }
      }, [mapInfo?.map?.map]);

    //   console.log(mapInfo.allCommentsForMap);

    const boxStyle = {
        display: 'flex',
        flexDirection: 'column', // Change to column layout
        justifyContent: 'space-between',
        alignItems: 'flex-start', // Align to the left
        padding: '7px',
        border: isToolbarExpanded ? '1px solid #ddd' : 'none',
        borderRadius: '10px',
        height: isToolbarExpanded ? '80vh' : '40px',
        overflow: 'hidden',
        transition: 'height 0.3s ease',
        textAlign: 'right',
        width: isToolbarExpanded ? '25%' : 'none',
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
        const mapId = mapInfo.map.map._id;
        mapInfo.createMapComment(
            mapId,
            auth?.user?.userName, 
            commentInput
        );
    }

    const handleInputChange = (event) => {
        setInput(event.target.value);
    }
    // console.log("comment input: ",commentInput);

    const handleOnSubmit = (event) =>{
        event.stopPropagation();
        event.preventDefault();
        handleSubmitComment();
    }

    if (!mapInfo || !mapInfo.map) {
        return null;
      }

    return (
        <Toolbar style={boxStyle}>
            {/* actual toolbar */}
            {isToolbarExpanded && (
                <Box>
                    <Box style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <CloseIcon
                            style={{ cursor: 'pointer', marginRight: '10px' }}
                            onClick={toggleCommentBox}
                        />
                        <Typography
                            style={{ fontWeight: 'bolder' }}
                            onClick={toggleCommentBox}
                        >
                            Close Comment Box
                        </Typography>
                    </Box>

                    {/* actual comments */}
                    <Box id="map-comments">
                    { mapInfo.allCommentsForMap?.map((pair, index) => (
                         <MapComment key={`comment-${index}`} payload={pair} index={index} />
                    ))}
                    {addActive ? (
                        <Accordion 
                        // id='map-accordion'
                        >
                            <Paper
                            component="form"
                            // id='map-form'
                            onSubmit={handleOnSubmit}
                            >
                            <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Enter your comments here..."
                            onChange={handleInputChange}
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
                        ) : null
                    }
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
                >
                    Open Comment Box
                </Button>
            )}
        </Toolbar>
    );
}
