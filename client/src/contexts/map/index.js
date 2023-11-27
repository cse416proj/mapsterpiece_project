import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import JSZip from "jszip";
import * as shapefile from "shapefile";

import api from "./map-request-api";
import AuthContext from "../auth";

const MapContext = createContext();

// define file extension
const fileExtension = {
  GeoJSON: "json",
  Shapefiles: "shp/dbf/zip",
  "Keyhole(KML)": "kml",
};

export function MapContextProvider({ children }) {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [mapInfo, setMapInfo] = useState({
    title: "",
    fileFormat: "",
    fileContent: "",
    currentMap: null,
    // fakeFileContent: fakeMapContent,
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

  // // TO BE DELETED
  // useEffect(() => {
  //     console.log(mapInfo);
  // }, [mapInfo]);

  // re-run effect when buffers change
  useEffect(() => {
    const shpBuffer = mapInfo.shpBuffer;
    const dbfBuffer = mapInfo.dbfBuffer;

    if (mapInfo.fileFormat === "Shapefiles" && shpBuffer && dbfBuffer) {
      let features = [];
      shapefile
        .open(shpBuffer, dbfBuffer)
        .then((source) =>
          source.read().then(function log(result) {
            if (result.done) {
              const geoJSON = {
                type: "FeatureCollection",
                features: features,
              };
              mapInfo.setFileContent(geoJSON);
              return;
            }
            features.push(result.value);
            return source.read().then(log);
          })
        )
        .catch((error) => console.error(error.stack));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapInfo.shpBuffer, mapInfo.dbfBuffer]);

  const ActionType = {
    SET_MAP_TITLE: "SET_MAP_TITLE",
    SET_MAP_TAGS: "SET_MAP_TAGS",
    SET_FILE_FORMAT: "SET_FILE_FORMAT",
    SET_FILE_CONTENT: "SET_FILE_CONTENT",
    SET_SHP_BUFFER: "SET_SHP_BUFFER",
    SET_DBF_BUFFER: "SET_DBF_BUFFER",
    UPLOAD_MAP: "UPLOAD_MAP",
    CLEAR: "CLEAR",
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
      case ActionType.CLEAR:
        return setMapInfo((prevMapInfo) => ({
          ...prevMapInfo,
          title: "",
          fileFormat: "",
          fileContent: "",
          tags: [],
          shpBuffer: null,
          dbfBuffer: null,
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

  // clear upload information
  mapInfo.clearUpload = () => {
    reducer({
      type: ActionType.CLEAR,
      payload: null,
    });
  };

  mapInfo.setCurrentRegionColor = (color) => {
    reducer({
      type: ActionType.SET_CURRENT_REGION_COLOR,
      payload: color,
    });
  };

  // validate file format
  const validateFileFormat = (fileCount, fileType, fileType2, fileTypeSet) => {
    const isNotZip = fileCount !== 2 && fileType !== "zip";
    const missingType = !fileExtension[mapInfo.fileFormat].includes(fileType2);
    const unmatchType = !fileExtension[mapInfo.fileFormat].includes(fileType);
    const invalidShapeFile =
      mapInfo.fileFormat === "Shapefiles" && (isNotZip || missingType);
    const incorrectSize = fileTypeSet.size !== 2;

    if (mapInfo.fileFormat) {
      if (invalidShapeFile || unmatchType || incorrectSize) {
        return false;
      }
      return true;
    }
    return false;
  };

  // for reading .kml & .geojson file
  const readDataAsText = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      mapInfo.setFileContent(reader.result);
    };
    reader.readAsText(file);
  };

  // for reading data in bytes (.shp & .dbf file)
  const readDataAsArrayBuffer = (file, stateHook) => {
    const reader = new FileReader();
    reader.onload = () => {
      stateHook(reader.result);
    };
    reader.readAsArrayBuffer(file);
  };

  // for reading shapefiles (.shp & .dbf file)
  const readDataFromShapeFiles = (shpFile, dbfFile) => {
    readDataAsArrayBuffer(shpFile, mapInfo.setShpBuffer);
    readDataAsArrayBuffer(dbfFile, mapInfo.setDbfBuffer);
  };

  // for reading .zip file containing diff file format (we only want .shp & .dbf)
  const readDataFromZipFile = (file) => {
    const reader = new FileReader();

    reader.onload = () => {
      const zipData = reader.result;
      const jszip = new JSZip();

      jszip.loadAsync(zipData).then((zip) => {
        zip.forEach((fileName, file) => {
          // ignore file that is not .shp/.dbf
          const fileType = fileName.split(".").pop();
          if (fileType !== "shp" && fileType !== "dbf") {
            return;
          }

          // Read file content by arraybuffer type
          file.async("arraybuffer").then((content) => {
            if (fileType === "shp") {
              mapInfo.setShpBuffer(content);
            } else {
              mapInfo.setDbfBuffer(content);
            }
          });
        });
      });
    };
    reader.readAsArrayBuffer(file);
  };

  // for processing input file
  mapInfo.processFile = (files) => {
    console.log(files);

    const fileCount = files.length;

    // only process non-empty file that matches selected file extension
    if (files[0] && mapInfo.fileFormat) {
      const fileType = files[0].name.split(".").pop();
      const fileType2 = fileCount === 2 ? files[1].name.split(".").pop() : "";
      const fileTypeSet = new Set([fileType, fileType2]);

      // if invalidate file format, display error
      if (!validateFileFormat(fileCount, fileType, fileType2, fileTypeSet)) {
        return false;
      }

      if (mapInfo.fileFormat === "GeoJSON") {
        console.log(files[0]);
        readDataAsText(files[0]);
      } else if (mapInfo.fileFormat === "Shapefiles") {
        if (fileType === "shp" || fileType === "dbf") {
          var shpFile = fileType === "shp" ? files[0] : files[1];
          var dbfFile = fileType === "dbf" ? files[0] : files[1];
          readDataFromShapeFiles(shpFile, dbfFile);
        } else if (fileType === "zip") {
          readDataFromZipFile(files[0]);
        }
      } else if (mapInfo.fileFormat === "Keyhole(KML)") {
        readDataAsText(files[0]);
      }
      return true;
    }
    return false;
  };

  mapInfo.createMap = (title, fileFormat, tags) => {
    // shapefile by default
    let mapContent = mapInfo.fileContent;

    if (mapInfo.fileFormat === "GeoJSON") {
      mapContent = JSON.parse(mapInfo.fileContent);
    } else if (mapInfo.fileFormat === "Keyhole(KML)") {
      mapContent = new DOMParser().parseFromString(
        mapInfo.fileContent,
        "text/xml"
      );
    }

    const dummyContent = {
      type: "FeatureCollection",
      features: [],
    };

    // create map for user
    const user = auth.user;
    if (user) {
      async function asyncCreateMap(
        userName,
        title,
        fileFormat,
        mapContent,
        tags
      ) {
        const response = await api.createMap(
          userName,
          title,
          fileFormat,
          mapContent,
          tags
        );
        console.log(response);
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

  mapInfo.deleteMapById = async function (mapId) {
    console.log("delete map by id:");
    console.log(mapId);

    const response = await api.deleteMapById(mapId);

    if (response.status === 200) {
      await mapInfo.getAllUserMaps();
      navigate("/");
    } else {
      console.log(response);
    }
  };

  mapInfo.publishMapById = async function (mapId) {
    console.log("publish map by id:");
    console.log(mapId);

    try {
      const response = await api.publishMapById(mapId);

      if (response.status === 201) {
          await mapInfo.getAllUserMaps();
          setMapInfo({
              ...mapInfo,
              allCommentsForMap: [],
              map: null,
          });
          navigate("/");
      } else {
          console.log(response);
      }
    } catch (error) {
      console.error("Error publishing map:", error);
    }
  };

  mapInfo.unpublishMapById = async function (mapId) {
    console.log("unpublish map by id:");
    console.log(mapId);

    try {
      const response = await api.unpublishMapById(mapId);

      if (response.status === 201) {
          await mapInfo.getAllUserMaps();

          navigate("/");
          setMapInfo({
              ...mapInfo,
              allCommentsForMap: [],
              map: null,
          });
      } else {
          console.log(response);
      }
    } catch (error) {
      console.error("Error unpublishing map:", error);
    }
  };

  // mapInfo.cancelDownload = () => {
  //     reducer({
  //         type: ActionType.CANCEL_DOWNLOAD,
  //         payload: null
  //     })
  // }

  // mapInfo.setDownloadFormat = (downloadFormat) => {
  //     reducer({
  //         type: ActionType.SET_DOWNLOAD_FORMAT,
  //         payload: downloadFormat
  //     })
  // }

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

  mapInfo.getAllPublishedMapsFromGivenUser = async function (userId) {
    const response = await api.getAllPublishedMapsFromGivenUser(userId);
    console.log(response);

    if (response.status === 200) {
      reducer({
        type: ActionType.LOAD_ALL_MAPS_FROM_USER,
        payload: response.data.maps,
      });
    } else {
      console.log(response);
    }
  };

  mapInfo.getAllCommentsFromPublishedMap = async function (mapId) {
    try {
        if (mapId === undefined || mapInfo.map === null || mapId === null) {
            return setMapInfo({
                ...mapInfo,
                allCommentsForMap: [],
            });
        }
        console.log("mapId 560", mapId);
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

        if (response.status === 200) {
            return setMapInfo({
                ...mapInfo,
                allCommentsForMap: response?.data?.comments,
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

    console.log(mapInfo.map.map);
}
  return (
    <MapContext.Provider value={{ mapInfo }}>{children}</MapContext.Provider>
  );
}

export default MapContext;
