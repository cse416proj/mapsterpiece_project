import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import api from "./map-request-api";
import AuthContext from "../auth";
import GlobalStoreContext from "../store";

const MapContext = createContext();

export function MapContextProvider({children}){
  const { auth } = useContext(AuthContext);
  const { store } = useContext(GlobalStoreContext);

  const navigate = useNavigate();
  
  const [mapInfo, setMapInfo] = useState({
    currentMap: null,
    allMapsByUser: null,
    currentRegionColor: "#fff",
    allCommentsForMap: [],
    currentComment: null,
    errorMessage: "",
    // download: false,
    // downloadFormat: ''
  });

  const MapActionType = {
    UPLOAD_MAP: "UPLOAD_MAP",
    SET_CURRENT_MAP: "SET_CURRENT_MAP",
    LOAD_ALL_MAPS_FROM_USER: "LOAD_ALL_MAPS_FROM_USER",
    SET_CURRENT_REGION_COLOR: "SET_CURRENT_REGION_COLOR",
    SET_CURRENT_COMMENT: "SET_CURRENT_COMMENT",
    SET_ERROR_MSG: "SET_ERROR_MSG"
    // SET_DOWNLOAD_FORMAT: 'SET_DOWNLOAD_FORMAT',
    // CANCEL_DOWNLOAD: 'CANCEL_DOWNLOAD',
  };

  const mapReducer = (action) => {
    const { type, payload } = action;
    // console.log(payload);
    switch (type) {
      case MapActionType.UPLOAD_MAP:
        return setMapInfo((prevMapInfo) => ({
          ...prevMapInfo,
          currentMap: payload,
        }));
      case MapActionType.SET_CURRENT_MAP:
        return setMapInfo((prevMapInfo) => ({
          ...prevMapInfo,
          currentMap: payload,
          errorMessage: ""
        }));
      case MapActionType.LOAD_ALL_MAPS_FROM_USER:
        return setMapInfo((prevMapInfo) => ({
          ...prevMapInfo,
          allMapsByUser: payload,
          errorMessage: ""
        }));
      case MapActionType.SET_CURRENT_REGION_COLOR:
        return setMapInfo((prevMapInfo) => ({
          ...prevMapInfo,
          currentRegionColor: payload,
          errorMessage: ""
        }));
      case MapActionType.SET_CURRENT_COMMENT:
        return setMapInfo((prevMapInfo) => ({
          ...prevMapInfo,
          currentComment: payload,
        }));
      case MapActionType.SET_ERROR_MSG:
        return setMapInfo((prevMapInfo) => ({
          ...prevMapInfo,
          errorMessage: payload
        }));
      default:
        return mapInfo;
    }
  };

  mapInfo.setCurrentRegionColor = (color) => {
    mapReducer({
      type: MapActionType.SET_CURRENT_REGION_COLOR,
      payload: color,
    });
  };

  mapInfo.createMap = (newMap) => {
    const { title, fileFormat, mapContent, tags } = newMap;

    if(!title || !fileFormat || !mapContent || !tags){
      store.uploadError('Please enter all fields: title/ fileFormat/ fileContent/ tags.')
    }

    // create map for user
    const user = auth.user;
    if (user) {
      async function asyncCreateMap(userName, title, fileFormat, mapContent, tags) {
        const response = await api.createMap(userName, title, fileFormat, mapContent, tags);
        if (response.status === 201) {
          navigate("/");
          mapReducer({
            type: MapActionType.UPLOAD_MAP,
            payload: {
              currentMap: mapContent,
            },
          });
        } else {
          mapReducer({
            type: MapActionType.UPLOAD_MAP,
            payload: {
              currentMap: null,
              errorMessage: response.data.errorMessage,
            },
          });
        }
      }
      async function reloadMaps(userName, title, fileFormat, mapContent, tags) {
        await asyncCreateMap(userName, title, fileFormat, mapContent, tags);
        await mapInfo.getAllUserMaps();
        navigate("/");
      }
      reloadMaps(user.userName, title, fileFormat, mapContent, tags);
    }
  };

  mapInfo.setCurrentMap = function (map) {
    console.log("setCurrentMap");
    console.log(map);

    mapReducer({
      type: MapActionType.SET_CURRENT_MAP,
      payload: map,
    });
  };

  // Update user map list & public map list
  mapInfo.updateMapList = async function(){
    await mapInfo.getAllUserMaps();
    store.getAllMaps();
  }

  mapInfo.deleteMapById = async function(mapId){
    const response = await api.deleteMapById(mapId);

    if(response.status === 200){
      mapInfo.updateMapList();
    }
    else{
      console.log(response);
    }
  }

  mapInfo.publishMapById = async function(mapId){
    try{
      const response = await api.publishMapById(mapId);
      if(response.status === 201){
        mapInfo.updateMapList();
      }
    }
    catch (error) {
      if (error.response) {
        console.log((error.response.status === 400) ? error.response.data.errorMessage : error.response.data);
      }
    }
  }

  mapInfo.unpublishMapById = async function(mapId){
    try{
      const response = await api.unpublishMapById(mapId);
      if(response.status === 201){
        mapInfo.updateMapList();
      }
    }
    catch (error) {
      if (error.response) {
        console.log((error.response.status === 400) ? error.response.data.errorMessage : error.response.data);
      }
    }
  }

  mapInfo.getAllUserMaps = async function() {
    try {
      console.log('mapInfo.getAllUserMaps');

      const response = await api.getAllUserMaps();
      if(response?.status === 200){
        const mapIds = response.data.maps;

        if(!mapIds){
          return;
        }

        const maps = await Promise.all(mapIds.map(mapId => mapInfo.getMapById(mapId)));
        mapReducer({
          type: MapActionType.LOAD_ALL_MAPS_FROM_USER,
          payload: maps.filter(map => map !== null),
        });
      }
    }
    catch (error) {
      console.error('Error fetching user maps:', error);
    }
  };

  mapInfo.getMapById = async function(mapId) {
    try{
      const response = await api.getMapById(mapId);
      console.log("real map object: ", response.data.map);

      mapReducer({
        type: MapActionType.SET_CURRENT_MAP,
        payload: response.data.map
      });
    }
    catch (error) {
      mapReducer({
        type: MapActionType.SET_ERROR_MSG,
        payload: (error.body?.errorMessage) ? error.body?.errorMessage : "Error fetching current map from database"
      });
    }
  }

  mapInfo.getAllPublishedMapsFromGivenUser = async function(userId){
    const response = await api.getAllPublishedMapsFromGivenUser(userId);
    if(response.status === 200){
      mapReducer({
        type: MapActionType.LOAD_ALL_MAPS_FROM_USER,
        payload: response.data.maps
      });
    }
    else{
      console.log(response);
    }
  }

  mapInfo.updateMapContent = function (index, color) {
    let oldMap = mapInfo.currentMap;
    oldMap.mapContent[index].properties.fillColor = color;
    setMapInfo((prevMapInfo) => ({
      ...prevMapInfo,
      currentMap: oldMap,
    }));
  };

  mapInfo.updateMapGeneralInfo = function (title, tags) {
    if (!mapInfo.currentMap) {
      return;
    }
    let oldMap = mapInfo.currentMap;
    if (title) {
      oldMap.title = title;
    }
    if (tags) {
      oldMap.tags = tags;
    }

    if (!title && !tags) {
      return;
    }
    setMapInfo((prevMapInfo) => ({
      ...prevMapInfo,
      currentMap: oldMap,
    }));
  };

  mapInfo.updateMapById = async function (mapId) {
    const response = await api.updateMapById(mapId, mapInfo.currentMap);
    if (response.status === 200) {
      await mapInfo.getAllUserMaps();
      navigate("/");
    } else {
      console.log(response);
    }
  };

  mapInfo.getAllCommentsFromPublishedMap = async function (mapId) {
    if (!mapInfo.currentMap || !mapId) {
      mapReducer({
        type: MapActionType.SET_ERROR_MSG,
        payload: "Map does not exist"
      });
      return;
    }
    
    try {
      const response = await api.getMapById(mapId);
      if(response?.status === 200){
        const map = response?.data.map;
        if(!map.isPublished){
          return setMapInfo({
            ...mapInfo,
            allCommentsForMap: [],
            errorMessage: "Map is not published"
          });
        }
        
        if(map.comments){
          const response = await api.getAllCommentsFromPublishedMap(mapId);
          if (response.status === 200) {
            return setMapInfo({
              ...mapInfo,
              allCommentsForMap: response.data.comments,
            });
          }
        }
      }
    }
    catch (error) {
      mapReducer({
        type: MapActionType.SET_ERROR_MSG,
        payload: (error.body?.errorMessage) ? error.body?.errorMessage : "Error fetching current map or its comments from database"
      });
      return;
    }
  };

  mapInfo.createMapComment = async function (mapId, commenterUserName, content){
    console.log("creating map comment...");
    console.log(mapId, commenterUserName, content);
    if (!mapId || !commenterUserName || !content){
      return setMapInfo({
        ...mapInfo,
        allCommentsForMap: [],
    });
    }
    const response = api.createMapComment(mapId, commenterUserName, content);
    mapInfo.getMapById(mapId);

    console.log(mapInfo.currentMap);
  }

  mapInfo.setCurrentComment = function (commentPayload) {
    mapReducer({
      type: MapActionType.SET_CURRENT_COMMENT,
      payload: commentPayload,
    });
  };

  mapInfo.deleteCommentById = async function (commentId) {
    console.log(`delete map comment by id: ${commentId}`);
  };

  return (
    <MapContext.Provider value={{ mapInfo }}>{children}</MapContext.Provider>
  );
}

export default MapContext;
