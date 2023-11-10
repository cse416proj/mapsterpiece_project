import React, { useContext } from "react";
import { PostContext } from "../../post";
import { GlobalStoreContext } from "../../store";
import Box from "@mui/material/Box";
import { Container, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

export default function PostDetailScreen() {
  const navigate = useNavigate();
  const { postInfo } = useContext(PostContext);
  const { store } = useContext(GlobalStoreContext);

  function handleAllMaps() {
    store.setCurrentView("ALL_POSTS");
    navigate("/community");
  }

  return (
    <div>
      <Typography
        style={{ textAlign: `start`, padding: `10px`, marginLeft: 0 }}
        onClick={handleAllMaps}
      >
        {"<< All Posts"}
      </Typography>
      <div className="postScreenContent">
        <Box
          sx={{
            bgcolor: "#ddebe4",
            height: "10vh",
            width: "80vw",
            marginTop: "5vh",
          }}
        >
          <Typography
            style={{
              textAlign: `start`,
              padding: `10px`,
              fontWeight: `bold`,
              fontSize: `30px`,
            }}
          >
            {postInfo.currentPost.title}
          </Typography>
        </Box>
        <Box
          sx={{
            bgcolor: "#ddebe4",
            height: "20vh",
            width: "80vw",
            marginTop: "5vh",
          }}
        >
          <Typography style={{ textAlign: `start`, padding: `10px` }}>
            {postInfo.currentPost.postBody}
          </Typography>
        </Box>
        {postInfo.currentPost.comments.map((pair) => (
          <Accordion
            sx={{
              bgcolor: "#ddebe4",
              width: "80vw",
              marginTop: "2vh",
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <div className="accordionSummary">
                <div className="flex-column">
                  <div className="commentUserInfo">
                    <AccountCircleIcon />
                    <Typography
                      style={{
                        textAlign: `start`,
                        padding: `10px`,
                        fontWeight: `bold`,
                      }}
                    >
                      {pair.commentUserName}
                    </Typography>
                  </div>
                  <Typography
                    style={{
                      textAlign: `start`,
                      padding: `10px`,
                    }}
                  >
                    {pair.text}
                  </Typography>
                </div>
                <AddIcon />
              </div>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                bgcolor: "#b1d7c4",
              }}
            >
              {pair.subComments.map((subcomment) => (
                <div className="commentCard">
                  <div className="commentUserInfo">
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
                  </div>
                  <Typography
                    style={{
                      textAlign: `start`,
                      padding: `10px`,
                    }}
                  >
                    {subcomment.text}
                  </Typography>
                </div>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
}
