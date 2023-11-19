import React, { useContext, useState } from "react";
import { PostContext } from "../../../contexts/post";
import {
  Box,
  Button,
  Paper,
  InputBase,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";

export default function PostComment(payload, index) {
  const { postInfo } = useContext(PostContext);
  const [addActive, setAddActive] = useState(false);
  const [commentInput, setInput] = useState("");

  index = payload.index;
  function handlePlusIconClick() {
    postInfo.setCurrentComment(index);
    setAddActive(true);
  }

  function handleInputChange(event) {
    setInput(event.target.value);
  }

  function handleSubmitComment() {
    postInfo.addCommentToCurrentComment(commentInput);
    setAddActive(false);
  }

  payload = payload.payload;
  return (
    <Accordion
      sx={{
        bgcolor: "#ddebe4",
        width: "80vw",
        marginTop: "2vh",
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box className="accordionSummary">
          <Box>
            <Box className="commentUserInfo">
              <AccountCircleIcon />
              <Typography
                style={{
                  textAlign: `start`,
                  padding: `10px`,
                  fontWeight: `bold`,
                }}
              >
                {payload.commenterUserName}
              </Typography>
            </Box>
            <Typography
              style={{
                textAlign: `start`,
                padding: `10px`,
              }}
            >
              {payload.content}
            </Typography>
          </Box>
          <AddIcon onClick={handlePlusIconClick}/>
        </Box>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          bgcolor: "#b1d7c4",
        }}
      >
        {payload?.subComments?.map((subcomment, index) => (
          <Subcomment key={`subcomment-${index}`} subcomment={subcomment} />
        ))}
        {addActive ? (
          <Box className="commentCard">
            <Paper
              component="form"
              sx={{
                display: "flex",
                alignItems: "center",
                width: 400,
                marginLeft: "10px",
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Enter your comments here..."
                onChange={handleInputChange}
              />
              <Button variant="contained" onClick={handleSubmitComment}>
                Submit
              </Button>
            </Paper>
          </Box>
        ) : null}
      </AccordionDetails>
    </Accordion>
  );
}

function Subcomment(subcomment) {
  subcomment = subcomment.subcomment;
  return (
    <Box className="commentCard">
      <Box className="commentUserInfo">
        <AccountCircleIcon />
        <Typography
          style={{
            textAlign: `start`,
            padding: `10px`,
            fontWeight: `bold`,
          }}
        >
          {subcomment.commentUserName}
        </Typography>
      </Box>
      <Typography
        style={{
          textAlign: `start`,
          padding: `10px`,
        }}
      >
        {subcomment.text}
      </Typography>
    </Box>
  );
}
