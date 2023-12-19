import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import api from "./map-request-api";
import AuthContext from "../auth";
import GlobalStoreContext from "../store";
const MapContext = createContext({});

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
    currentMapEditType: "",
    colorPickerChanged: false,
    dataColor: null
    // download: false,
    // downloadFormat: ''
  });

  const curMapEditType = {
    REGULAR: "",
    HEATMAP: "HEATMAP",
    CHOROPLETH: "CHOROPLETH",
    DOT_DISTRIBUTION: "DOT_DISTRIBUTION",
    GRADUATED_SYMBOL: "GRADUATED_SYMBOL",
    PINMAP: "PINMAP",
  }

  const MapActionType = {
    SET_CURRENT_MAP: "SET_CURRENT_MAP",
    SET_ALL_MAPS_FROM_USER: "SET_ALL_MAPS_FROM_USER",
    LOAD_ALL_MAPS_FROM_USER: "LOAD_ALL_MAPS_FROM_USER",
    SET_CURRENT_REGION_COLOR: "SET_CURRENT_REGION_COLOR",
    SET_CURRENT_COMMENT: "SET_CURRENT_COMMENT",
    SET_CURRENT_SUBCOMMENT: "SET_CURRENT_SUBCOMMENT",
    SET_ERROR_MSG: "SET_ERROR_MSG",
    SET_CURRENT_MAP_EDIT_TYPE: "SET_CURRENT_MAP_EDIT_TYPE",
    SET_DATA_COLOR: "SET_DATA_COLOR",
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
      case MapActionType.SET_ALL_MAPS_FROM_USER:
        return setMapInfo((prevMapInfo) => ({
          ...prevMapInfo,
          allMapsByUser: payload,
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
          colorPickerChanged: true,
          errorMessage: null
        }));
      case MapActionType.SET_CURRENT_COMMENT:
        return setMapInfo((prevMapInfo) => ({
          ...prevMapInfo,
          currentComment: payload,
        }));
      case MapActionType.SET_CURRENT_SUBCOMMENT:
        return setMapInfo({
          ...mapInfo,
          currentMap: mapInfo.currentMap,
          currentCommentIndex: payload.comment,
        });
      case MapActionType.SET_ERROR_MSG:
        return setMapInfo((prevMapInfo) => ({
          ...prevMapInfo,
          errorMessage: payload
        }));
      case MapActionType.SET_CURRENT_MAP_EDIT_TYPE:
        return setMapInfo((prevMapInfo) => ({
          ...prevMapInfo,
          currentMapEditType: payload
        }));
      case MapActionType.SET_DATA_COLOR:
        console.log(`setDataColor: ${payload}`);
        return setMapInfo((prevMapInfo) => ({
          ...prevMapInfo,
          dataColor: payload
        }));
      default:
        return mapInfo;
    }
  };

  mapInfo.setCurrentRegionColor = function (color) {
    mapReducer({
      type: MapActionType.SET_CURRENT_REGION_COLOR,
      payload: color,
    });
  };

  mapInfo.setDataColor = function (color) {
    mapReducer({
      type: MapActionType.SET_DATA_COLOR,
      payload: color,
    });
  };

  mapInfo.setCurrentMapEditType = function (mapTypeForEdit) {
    mapReducer({
      type: MapActionType.SET_CURRENT_MAP_EDIT_TYPE,
      payload: mapTypeForEdit,
    });
  };

  mapInfo.createMap = async function (newMap) {
    const { title, fileFormat, mapType, mapContent, tags } = newMap;

    // create map for user
    const user = auth.user;
    if (user) {
      try{
        const response = await api.createMap(user.userName, title, fileFormat, mapType, mapContent, tags);
        if (response.status === 201) {
          // close error modal & open create success alert first
          store.createSuccessAlert();
          console.log(response.data);

          // update user array
          const newMap = response.data.map;
          if(!user.maps.includes(newMap._id)){
            const newMaps = [...user.maps, newMap._id];
            auth.userUpdateMaps(newMaps);
          }
          console.log(user);
          mapReducer({
            type: MapActionType.SET_CURRENT_MAP,
            payload: newMap
          });
        }
      }
      catch (error) {
        console.log((error.response?.data?.errorMessage) ? error.response?.data?.errorMessage : "Error creating a new map.");
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
      const newMap = {...mapInfo.currentMap};
      
      if(mapInfo.currentMapEditType){
        newMap.mapType = mapInfo.currentMapEditType;
      }
      if(mapInfo.dataColor){
        newMap.mapTypeData.dataColor = mapInfo.dataColor;
      }

      console.log(newMap);

      const response = await api.publishMapById(mapId, newMap);
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
    console.log('mapInfo.getMapsByMapIds');
    try{
      const response = await api.getMapsByMapIds(idList);
      if(response?.status === 200){
        // sometimes currentMap would get updated (publish/unpublish/delete)
        let currMap = null;
        const currMapId = (mapInfo.currentMap) ? mapInfo.currentMap._id : null;

        console.log(mapInfo.currentMap);

        if(currMapId){
          currMap = response.data?.find((map) => (map._id === currMapId));
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

  mapInfo.updateMapGeneralInfo = function (title, tags, legendTitle) {
    if (!mapInfo.currentMap) {
      return;
    }

    if(!title && !tags) {
      return;
    }

    let updatedMap = mapInfo.currentMap;

    updatedMap.title = (title) ? title : updatedMap.title;
    updatedMap.tags = (tags) ? tags : updatedMap.tags;

    if(updatedMap.mapTypeData){
      updatedMap.mapTypeData.legendTitle = (legendTitle) ? legendTitle : updatedMap.mapTypeData.legendTitle;
    }

    setMapInfo((prevMapInfo) => ({
      ...prevMapInfo,
      currentMap: updatedMap,
    }));
  };

  mapInfo.updateMapTypeData = function (mapDataIndividualObj, indexElementTobeChanged) {
    try{
      if (!mapInfo.currentMap) {
        return;
      }

      let oldMap = mapInfo.currentMap;
      let originalMapTypeData = oldMap.mapTypeData ? oldMap.mapTypeData : {max: 0, data: []};
      if (indexElementTobeChanged >= 0) {
        originalMapTypeData.data[indexElementTobeChanged] = mapDataIndividualObj;
      } else {
        originalMapTypeData.data.push(mapDataIndividualObj);
      }

      // reset max
      originalMapTypeData.max = Math.max(...originalMapTypeData.data.map((data) => data.value));
      
      oldMap.mapTypeData = originalMapTypeData;
      setMapInfo((prevMapInfo) => ({
        ...prevMapInfo,
        currentMap: oldMap,
      }));
    }
    catch(error){
      console.log((error.response?.data?.errorMessage) ? error.response?.data?.errorMessage : "Error updating map type data.");
    }
  };

  mapInfo.updateDataColor = function (color) {
    if (!mapInfo.currentMap) {
      return;
    }
    let oldMap = mapInfo.currentMap;
    oldMap.mapTypeData.dataColor = color;
    setMapInfo((prevMapInfo) => ({
      ...prevMapInfo,
      currentMap: oldMap,
    }));
  };

  mapInfo.deleteMapTypeData = function (regionName) {
    if (!mapInfo.currentMap) {
      return;
    }
    let oldMap = mapInfo.currentMap;
    let originalMapTypeData = oldMap.mapTypeData;
    originalMapTypeData.data = originalMapTypeData.data.filter((data) => data.regionName !== regionName);
    // reset max
    originalMapTypeData.max = Math.max(...originalMapTypeData.data.map((data) => data.value));
    if (originalMapTypeData.max === -Infinity) {
      originalMapTypeData.max = 0;
    }
    oldMap.mapTypeData = originalMapTypeData;
    setMapInfo((prevMapInfo) => ({
      ...prevMapInfo,
      currentMap: oldMap,
    }));
  }

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
    try {
      if(mapInfo.currentMap){
        const newMap = {...mapInfo.currentMap};

        if(mapInfo.currentMapEditType){
          newMap.mapType = mapInfo.currentMapEditType;
        }
        if(mapInfo.dataColor){
          newMap.mapTypeData.dataColor = mapInfo.dataColor;
        }
        const response = await api.updateMapById(mapId, newMap);
        if (response.status === 200) {
          store.saveSuccessAlert();
          await mapInfo.getMapsByMapIds(auth.user.maps);
          // navigate("/");
        }
      }
    }
    catch (error) {
      console.log(error.response?.data?.errorMessage ? error.response?.data?.errorMessage : "Error updating map.")
      store.setError((error.response?.data?.errorMessage) ? error.response?.data?.errorMessage : "Error updating map.");
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
    }
  };

  mapInfo.createMapComment = async function (mapId, commenterUserName, content) {
    if (!mapId || !commenterUserName || !content) {
      return setMapInfo({
        ...mapInfo,
        allCommentsForMap: [],
      });
    }
    try{
      const response = await api.createMapComment(mapId, commenterUserName, content);
      if(response.status === 201){
        console.log('create comment success');
        mapInfo.getMapById(mapId);
      }
    }
    catch(error){
      mapReducer({
        type: MapActionType.SET_ERROR_MSG,
        payload: (error.body?.errorMessage) ? error.body?.errorMessage : "Error creating comment for current map"
      });
    }
  }

  mapInfo.setCurrentComment = function (commentPayload) {
    mapReducer({
      type: MapActionType.SET_CURRENT_COMMENT,
      payload: commentPayload,
    });
  };

  mapInfo.setCurrentSubcomment = function(commentPayload, subcommentPayload) {
    console.log("Setting subcomment: ", commentPayload, subcommentPayload)
    mapReducer({
      type: MapActionType.SET_CURRENT_SUBCOMMENT,
      payload: {
        comment: commentPayload,
        subcomment: subcommentPayload
      },
    });
  };

  mapInfo.deleteCommentById = async function (commentId) {
    console.log(`delete map comment by id: ${commentId}`);

    try{
      const response = await api.deleteCommentById(commentId);
      console.log(response);
      if(response?.status === 200){
        console.log('delete comment success');
        await mapInfo.getMapById(mapInfo.currentMap._id);
      }
    }
    catch(error){
      console.log(error);
      mapReducer({
        type: MapActionType.SET_ERROR_MSG,
        payload: (error.body?.errorMessage) ? error.body?.errorMessage : "Error deleting comment for current map"
      });
    }
  };

  mapInfo.createSubcomment = async function (commentId, commenterUserName, content) {
    try{
      const response = await api.createSubcomment(commentId, commenterUserName,content);
      if(response?.status === 201){
        await mapInfo.getMapById(mapInfo.currentMap._id);
      }
    }
    catch(error){
      console.log(error);
      mapReducer({
        type: MapActionType.SET_ERROR_MSG,
        payload: (error.body?.errorMessage) ? error.body?.errorMessage : "Error creating subcomment for current map"
      });
    }
  };

  mapInfo.deleteSubCommentById = async function (subId){
    try{
      console.log('deleteSubCommentById');
      const response = await api.deleteSubCommentById(subId);
      console.log(response);
      if(response.status === 200){
        await mapInfo.getMapById(mapInfo.currentMap._id);
      }
    }
    catch(error){
      console.log(error);
      mapReducer({
        type: MapActionType.SET_ERROR_MSG,
        payload: (error.body?.errorMessage) ? error.body?.errorMessage : "Error deleting subcomment for current map"
      });
    }
  };

  mapInfo.setAllMaps = function(maps){
    mapReducer({
      type: MapActionType.SET_ALL_MAPS_FROM_USER,
      payload: maps
    });
  }

  mapInfo.setErrorMsg = function(msg){
    mapReducer({
      type: MapActionType.SET_ERROR_MSG,
      payload: msg
    });
  }

  mapInfo.duplicateMapById = async function (mapId, title){
    console.log("forking/duplicating this map: ", mapId);
    if(!mapId){
      console.log("no map Id");
      return;
    }

    try{
      const response = await api.duplicateMapById(mapId, title);

      if(response.status === 201){
        const newMap = response?.data?.map._id;
        const newMaps = [...auth.user.maps,newMap];

        store.markDuplicatedMap(response?.data?.map);
        store.closeModalAfterDuplicate();

        if(newMaps.length > 0){
          await mapInfo.getMapsByMapIds(newMaps); 
          await auth.userUpdateMaps(newMaps);
        } 
        else {
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
    }catch(error){
      if (error.response) {
        console.log((error.response.status === 400) ? error.response.data.errorMessage : 'Unable to duplicate current map.');
      }
    }
  };

  mapInfo.clearInfo = function(){
    setMapInfo({
      currentMap: null,
      allMapsByUser: null,
      currentRegionColor: "#fff",
      allCommentsForMap: [],
      currentComment: null,
      errorMessage: null,
      currentMapEditType: "",
      colorPickerChanged: false,
      dataColor: null
    });
  }

  return (
    <MapContext.Provider value={{ mapInfo }}>{children}</MapContext.Provider>
  );
}

export default MapContext;
