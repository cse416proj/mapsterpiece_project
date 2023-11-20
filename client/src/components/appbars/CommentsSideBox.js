import React, {useContext, useEffect, useState} from 'react';
import { Sidebar } from 'react-pro-sidebar';
import { MapContext } from "../../contexts/map";
import { Select, Typography, Box, MenuItem, Input, Toolbar } from '@mui/material';
import {useParams} from "react-router-dom";

export default function CommentsSideBox(){

    const [isOpen, setIsOpen] = useState(false);

    const boxStyle = {
        border: '1px solid #ccc',
        padding: '10px',
        margin: '10px',
        width: '300px',
        height: isOpen ? 'auto' : '40px', // Set the height based on the isOpen state
        overflow: 'hidden',
        transition: 'height 0.3s ease', // Add a smooth transition effect
    };

    const toggleCommentBox = () => {
        setIsOpen(!isOpen);
    };

    return(
        <div style={boxStyle}>
            <button onClick={toggleCommentBox}>
                {isOpen ? 'Close Comment Box' : 'Open Comment Box'}
            </button>

            {isOpen && (
                <div>
                    <textarea placeholder="Type your comment here..." rows="4" cols="25" />
                    <button>Submit Comment</button>
                </div>
            )}
        </div>

    );
}