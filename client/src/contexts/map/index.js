import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import api from "./map-request-api";
import AuthContext from "../auth";
import GlobalStoreContext from "../store";

const MapContext = createContext();

export function MapContextProvider({ children }) {
  const { auth } = useContext(AuthContext);
  const { store } = useContext(GlobalStoreContext);

  const navigate = useNavigate();

  const [mapInfo, setMapInfo] = useState({
    currentMap: null,
    allMapsByUser: null,
    currentRegionColor: "#fff",
    allCommentsForMap: [],
    currentComment: null,
    errorMessage: null,
    // download: false,
    // downloadFormat: ''
  });

  const MapActionType = {
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
      case MapActionType.SET_CURRENT_MAP:
        console.log('set curr map')
        console.log(payload)
        return setMapInfo((prevMapInfo) => ({
          ...prevMapInfo,
          currentMap: payload,
          errorMessage: null
        }));
      case MapActionType.LOAD_ALL_MAPS_FROM_USER:
        return setMapInfo((prevMapInfo) => ({
          ...prevMapInfo,
          currentMap: payload.currMap,
          allMapsByUser: payload.allMaps,
          errorMessage: null
        }));
      case MapActionType.SET_CURRENT_REGION_COLOR:
        return setMapInfo((prevMapInfo) => ({
          ...prevMapInfo,
          currentRegionColor: payload,
          errorMessage: null
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

  mapInfo.createMap = async function (newMap) {
    const { title, fileFormat, mapContent, tags } = newMap;

    // if (!title || !fileFormat || !mapContent || !tags) {
    //   store.setError(
    //     "Please enter all fields: title/ fileFormat/ fileContent/ tags."
    //   );
    // }

    // create map for user
    const user = auth.user;
    if (user) {
      try{
        const response = await api.createMap(user.userName, title, fileFormat, mapContent, tags);
        if (response.status === 201) {
          console.log(response.data);
          mapReducer({
            type: MapActionType.SET_CURRENT_MAP,
            payload: response.data.map
          });
        }
      }
      catch (error) {
        store.setError((error.response?.data?.errorMessage) ? error.response?.data?.errorMessage : "Error creating a new map.");
      }
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
    try{
      console.log('updateMapList');
      console.log(auth.user.maps);
      await mapInfo.getMapsByMapIds(auth.user.maps);
      store.getAllMaps();
    }
    catch (error) {
      console.log(error)
      mapReducer({
        type: MapActionType.SET_ERROR_MSG,
        payload: (error.body?.errorMessage) ? error.body?.errorMessage : "Error fetching current map or its comments from database"
      });
    }
  }

  mapInfo.deleteMapById = async function(mapId){
    try{
      const response = await api.deleteMapById(mapId);

      if(response.status === 200){
        // show delete map alert first
        store.getAllMapsAfterDelete();

        const newMaps = auth.user?.maps?.filter((currMapId) => String(currMapId) !== String(mapId));
        console.log(newMaps)

        if(newMaps.length > 0){
          await mapInfo.getMapsByMapIds(newMaps);
          auth.userUpdateMaps(newMaps);
        }
        else{
          auth.userUpdateMaps([]);
          mapReducer({
            type: MapActionType.LOAD_ALL_MAPS_FROM_USER,
            payload: {
              currentMap: null,
              allMaps: []
            }
          });
        }
      }
    }
    catch (error) {
      console.log(error)
      mapReducer({
        type: MapActionType.SET_ERROR_MSG,
        payload: (error.body?.errorMessage) ? error.body?.errorMessage : "Error deleting current map from database"
      });
    }
  };

  mapInfo.publishMapById = async function (mapId) {
    try {
      const response = await api.publishMapById(mapId);
      if(response.status === 201){
        // close publish map modal & open publish success alert first
        store.closeModalAfterPublish();

        console.log('map published');
        console.log(response.data);
        await mapInfo.updateMapList();
      }
    } catch (error) {
      if (error.response) {
        console.log((error.response.status === 400) ? error.response.data.errorMessage : 'Unable to publish current map.');
      }
    }
  };

  mapInfo.unpublishMapById = async function (mapId) {
    try {
      const response = await api.unpublishMapById(mapId);
      if(response.status === 201){
        // close unpublish map modal & open unpublish success alert first
        store.closeModalAfterUnpublish();

        console.log('map unpublished');
        console.log(response.data);

        mapInfo.updateMapList();
      }
    } catch (error) {
      if (error.response) {
        console.log((error.response.status === 400) ? error.response.data.errorMessage : 'Unable to unpublish current map.');
      }
    }
  }

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

  mapInfo.getMapsByMapIds = async function (idList) {
    try{
      const response = await api.getMapsByMapIds(idList);
      if(response?.status === 200){
        // sometimes currentMap would get updated (publish/unpublish/delete)
        let currMap = null;
        const currMapId = (mapInfo.currentMap) ? mapInfo.currentMap._id : null;

        if(currMapId){
          currMap = response.data?.find((map) => map._id === currMapId);
        }
        mapReducer({
          type: MapActionType.LOAD_ALL_MAPS_FROM_USER,
          payload: {
            currentMap: currMap,
            allMaps: response.data
          }
        });
      }
    }
    catch (error) {
      mapReducer({
        type: MapActionType.SET_ERROR_MSG,
        payload: (error.body?.errorMessage) ? error.body?.errorMessage : "Error fetching user's maps from database"
      });
    }
  };

  mapInfo.getAllPublishedMapsFromGivenUser = async function(userId){
    const response = await api.getAllPublishedMapsFromGivenUser(userId);

    // should clear currentMap bec nothing is open
    if(response.status === 200){
      mapReducer({
        type: MapActionType.LOAD_ALL_MAPS_FROM_USER,
        payload: {
          currentMap: null,
          allMaps: response.data.maps
        }
      });
    } else {
      console.log(response);
    }
  };

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

  mapInfo.updateMapLikeDislike = async function (mapId, isLike) {
    try {
      const response = await api.likeDislikeMapById(mapId, isLike);
    } catch (error) {
      if (error.response) {
        console.log(
          error.response.status === 400
            ? error.response.data.errorMessage
            : error.response.data
        );
      }
    }
  };

  mapInfo.updateMapById = async function (mapId) {
    const response = await api.updateMapById(mapId, mapInfo.currentMap);
    if (response.status === 200) {
      await mapInfo.getMapsByMapIds(auth.user.maps);
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

  mapInfo.createMapComment = async function (
    mapId,
    commenterUserName,
    content
  ) {
    if (!mapId || !commenterUserName || !content) {
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
