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
    title: "",
    fileFormat: "",
    fileContent: "",
    currentMap: null,
    tags: [],
    shpBuffer: null,
    dbfBuffer: null,
    map: null,
    errorMessage: "",
    allMapsByUser: null,
    currentRegionColor: "#fff",
    allCommentsForMap: [],
    // download: false,
    // downloadFormat: ''
  });

  const ActionType = {
    SET_MAP_TITLE: "SET_MAP_TITLE",
    SET_MAP_TAGS: "SET_MAP_TAGS",
    SET_FILE_FORMAT: "SET_FILE_FORMAT",
    SET_FILE_CONTENT: "SET_FILE_CONTENT",
    SET_SHP_BUFFER: "SET_SHP_BUFFER",
    SET_DBF_BUFFER: "SET_DBF_BUFFER",
    UPLOAD_MAP: "UPLOAD_MAP",
    SET_CURRENT_MAP: "SET_CURRENT_MAP",
    LOAD_ALL_MAPS_FROM_USER: "LOAD_ALL_MAPS_FROM_USER",
    SET_CURRENT_REGION_COLOR: "SET_CURRENT_REGION_COLOR",
    // SET_DOWNLOAD_FORMAT: 'SET_DOWNLOAD_FORMAT',
    // CANCEL_DOWNLOAD: 'CANCEL_DOWNLOAD',
  };

  const reducer = (action) => {
    const { type, payload } = action;
    // console.log(payload);
    switch (type) {
      case ActionType.SET_MAP_TITLE:
        return setMapInfo((prevMapInfo) => ({
          ...prevMapInfo,
          title: payload,
        }));
      case ActionType.SET_MAP_TAGS:
        return setMapInfo((prevMapInfo) => ({
          ...prevMapInfo,
          tags: payload,
        }));
      case ActionType.SET_FILE_FORMAT:
        return setMapInfo((prevMapInfo) => ({
          ...prevMapInfo,
          fileFormat: payload,
        }));
      case ActionType.SET_FILE_CONTENT:
        return setMapInfo((prevMapInfo) => ({
          ...prevMapInfo,
          fileContent: payload,
        }));
      case ActionType.SET_SHP_BUFFER:
        return setMapInfo((prevMapInfo) => ({
          ...prevMapInfo,
          shpBuffer: payload,
        }));
      case ActionType.SET_DBF_BUFFER:
        return setMapInfo((prevMapInfo) => ({
          ...prevMapInfo,
          dbfBuffer: payload,
        }));
      case ActionType.UPLOAD_MAP:
        return setMapInfo((prevMapInfo) => ({
          ...prevMapInfo,
          // title: '',
          // fileFormat: '',
          // fileContent: '',
          // tags: [],
          // shpBuffer: null,
          // dbfBuffer: null,
          map: payload,
        }));
      case ActionType.SET_CURRENT_MAP:
        return setMapInfo((prevMapInfo) => ({
          ...prevMapInfo,
          currentMap: payload,
        }));
      // case ActionType.SET_DOWNLOAD_FORMAT:
      //     return setMapInfo((prevMapInfo) => ({
      //         ...prevMapInfo,
      //         download: true,
      //         downloadFormat: payload
      //     }));
      // case ActionType.CANCEL_DOWNLOAD:
      //     return setMapInfo((prevMapInfo) => ({
      //         ...prevMapInfo,
      //         download: false,
      //         downloadFormat: ''
      //     }));
      case ActionType.LOAD_ALL_MAPS_FROM_USER:
        return setMapInfo((prevMapInfo) => ({
          ...prevMapInfo,
          allMapsByUser: payload,
        }));
      case ActionType.SET_CURRENT_REGION_COLOR:
        return setMapInfo((prevMapInfo) => ({
          ...prevMapInfo,
          currentRegionColor: payload,
        }));
      default:
        return mapInfo;
    }
  };

  // set title for mapInfo
  mapInfo.setTitle = (title) => {
    reducer({
      type: ActionType.SET_MAP_TITLE,
      payload: title,
    });
  };

  // set fileFormat(shp/geojson/kml) for mapInfo
  mapInfo.setFileFormat = (fileFormat) => {
    reducer({
      type: ActionType.SET_FILE_FORMAT,
      payload: fileFormat,
    });
  };

  // set tags for mapInfo
  mapInfo.setTags = (tags) => {
    reducer({
      type: ActionType.SET_MAP_TAGS,
      payload: tags,
    });
  };

  // set read fileContent
  mapInfo.setFileContent = (fileContent) => {
    reducer({
      type: ActionType.SET_FILE_CONTENT,
      payload: fileContent,
    });
  };

  // set shapefile buffer
  mapInfo.setShpBuffer = (shpBuffer) => {
    reducer({
      type: ActionType.SET_SHP_BUFFER,
      payload: shpBuffer,
    });
  };

  // set database file buffer
  mapInfo.setDbfBuffer = (dbfBuffer) => {
    reducer({
      type: ActionType.SET_DBF_BUFFER,
      payload: dbfBuffer,
    });
  };

  mapInfo.setCurrentRegionColor = (color) => {
    reducer({
      type: ActionType.SET_CURRENT_REGION_COLOR,
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
          reducer({
            type: ActionType.UPLOAD_MAP,
            payload: {
              map: mapContent,
            },
          });
        } else {
          reducer({
            type: ActionType.UPLOAD_MAP,
            payload: {
              map: null,
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

    reducer({
      type: ActionType.SET_CURRENT_MAP,
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
    const response = await api.publishMapById(mapId);

    if(response.status === 201){
      mapInfo.updateMapList();
    }
    else{
      console.log(response);
    }
  }

  mapInfo.unpublishMapById = async function(mapId){
    const response = await api.unpublishMapById(mapId);

    if(response.status === 201){
      mapInfo.updateMapList();
    }
    else{
      console.log(response);
    }
  }

  mapInfo.getAllUserMaps = async function() {
    try {
      console.log('mapInfo.getAllUserMaps');

      const response = await api.getAllUserMaps();
      const mapIds = response.data.maps;

      const maps = await Promise.all(mapIds.map(mapId => mapInfo.getMapById(mapId)));
      reducer({
        type: ActionType.LOAD_ALL_MAPS_FROM_USER,
        payload: maps.filter(map => map !== null),
      });
    }
    catch (error) {
      console.error('Error fetching user maps:', error);
    }
  };

  mapInfo.getMapById = async function(mapId) {
    const response = await api.getMapById(mapId);
    console.log("real map object: ", response.data.map);
    setMapInfo( (prevMapInfo) => ({
      ...prevMapInfo,
      map: response.data,
      })
    );
    return response.data.map;
  }

  mapInfo.getAllPublishedMapsFromGivenUser = async function(userId){
    const response = await api.getAllPublishedMapsFromGivenUser(userId);
    if(response.status === 200){
      reducer({
        type: ActionType.LOAD_ALL_MAPS_FROM_USER,
        payload: response.data.maps
      });
    }
    else{
      console.log(response);
    }
  }

  mapInfo.getAllUserMaps = async function () {
    try {
      const response = await api.getAllUserMaps();
      reducer({
        type: ActionType.LOAD_ALL_MAPS_FROM_USER,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error fetching user maps:", error);
    }
  };

  mapInfo.getMapById = async function (mapId) {
    const response = await api.getMapById(mapId);
    console.log("real map object: ", response.data.map);
    setMapInfo((prevMapInfo) => ({
      ...prevMapInfo,
      map: response.data.map,
    }));
    return response.data.map;
  };

  mapInfo.updateMapContent = function (index, color) {
    let oldMap = mapInfo.currentMap;
    oldMap.mapContent[index].properties.fillColor = color;
    setMapInfo((prevMapInfo) => ({
      ...prevMapInfo,
      map: oldMap,
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
      map: oldMap,
    }));
  };

  mapInfo.updateMapById = async function (mapId) {
    const response = await api.updateMapById(mapId, mapInfo.map);
    if (response.status === 200) {
      await mapInfo.getAllUserMaps();
      navigate("/");
    } else {
      console.log(response);
    }
  };

  // mapInfo.cancelDownload = () => {
  //       reducer({
  //           type: ActionType.CANCEL_DOWNLOAD,
  //           payload: null
  //       })
  //   }

  //   mapInfo.setDownloadFormat = (downloadFormat) => {
  //       reducer({
  //           type: ActionType.SET_DOWNLOAD_FORMAT,
  //           payload: downloadFormat
  //       })
  //   }


  mapInfo.getAllCommentsFromPublishedMap = async function (mapId) {
    try {
        if (mapId === undefined || mapInfo.map === null || mapId === null) {
            return setMapInfo({
                ...mapInfo,
                allCommentsForMap: [],
            });
        }
        // console.log("mapId 580", mapId);
        // console.log(mapInfo.map);

        const map = await api.getMapById(mapId);
        console.log("map by id 563",map.data.map.isPublished);
        if(!map.data.map.isPublished){
            return setMapInfo({
                ...mapInfo,
                allCommentsForMap: [],
            });
        }

        const response = await api.getAllCommentsFromPublishedMap(mapId);
        console.log("response 593: ", response);

        if (response.status === 200) {
            return setMapInfo({
                ...mapInfo,
                allCommentsForMap: response.data.comments,
            });
        } else {
            console.error("Unexpected response:", response);
        }
    } catch (error) {
        console.error("Error fetching comments:", error);
    }
  };

  mapInfo.createMapComment = async function (mapId, commenterUserName, content){
    console.log("creating map comment...");
    console.log(mapId, commenterUserName, content);
    const response = api.createMapComment(mapId, commenterUserName, content);
    mapInfo.getMapById(mapId);

    console.log(mapInfo.map);
}
  return (
    <MapContext.Provider value={{ mapInfo }}>{children}</MapContext.Provider>
  );
}

export default MapContext;
