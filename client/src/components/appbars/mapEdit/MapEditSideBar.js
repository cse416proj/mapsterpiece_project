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
  Chip,
} from "@mui/material";

import { Tags } from "../../index";
import MapContext from "../../../contexts/map";
import GlobalStoreContext from "../../../contexts/store";
import { CompactPicker } from "react-color";

function MapEditSideBar() {
  const { mapInfo } = useContext(MapContext);
  const { store } = useContext(GlobalStoreContext);

  const [title, setTitle] = useState(mapInfo?.currentMap?.title);
  const [tags, setTags] = useState(mapInfo?.currentMap?.tags);
  const [selectedColor, setSelectedColor] = useState("#ffffff");
  const [mapType, setMapType] = useState(
    mapInfo?.currentMap?.mapType ? mapInfo?.currentMap?.mapType : "REGULAR"
  );
  const [isEditingTag, setIsEditingTag] = useState(false);
  const [legendTitle, setLegendTitle] = useState(
    mapInfo?.currentMap?.mapTypeData?.legendTitle
  );

  const titleRef = useRef();
  const tagsRef = useRef();
  const mapTypeRef = useRef();
  const legendTitleRef = useRef();
  titleRef.current = mapInfo?.currentMap?.title;
  tagsRef.current = mapInfo?.currentMap?.tags;
  mapTypeRef.current = mapInfo?.currentMap?.mapType;
  legendTitleRef.current = mapInfo?.currentMap?.mapTypeData?.legendTitle;

  useEffect(() => {
    if (title && tags && mapType) {
      mapInfo?.updateMapGeneralInfo(title, tags, mapType, legendTitle);
    }
  }, [title, tags, mapType, legendTitle]);

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

    const mapTypeList = [
      "REGULAR",
      "HEATMAP",
      "CHOROPLETH",
      "DOT_DISTRIBUTION",
      "GRADUATED_SYMBOL",
      "PINMAP",
    ];
    const newtags = tags?.filter((tag) => !mapTypeList.includes(tag));
    if (newtags) {
      setTags([...newtags, e]);
    } else {
      setTags([e]);
    }
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
            defaultValue="REGULAR"
            value={mapType ? mapType : "REGULAR"}
            onChange={(e) => handleSetMapType(e.target.value)}
            className="sidebar-block-content"
          >
            <MenuItem value={"REGULAR"}>Regular</MenuItem>
            <MenuItem value={"PINMAP"}>Pin Map</MenuItem>
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
            placeholder="Type new title"
            onChange={(e) => setTitle(e.target.value)}
            value={title ? title : titleRef.current}
          />
        </Box>

        <Box className="sidebar-block">
          <Typography className="sidebar-block-title">Tags</Typography>
          <Tags
            style={{ width: "5vw" }}
            tags={tags ? tags : tagsRef.current}
            setTags={setTags}
            isEditingTag={isEditingTag}
            setIsEditingTag={setIsEditingTag}
          />
        </Box>
        <Box className="sidebar-block">
          <Typography className="sidebar-block-title">Legend</Typography>
          <Box className="legend-title-container sidebar-block-content">
            <Typography>Title: </Typography>
            <Input
              className="sidebar-block-content sidebar-input"
              aria-label="title input"
              placeholder="Type new title"
              onChange={(e) => setLegendTitle(e.target.value)}
              value={legendTitle ? legendTitle : legendTitleRef.current}
            />
          </Box>
        </Box>
        <Box className="sidebar-block">
          <Typography className="sidebar-block-title">Map Data</Typography>
          <Box className="sidebar-block-content data-block"></Box>
          {mapType === "REGULAR" || mapType === "GRADUATED_SYMBOL" ? (
            <CompactPicker color={selectedColor} onChange={handleColorChange} />
          ) : null}
          {mapType !== "REGULAR" ? (
            <Stack spacing={1} style={{marginTop: `10px`}}>
              {mapInfo?.currentMap?.mapTypeData?.data?.map((props, index) => (
                <Chip
                  key={index}
                  label={`${props.regionName}: ${props.value}`}
                  style={{backgroundColor: `#dfe9eb`, width: `50%`}}
                  onDelete={() => {
                    mapInfo?.deleteMapTypeData(props.regionName);
                  }}
                />
              ))}
            </Stack>
          ) : null}
        </Box>
      </Toolbar>
    </Sidebar>
  );
}

export default MapEditSideBar;
