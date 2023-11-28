import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Accordion, AccordionSummary } from "@mui/material";
import MapContext from "../../../../contexts/map";
import AuthContext from "../../../../contexts/auth";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

export default function MapComment(payload, index) {
  const { mapInfo } = useContext(MapContext);
  const { auth } = useContext(AuthContext);
  const { mapId } = useParams();

  useEffect(() => {
    mapInfo.getMapById(mapId);
  }, []);

  useEffect(() => {
    if (mapInfo.currentMap) {
      mapInfo.getAllCommentsFromPublishedMap(mapId);
    }
  }, [mapInfo.currentMap]);

  payload = payload.payload;

  const deleteHandler = () => {
    console.log("handle delete comment");
  };

  const handlePlusIconClick = () => {
    console.log("handle add subcomment");
  };

  return (
    <div>
      <Accordion
        sx={{
          //   bgcolor: "#ddebe4",
          bgcolor: "white",
          width: "92%",
          marginBottom: "2vh",
          marginTop: "2vh",
          border: "2px solid #ddebe4",
          left: "4%",
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box
            className="accordionSummary"
            sx={{ width: "90%", margin: "auto" }}
          >
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
                <DeleteForeverOutlinedIcon onClick={deleteHandler} />
              </Box>

              <Typography style={{ textAlign: `start`, padding: `10px` }}>
                {payload.content}
              </Typography>
            </Box>
            {auth.loggedIn ? <AddIcon onClick={handlePlusIconClick} /> : null}
          </Box>
        </AccordionSummary>
        {/* more about subcomments */}
      </Accordion>
      {/* more about subcomments */}
    </div>
  );
}