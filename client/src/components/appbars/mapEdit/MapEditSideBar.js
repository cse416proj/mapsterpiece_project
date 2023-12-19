import React, { useState, useContext, useEffect, useRef } from "react";
import { Sidebar } from "react-pro-sidebar";
import {
  Typography,
  Box,
  Input,
  Stack,
  Chip,
  Toolbar,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

import { Tags } from "../../index";
import MapContext from "../../../contexts/map";
import GlobalStoreContext from "../../../contexts/store";
import { CompactPicker } from "react-color";

function MapEditSideBar() {
  const { mapInfo } = useContext(MapContext);
  const { store } = useContext(GlobalStoreContext);

  const [title, setTitle] = useState(mapInfo?.currentMap?.title);
  const [tags, setTags] = useState(mapInfo?.currentMap?.tags);
  const [editActive, setEditActive] = useState(false);

  const [selectedColor, setSelectedColor] = useState(
    (mapInfo?.currentMap?.mapTypeData?.dataColor) ?
      mapInfo?.currentMap?.mapTypeData?.dataColor :
      (
        (mapInfo?.dataColor) ?
        mapInfo?.dataColor : "#5bab93"
      )
  );
  const [selectColorActive, setSelectColorActive] = useState(false);
  const [isEditingTag, setIsEditingTag] = useState(false);
  const [legendTitle, setLegendTitle] = useState(
    mapInfo?.currentMap?.mapTypeData?.legendTitle
  );

  const mapRef = useRef();
  const titleRef = useRef();
  const tagsRef = useRef();
  const legendTitleRef = useRef();
  mapRef.current = mapInfo?.currentMap;
  titleRef.current = mapInfo?.currentMap?.title;
  tagsRef.current = mapInfo?.currentMap?.tags;
  legendTitleRef.current = mapInfo?.currentMap?.mapTypeData?.legendTitle;

  useEffect(() => {
    if (title && tags) {
      mapInfo?.updateMapGeneralInfo(title, tags, legendTitle);
    }
  }, [title, tags, legendTitle]);

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
    console.log(`color change to: ${color.hex}`);
    mapInfo?.setDataColor(color.hex);
    setSelectedColor(color.hex);
    setSelectColorActive(false);
  };

  function getText(type){
    const dict = {
      '': 'Loading...',
      'PINMAP': 'Pin Map',
      'HEATMAP': 'Heat Map',
      'CHOROPLETH': 'Choropleth Map',
      'DOT_DISTRIBUTION': 'Dot Distribution Map',
      'GRADUATED_SYMBOL': 'Graduated Symbol Map'
    }
    return dict[type];
  }

  function handleEditMapType(event){
    event.preventDefault();
    event.stopPropagation();
    setEditActive(true);
  }

  function handleChangeMapType(event){
    event.preventDefault();
    event.stopPropagation();
    setEditActive(false);

    // update tag
    const type = event.target.value;
    mapInfo?.setCurrentMapEditType(type);

    // update tag for map type
    const mapTypeList = [
      "HEATMAP",
      "CHOROPLETH",
      "DOT_DISTRIBUTION",
      "GRADUATED_SYMBOL",
      "PINMAP",
    ];
    const newtags = tags?.filter((tag) => !mapTypeList.includes(tag));
    if (newtags) {
      setTags([...newtags, type]);
    } else {
      setTags([type]);
    }
  }

  function handleCloseSelect(event){
    event.preventDefault();
    event.stopPropagation();
    setEditActive(false);
  }

  function getSelectColorPrompt(mapType){
    if(mapType === 'DOT_DISTRIBUTION'){
      return 'Select Dot Color';
    }
    else if(mapType === 'GRADUATED_SYMBOL'){
      return 'Select Graduated Symbol Color';
    }
    else if(mapType === 'CHOROPLETH'){
      return 'Select Choropleth Shade Color';
    }
  }

  function renderSelectColor(){
    const mapType = (mapInfo.currentMapEditType) ? mapInfo.currentMapEditType : mapInfo.currentMap?.mapType;
    
    if(mapType === "PINMAP" || mapType === "HEATMAP"){
      return null;
    }
    else{
      return(
        <Box className='flex-row' id='color-selector'>
          <Typography>{getSelectColorPrompt(mapType)}</Typography>
          {
            (selectColorActive) ?
              <CompactPicker color={ selectedColor } onChange={handleColorChange}/>
              :
              <Box
                id='color-box'
                style={{ backgroundColor: selectedColor }}
                onClick={() => setSelectColorActive(true)}
              />
          }
        </Box>
      )
    }
  }

  function renderData(){
    const mapType = (mapInfo.currentMapEditType) ? mapInfo.currentMapEditType : mapInfo.currentMap?.mapType;

    if(mapType === "PINMAP"){
      return null;
    }
    else{
      return (
        <Stack spacing={1} style={{ marginTop: `10px` }}>
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
      )
    }
  }

  console.log(mapInfo?.currentMap);
  console.log(`mapInfo.currentMapEditType: ${mapInfo.currentMapEditType}`);

  return (
    <Sidebar style={sideBarStyle}>
      <Toolbar className="map-screen-sidebar">
        <Divider id='edit-map-divider' style={{ margin: '2.5vh auto' }}>
          Edit Map
        </Divider>

        <Box className="sidebar-block">
          <Box className='flex-row' style={{ width: '100%' }}>
            {
              (editActive) ?
                <FormControl style={{ width: '100%' }}>
                  <InputLabel id="map-type-dropdown-label">Select Map Type...</InputLabel>
                  <Select
                    open={editActive}
                    onClose={handleCloseSelect}
                    onChange={handleChangeMapType}
                    style={{ width: '100%' }}
                  >
                    <MenuItem disabled value="">Select A Map Type...</MenuItem>
                    <MenuItem value={"PINMAP"}>Pin Map</MenuItem>
                    <MenuItem value={"HEATMAP"}>Heat Map</MenuItem>
                    <MenuItem value={"CHOROPLETH"}>Choropleth Map</MenuItem>
                    <MenuItem value={"DOT_DISTRIBUTION"}>Dot Distribution Map</MenuItem>
                    <MenuItem value={"GRADUATED_SYMBOL"}>Graduated Symbol Map</MenuItem>
                  </Select>
                </FormControl> :
                <>
                  <Typography className="sidebar-block-title">
                    {`Map Type: `}
                    <span id='map-type-text' onClick={handleEditMapType}>{getText((mapInfo.currentMapEditType) ? mapInfo.currentMapEditType : mapInfo.currentMap?.mapType)}</span>
                  </Typography>
                  <EditIcon id='edit-map-type' onClick={handleEditMapType}/>
                </>
            }
          </Box>
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
          { renderSelectColor() }
        </Box>
        <Box className="sidebar-block">
          <Typography className="sidebar-block-title">Map Data</Typography>
          <Box className="sidebar-block-content data-block"></Box>
          { renderData() }
        </Box>
      </Toolbar>
    </Sidebar>
  );
}

export default MapEditSideBar;
