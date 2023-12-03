import React, { useState, useContext, useEffect } from "react";
import { Sidebar } from "react-pro-sidebar";
import {
  Select,
  Typography,
  Box,
  MenuItem,
  Input,
  Toolbar,
} from "@mui/material";

import { Tags } from "../../index";
import MapContext from "../../../contexts/map";
import { CompactPicker } from "react-color";

function MapEditSideBar() {
  const { mapInfo } = useContext(MapContext);

  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [selectedColor, setSelectedColor] = useState('#ffffff');
  const [mapType, setMapType] = useState(10);

  useEffect(() => {
    if (mapInfo) {
      if (mapInfo.currentMap) {
        setTitle(mapInfo.currentMap.title);
        setTags(mapInfo.currentMap.tags);
      }
    }
  }, []);

  useEffect(() => {
    mapInfo?.updateMapGeneralInfo(title, tags);
  }, [title, tags]);

  const sideBarStyle = {
    height: "74.5vh",
    top: "5px",
    width: "30%",
    backgroundColor: "#DEE9EB",
    boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    borderRadius: "10px",
  };

  const handleColorChange = (color) => {
    mapInfo?.setCurrentRegionColor(color.hex);
    setSelectedColor(color.hex);
  };

  return (
    <Sidebar style={sideBarStyle}>
      <Toolbar className="map-screen-sidebar">
        <Typography sx={{ fontWeight: "bold", fontSize: "25px" }}>
          Edit Map
        </Typography>
        <Box className="sidebar-block">
          <Typography className="sidebar-block-title">Map Type</Typography>
          <Select defaultValue={10} onChange={(e) => setMapType(e.target.value)} className="sidebar-block-content">
            <MenuItem value={10}>Bin Map</MenuItem>
            <MenuItem value={20}>Choropleth Map</MenuItem>
            <MenuItem value={30}>Dot Distribution Map</MenuItem>
            <MenuItem value={40}>Graduated Symbol Map</MenuItem>
            <MenuItem value={50}>Heat Map</MenuItem>
          </Select>
        </Box>

        <Box className="sidebar-block">
          <Typography className="sidebar-block-title">
            Map Title/Name
          </Typography>
          <Input
            className="sidebar-block-content sidebar-input"
            aria-label="title input"
            placeholder="type new title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </Box>

        <Box className="sidebar-block">
          <Typography className="sidebar-block-title">Tags</Typography>
          <Tags tags={tags} setTags={setTags} />
        </Box>
        <Box className="sidebar-block">
          <Typography className="sidebar-block-title">Legend</Typography>
          <Box className="legend-title-container sidebar-block-content">
            <Typography>Title: </Typography>
            <Input
              className="sidebar-input"
              aria-label="legend-title input"
              placeholder="enter legend title"
            />
          </Box>
        </Box>
        <Box className="sidebar-block">
          <Typography className="sidebar-block-title">Map Data</Typography>
          <Box className="sidebar-block-content data-block"></Box>
          <CompactPicker color={selectedColor} onChange={handleColorChange}/>
        </Box>
      </Toolbar>
    </Sidebar>
  );
}

export default MapEditSideBar;
