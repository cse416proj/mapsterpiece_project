import React, { useContext, useState } from "react";
import { PostContext } from "../../../contexts/post";
import AuthContext from "../../../contexts/auth";
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
  const { auth } = useContext(AuthContext);
  const [addActive, setAddActive] = useState(false);
  const [commentInput, setInput] = useState("");

  payload = payload.payload;
  function handlePlusIconClick(event) {
    event.stopPropagation();
    postInfo.setCurrentComment(payload);
    setAddActive(true);
  }

  function handleInputChange(event) {
    setInput(event.target.value);
  }

  function handleSubmitComment() {
    postInfo.createSubcomment(payload._id, auth.user.userName, commentInput);
    setAddActive(false);
  }

  function handleOnSubmit(event){
    event.stopPropagation();
    event.preventDefault();
    handleSubmitComment();
  }

  function handleSetEditFalse() {
    setAddActive(false);
  }

  return (
    <div>
      <Accordion
        sx={{
          bgcolor: "#ddebe4",
          width: "80vw",
          marginBottom: "2vh",
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
            {(auth.loggedIn) ? <AddIcon onClick={handlePlusIconClick} /> : null}
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
        </AccordionDetails>
      </Accordion>
      {addActive ? (
        <Box
          className="commentCard"
          sx={{
            bgcolor: "#b1d7c4",
          }}
        >
          <Paper
            component="form"
            sx={{
              display: "flex",
              alignItems: "center",
              width: 400,
              marginLeft: "10px",
            }}
            onSubmit={handleOnSubmit}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Enter your comments here..."
              onChange={handleInputChange}
              autoFocus
              onBlur={handleSetEditFalse}
            />
            <Button id="comment-submit-btn" variant="contained" onMouseDown={handleSubmitComment}>
              Submit
            </Button>
          </Paper>
        </Box>
      ) : null}
    </div>
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
          {subcomment.commenterUserName}
        </Typography>
      </Box>
      <Typography
        style={{
          textAlign: `start`,
          padding: `10px`,
        }}
      >
        {subcomment.content}
      </Typography>
    </Box>
  );
}
