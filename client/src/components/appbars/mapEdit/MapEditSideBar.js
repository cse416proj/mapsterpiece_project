import React, { useState, useContext, useEffect, useRef } from "react";
import { Sidebar } from "react-pro-sidebar";
import {
  Select,
  Typography,
  Box,
  MenuItem,
  Input,
  Toolbar,
  Stack,
} from "@mui/material";

import { Tags } from "../../index";
import MapContext from "../../../contexts/map";
import { CompactPicker } from "react-color";

function MapEditSideBar() {
  const { mapInfo } = useContext(MapContext);

  const [title, setTitle] = useState(mapInfo?.currentMap?.title);
  const [tags, setTags] = useState(mapInfo?.currentMap?.tags);
  const [selectedColor, setSelectedColor] = useState("#ffffff");
  const [mapType, setMapType] = useState(mapInfo?.currentMap?.mapType);
  const titleRef = useRef();
  const tagsRef = useRef();
  const mapTypeRef = useRef();
  titleRef.current = mapInfo?.currentMap?.title;
  tagsRef.current = mapInfo?.currentMap?.tags;
  mapTypeRef.current = mapInfo?.currentMap?.mapType;

  useEffect(() => {
    if(title && tags && mapType) {
      mapInfo?.updateMapGeneralInfo(title, tags, mapType);
    }
  }, [title, tags, mapType]);

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

  const handleSetMapType = (e) => {
    setMapType(e);
    mapInfo?.setCurrentMapEditType(e);
  };

  return (
    <Sidebar style={sideBarStyle}>
      <Toolbar className="map-screen-sidebar">
        <Typography sx={{ fontWeight: "bold", fontSize: "25px" }}>
          Edit Map
        </Typography>
        <Box className="sidebar-block">
          <Typography className="sidebar-block-title">Map Type</Typography>
          <Select
            defaultValue={mapType}
            onChange={(e) => handleSetMapType(e.target.value)}
            className="sidebar-block-content"
          >
            <MenuItem value={"REGULAR"}>Regular</MenuItem>
            <MenuItem value={"BINMAP"}>Bin Map</MenuItem>
            <MenuItem value={"CHOROPLETH"}>Choropleth Map</MenuItem>
            <MenuItem value={"DOT_DISTRIBUTION"}>Dot Distribution Map</MenuItem>
            <MenuItem value={"GRADUATED_SYMBOL"}>Graduated Symbol Map</MenuItem>
            <MenuItem value={"HEATMAP"}>Heat Map</MenuItem>
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
            value={title ? title : titleRef.current}
          />
        </Box>

        <Box className="sidebar-block">
          <Typography className="sidebar-block-title">Tags</Typography>
          <Tags tags={tags ? tags : tagsRef.current} setTags={setTags} />
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
          {mapType === "REGULAR" ? (
            <CompactPicker color={selectedColor} onChange={handleColorChange} />
          ) : null}
          {mapType !== "REGULAR" ? (
            <Stack spacing={2}>
              {mapInfo?.currentMap?.mapTypeData?.data?.map((props) => (
                <Stack direction="row" spacing={2}>
                  <Typography>{props.regionName}</Typography>
                  <Typography>{props.value}</Typography>
                </Stack>
              ))}
            </Stack>
          ) : null}
        </Box>
      </Toolbar>
    </Sidebar>
  );
}

export default MapEditSideBar;
