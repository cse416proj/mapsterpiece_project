import { useState, useRef, useEffect, useContext } from 'react';
import { Box, TextField, Modal, Typography } from '@mui/material';

import JSZip from "jszip";
import * as shapefile from "shapefile";
import { kml } from "@tmcw/togeojson";

import FileUpload from './FileUpload';
import FileDropdown from './FileDropdown';
import { Tags, ButtonSet } from '../../commonProps';
import MapContext from '../../../../contexts/map';
import {GlobalStoreContext} from "../../../../contexts/store";
import { UploadMapErrorModal } from "../../../index";

function CreateMap(){
    // define file extension
    const fileExtension = {
        GeoJSON: "json",
        Shapefiles: "shp/dbf/zip",
        "Keyhole(KML)": "kml",
    };

    // set up file reference
    const inputFile = useRef(null);

    // get map Info from MapContext
    const { mapInfo } = useContext(MapContext);

    // get store
    const { store } = useContext(GlobalStoreContext);

    // set up input variables
    const [title, setTitle] = useState('');
    const [fileFormat, setFileFormat] = useState('');
    const [map, setMap] = useState(null);
    const [tags, setTags] = useState([]);
    const [shpBuffer, setShpBuffer] = useState(null);
    const [dbfBuffer, setDbfBuffer] = useState(null);
    const [fileContent, setFileContent] = useState(null);

    // set up flags for loading content
    const [isLoading, setIsLoading] = useState(false);

    // set up error flags for these input
    const [missingTitle, setMissingTitle] = useState(false);
    const [missingFileFormat, setMissingFileFormat] = useState(false);

    // re-run effect when buffers change
    useEffect(() => {
        if(fileFormat === 'Shapefiles' && shpBuffer && dbfBuffer) {
            let features = [];
            shapefile.open(shpBuffer, dbfBuffer).then((source) => {
                source.read().then(function log(result) {
                    if (result.done) {
                        const geoJSON = {
                            type: 'FeatureCollection',
                            features: features,
                        };
                        setFileContent(geoJSON);
                        return;
                    }
                    features.push(result.value);
                    return source.read().then(log);
                })
            })
            .catch((error) => console.error(error.stack));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shpBuffer, dbfBuffer]);

    // set up loading effect
    useEffect(() => {
        if(fileContent){
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        }
    }, [fileContent]);


    useEffect(() => {
        clearInputFile();
    }, [fileFormat]);

    // handle title change
    const handleTitleChange = (event) => {
        event.stopPropagation();
        event.preventDefault();
        setTitle(event.target.value);
    }

    // for clearing input file
    function clearInputFile() {
        if (inputFile.current) {
            inputFile.current.value = '';
            inputFile.current.type = 'file';
            inputFile.current.accept = '.zip, .json, .shp, .kml, .dbf';
        }
    }

    // handle clear all input
    const handleClear = (event) => {
        event.stopPropagation();
        event.preventDefault();
        setTitle('');
        setFileFormat('');
        setMap(null);
        setTags([]);
        setShpBuffer(null);
        setDbfBuffer(null);
        setFileContent(null);
        setIsLoading(false);
        setMissingTitle(false);
        setMissingFileFormat(false);
        clearInputFile();
    }

    // check if file format exists
    const checkTitleExists = () => {
        setMissingTitle((title.length === 0) ? true : false);
    }

    // check if file format exists
    const checkFileFormatExists = () => {
        setMissingFileFormat((!fileFormat) ? true : false);
    }

    // validate file format
    const validateFileFormat = (fileCount, fileType, fileType2, fileTypeSet) => {
        const isNotZip = fileCount !== 2 && fileType !== "zip";
        const missingType = !fileExtension[fileFormat].includes(fileType2);
        const unmatchType = !fileExtension[fileFormat].includes(fileType);
        const invalidShapeFile = (fileFormat === "Shapefiles") && (isNotZip || missingType);
        const incorrectSize = fileTypeSet.size !== 2;

        if (fileFormat) {
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
            setFileContent(reader.result);
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
        readDataAsArrayBuffer(shpFile, setShpBuffer);
        readDataAsArrayBuffer(dbfFile, setDbfBuffer);
    };

    // for reading .zip file containing diff file format (we only want .shp & .dbf)
    const readDataFromZipFile = (file) => {
        console.log(file);

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
                            setShpBuffer(content);
                        }
                        else {
                            setDbfBuffer(content);
                        }
                    });
                });
            });
        };
        reader.readAsArrayBuffer(file);
    };

    // for processing input file
    const processFile = (files) => {
        const fileCount = files.length;

        // only process non-empty file that matches selected file extension
        if (files[0] && fileFormat) {
            const fileType = files[0].name.split(".").pop();
            const fileType2 = (fileCount === 2) ? files[1].name.split(".").pop() : "";
            const fileTypeSet = new Set([fileType, fileType2]);

            console.log(`fileType: ${fileType}`);
            console.log(`fileType2: ${fileType2}`);
            console.log(`fileTypeSet: ${fileTypeSet}`);

            // if invalidate file format, display error
            if (!validateFileFormat(fileCount, fileType, fileType2, fileTypeSet)) {
                return false;
            }

            setIsLoading(true);

            if(fileFormat === "GeoJSON"){
                readDataAsText(files[0]);
            }
            else if(fileFormat === "Shapefiles"){
                console.log('shapefiles');
                if(fileType === "shp" || fileType === "dbf"){
                    var shpFile = fileType === "shp" ? files[0] : files[1];
                    var dbfFile = fileType === "dbf" ? files[0] : files[1];
                    readDataFromShapeFiles(shpFile, dbfFile);
                }
                else if(fileType === "zip"){
                    readDataFromZipFile(files[0]);
                }
            }
            else if(fileFormat === "Keyhole(KML)"){
                readDataAsText(files[0]);
            }
            return true;
        }
        return false;
    };

    // handle selected file input
    const handleSelectFile = (files) => {
        const processSuccess = processFile(files);
        if(!processSuccess){
            store.uploadError('Unmatch upload file format.')
            clearInputFile();
            return;
        }
    };

    // handle map rendering after upload file & choose format
    const handleUpload = () => {
        console.log('handleUpload');

        checkTitleExists();
        checkFileFormatExists();

        if(missingTitle || missingFileFormat){
            console.log('missingTitle || missingFileFormat')
            return;
        }
        else if(!fileContent){
            store.uploadError('Please upload a map file (geojson/shapefile/kml).')
        }
        else if(mapInfo){
            let mapContent = null;

            // convert everything into geojson
            if (fileFormat === "GeoJSON") {
                mapContent = JSON.parse(fileContent);
            }
            else if (fileFormat === "Shapefiles") {
                mapContent = fileContent;
            }
            else if (fileFormat === "Keyhole(KML)") {
                let dom = new DOMParser().parseFromString(fileContent, "text/xml");
                mapContent = kml(dom);
            }
            
            const newMap = {
                title: title,
                fileFormat: fileFormat,
                mapContent: mapContent,
                tags: tags
            }

            mapInfo.createMap(newMap);
        }
    };

    function renderLoading(){
        if(isLoading){
            return (
                <Box className="loadingOverlay">
                    <Box className="loading">
                        <Typography variant="h4">Currently loading map content...</Typography>
                        <Box className="loadingCircle"></Box>
                    </Box>
                </Box>
            );
        }
        return null;
    }

    return (
        <Box className='flex-column' id='create-container'>
            {
               renderLoading()
            }
            <TextField
                id='title-input'
                label='Map Title'
                variant='outlined'
                placeholder="Map Title"
                value={title}
                error={!title && missingTitle}
                helperText={!title && missingTitle && 'Required to enter map title'}
                onChange={handleTitleChange}
            />
            <FileDropdown
                fileFormat={fileFormat}
                setFileFormat={setFileFormat}
                missingFileFormat={missingFileFormat}
                tags={tags}
                setTags={setTags}
            />
            <FileUpload
                inputFile={inputFile}
                handleSelectFile={handleSelectFile}
            />
            <Tags tags={tags} setTags={setTags}/>
            <ButtonSet prompt='upload' handleClear={handleClear} handleUpload={handleUpload}/>
            <UploadMapErrorModal/>
        </Box>
    )
}

export default CreateMap;