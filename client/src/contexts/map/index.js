import { createContext, useState, useEffect } from 'react';

import JSZip from 'jszip';
import * as shapefile from 'shapefile';

const MapContext = createContext();

// define file extension
const fileExtension = {
    GeoJSON: 'json',
    Shapefiles: 'shp/dbf/zip',
    'Keyhole(KML)': 'kml',
};

export function MapContextProvider({children}){
    const [mapInfo, setMapInfo] = useState({
        title: '',
        fileFormat: '',
        fileContent: '',
        tags: [],
        shpBuffer: null,
        dbfBuffer: null,
        map: null,
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

        if(shpBuffer && dbfBuffer) {
            let features = [];
            shapefile.open(shpBuffer, dbfBuffer).then((source) =>
                source.read().then(function log(result) {
                    if (result.done) {
                        const geoJSON = {
                            type: 'FeatureCollection',
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
    }, [mapInfo.shpBuffer, mapInfo.dbfBuffer]);

    const ActionType = {
        SET_MAP_TITLE: 'SET_MAP_TITLE',
        SET_MAP_TAGS: 'SET_MAP_TAGS',
        SET_FILE_FORMAT: 'SET_FILE_FORMAT',
        SET_FILE_CONTENT: 'SET_FILE_CONTENT',
        SET_SHP_BUFFER: 'SET_SHP_BUFFER',
        SET_DBF_BUFFER: 'SET_DBF_BUFFER',
        UPLOAD_MAP: 'UPLOAD_MAP',
        CLEAR: 'CLEAR',
        // SET_DOWNLOAD_FORMAT: 'SET_DOWNLOAD_FORMAT',
        // CANCEL_DOWNLOAD: 'CANCEL_DOWNLOAD',
    }

    const reducer = (action) => {
        const { type, payload } = action;

        switch(type){
            case ActionType.SET_MAP_TITLE:
                return setMapInfo((prevMapInfo) => ({
                    ...prevMapInfo,
                    title: payload
                }));
            case ActionType.SET_MAP_TAGS:
                return setMapInfo((prevMapInfo) => ({
                    ...prevMapInfo,
                    tags: payload
                }));
            case ActionType.SET_FILE_FORMAT:
                return setMapInfo((prevMapInfo) => ({
                    ...prevMapInfo,
                    fileFormat: payload
                }));
            case ActionType.SET_FILE_CONTENT:
                return setMapInfo((prevMapInfo) => ({
                    ...prevMapInfo,
                    fileContent: payload
                }));
            case ActionType.SET_SHP_BUFFER:
                return setMapInfo((prevMapInfo) => ({
                    ...prevMapInfo,
                    shpBuffer: payload
                }));
            case ActionType.SET_DBF_BUFFER:
                return setMapInfo((prevMapInfo) => ({
                    ...prevMapInfo,
                    dbfBuffer: payload
                }));
            case ActionType.UPLOAD_MAP:
                return setMapInfo((prevMapInfo) => ({
                    ...prevMapInfo,
                    title: '',
                    fileFormat: '',
                    fileContent: '',
                    tags: [],
                    shpBuffer: null,
                    dbfBuffer: null,
                    map: payload
                }));
            case ActionType.CLEAR:
                return setMapInfo((prevMapInfo) => ({
                    ...prevMapInfo,
                    title: '',
                    fileFormat: '',
                    fileContent: '',
                    tags: [],
                    shpBuffer: null,
                    dbfBuffer: null,
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
            default:
                return mapInfo;
        }
    }

    // set title for mapInfo
    mapInfo.setTitle = (title) => {
        reducer({
            type: ActionType.SET_MAP_TITLE,
            payload: title
        })
    }

    // set fileFormat(shp/geojson/kml) for mapInfo
    mapInfo.setFileFormat = (fileFormat) => {
        reducer({
            type: ActionType.SET_FILE_FORMAT,
            payload: fileFormat
        })
    }

    // set tags for mapInfo
    mapInfo.setTags = (tags) => {
        reducer({
            type: ActionType.SET_MAP_TAGS,
            payload: tags
        })
    }

    // set read fileContent
    mapInfo.setFileContent = (fileContent) => {
        reducer({
            type: ActionType.SET_FILE_CONTENT,
            payload: fileContent
        })
    }

    // set shapefile buffer
    mapInfo.setShpBuffer = (shpBuffer) => {
        reducer({
            type: ActionType.SET_SHP_BUFFER,
            payload: shpBuffer
        })
    }

    // set database file buffer
    mapInfo.setDbfBuffer = (dbfBuffer) => {
        reducer({
            type: ActionType.SET_DBF_BUFFER,
            payload: dbfBuffer
        })
    }

    // clear upload information
    mapInfo.clearUpload = () => {
        reducer({
            type: ActionType.CLEAR,
            payload: null
        })
    }

    mapInfo.validateUpload = () => {

    }

    // validate file format
    const validateFileFormat = (fileCount, fileType, fileType2, fileTypeSet) => {
        const isNotZip = fileCount !== 2 && fileType !== "zip";
        const missingType = !fileExtension[mapInfo.fileFormat].includes(fileType2);
        const unmatchType = !fileExtension[mapInfo.fileFormat].includes(fileType);
        const invalidShapeFile = (mapInfo.fileFormat === "Shapefiles") && (isNotZip || missingType);
        const incorrectSize = fileTypeSet.size !== 2;
        
        if(mapInfo.fileFormat){
            if(invalidShapeFile || unmatchType || incorrectSize){
                return false;
            }
            return true;
        }
        return false;
    }

    // for reading .kml & .geojson file
    const readDataAsText = (file) => {
        const reader = new FileReader();
        reader.onload = () => {
            mapInfo.setFileContent(reader.result);
        };
        reader.readAsText(file);
    }

    // for reading data in bytes (.shp & .dbf file)
    const readDataAsArrayBuffer = (file, stateHook) => {
        const reader = new FileReader();
        reader.onload = () => {
            stateHook(reader.result);
        };
        reader.readAsArrayBuffer(file);
    }

    // for reading shapefiles (.shp & .dbf file)
    const readDataFromShapeFiles = (shpFile, dbfFile) => {
        readDataAsArrayBuffer(shpFile, mapInfo.setShpBuffer);
        readDataAsArrayBuffer(dbfFile, mapInfo.setDbfBuffer);
    }

    // for reading .zip file containing diff file format (we only want .shp & .dbf)
    const readDataFromZipFile = (file) => {
        const reader = new FileReader();

        reader.onload = () => {
            const zipData = reader.result;
            const jszip = new JSZip();

            jszip.loadAsync(zipData).then((zip) => {
                zip.forEach((fileName, file) => {
                    // ignore file that is not .shp/.dbf
                    const fileType = fileName.split('.').pop();
                    if (fileType !== 'shp' && fileType !== 'dbf') {
                        return;
                    }

                    // Read file content by arraybuffer type
                    file.async('arraybuffer').then((content) => {
                        if(fileType === 'shp'){
                            mapInfo.setShpBuffer(content);
                        }
                        else{
                            mapInfo.setDbfBuffer(content);
                        }
                    });
                });
            });
        };
        reader.readAsArrayBuffer(file);
    }

    // for processing input file
    mapInfo.processFile = (files) => {
        const fileCount = files.length;
       
        // only process non-empty file that matches selected file extension
        if(files[0] && mapInfo.fileFormat) {
            const fileType = files[0].name.split('.').pop();
            const fileType2 = (fileCount === 2) ? files[1].name.split('.').pop() : '';
            const fileTypeSet = new Set([fileType, fileType2]);

            // if invalidate file format, display error
            if(!validateFileFormat(fileCount, fileType, fileType2, fileTypeSet)){
                return false;
            } 

            if(mapInfo.fileFormat === 'GeoJSON'){
                readDataAsText(files[0]);
            }
            else if(mapInfo.fileFormat === 'Shapefiles'){
                if(fileType === 'shp' || fileType === 'dbf'){
                    var shpFile = (fileType === 'shp') ? files[0] : files[1];
                    var dbfFile = (fileType === 'dbf') ? files[0] : files[1];
                    readDataFromShapeFiles(shpFile, dbfFile);
                }
                else if(fileType === 'zip'){
                    readDataFromZipFile(files[0]);
                }
            }
            else if (mapInfo.fileFormat === 'Keyhole(KML)') {
                readDataAsText(files[0]);
            }
            return true;
        }
        return false;
    }

    // set fileFormat(shp/geojson/kml) for mapInfo
    mapInfo.uploadMap = (map) => {
        reducer({
            type: ActionType.UPLOAD_MAP,
            payload: map
        })
    }

    // create map based on fileFormat & content
    mapInfo.createMap = () => {
        if(mapInfo.fileFormat === 'GeoJSON'){
            mapInfo.uploadMap(JSON.parse(mapInfo.fileContent));
        }
        else if(mapInfo.fileFormat === 'Shapefiles'){
            mapInfo.uploadMap(mapInfo.fileContent);
        }
        else if(mapInfo.fileFormat === 'Keyhole(KML)'){
            const kmlText = new DOMParser().parseFromString(mapInfo.fileContent, 'text/xml');
            mapInfo.uploadMap(kmlText);
        }
        else{
            return false;
        }

        return true;
    }

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

    return (
        <MapContext.Provider value={{ mapInfo }}>
            {children}
        </MapContext.Provider>
    )
}

export default MapContext;