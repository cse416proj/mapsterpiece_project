import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../../contexts/auth";
import { GlobalStoreContext } from "../../../contexts/store";
import { useNavigate, useParams } from "react-router-dom";

import {
  Typography,
  Box,
  Button,
  SpeedDial,
  SpeedDialIcon,
  Paper,
  InputBase,
  Accordion,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { MapScreen, Tag } from "../../index";
import { MapDetailOwnerTopBar } from "../../appbars/MapDetailOwnerTopBar";
import { MapDetailUserTopBar } from "../../appbars/MapDetailUserTopBar";
import CommentsSideBox from "../../appbars/CommentsSideBox";
import { DeleteMapModal } from "../../index";
import MapContext from "../../../contexts/map";

export default function MapDetailsScreen() {
  return (
    <Box>
      <MapDetailOwnerTopBar />
      <Box
        className="map-screen-container"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          flex: 1,
        }}
      >
        <MapScreen />
        <CommentsSideBox />
        <DeleteMapModal />
      </Box>
    </Box>
  );
}
