import { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, TextField} from '@mui/material';

import JSZip from "jszip";
import * as shapefile from "shapefile";
import { kml } from "@tmcw/togeojson";

import FileUpload from './FileUpload';
import SelectFileFormat from './SelectFileFormat';
import SelectMapType from './SelectMapType';
import { Tags, ButtonSet } from '../../commonProps';
import { Modals, SuccessAlert } from "../../../index";

import MapContext from '../../../../contexts/map';
import { GlobalStoreContext } from "../../../../contexts/store";
import AuthContext from '../../../../contexts/auth';

function CreateMap(){
    // define file extension
    const fileExtension = {
        GeoJSON: "json",
        Shapefiles: "shp/dbf/zip",
        "Keyhole(KML)": "kml",
    };

    // set up file reference
    const inputFile = useRef(null);

    // get store & map Info from MapContext
    const { store } = useContext(GlobalStoreContext);
    const { mapInfo } = useContext(MapContext);
    const { auth } = useContext(AuthContext);

    // use Navigation
    const navigate = useNavigate();

    // set up input variables
    const [title, setTitle] = useState('');
    const [fileFormat, setFileFormat] = useState('');
    const [mapType, setMapType] = useState('');
    const [tags, setTags] = useState([]);
    const [isEditingTag, setIsEditingTag] = useState(false);
    const [shpBuffer, setShpBuffer] = useState(null);
    const [dbfBuffer, setDbfBuffer] = useState(null);
    const [fileContent, setFileContent] = useState(null);

    // set up flags for loading content
    const [isLoading, setIsLoading] = useState(false);

    // success alert
    const [createSuccess, setCreateSuccess] = useState(false);

    // set up error flags for these input
    const [missingTitle, setMissingTitle] = useState(false);
    const [missingFileFormat, setMissingFileFormat] = useState(false);
    const [missingMapType, setMissingMapType] = useState(false);

    // reset success alert when first enter
    useEffect(() => {
        handleClear();
        store.closeModal();
        setCreateSuccess(false);
    }, []);

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

    // clear input file when file format changes
    useEffect(() => {
        clearInputFile();
        setFileContent(null);
    }, [fileFormat]);

    // update map create success status
    useEffect(() => {
        if((store?.createSuccess === true)){
            setCreateSuccess(true);
        }
        else{
            setCreateSuccess(false);
        }
    }, [store?.createSuccess]);

    // turn off open success & close alert after 1 sec
    useEffect(() => {
        if(createSuccess && mapInfo?.currentMap){
            setTimeout(() => {
                navigate(`/map-edit/${mapInfo?.currentMap?._id}`);
                store.clearCreateSuccess();
            }, 2250);
        }
    }, [createSuccess, mapInfo.currentMap])

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
    const handleClear = () => {
        setTitle('');
        setFileFormat('');
        setMapType('');
        setTags([]);
        setIsEditingTag(false);
        setShpBuffer(null);
        setDbfBuffer(null);
        setFileContent(null);
        setIsLoading(false);
        setMissingTitle(false);
        setMissingFileFormat(false);
        setMissingMapType(false);
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

    // check if map type exists
    const checkMapTypeExists = () => {
        setMissingMapType((!mapType) ? true : false);
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
        if(!fileFormat){
            setMissingFileFormat(true);
            store.setError('Please select a file format first!');
            clearInputFile();
            return;
        }
        const processSuccess = processFile(files);
        if(!processSuccess){
            store.setError('Unmatch upload file format.')
            clearInputFile();
            return;
        }
    };

    // handle map rendering after upload file & choose format
    const handleUpload = () => {
        console.log('handleUpload');

        checkTitleExists();
        checkFileFormatExists();
        checkMapTypeExists();

        if(missingTitle || missingFileFormat || missingMapType){
            console.log('missingTitle || missingFileFormat');
            return;
        }
        else if(!fileContent){
            store.setError('Please upload a map file (geojson/shapefile/kml).')
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
                mapType: mapType,
                mapContent: mapContent,
                tags: tags
            }

            mapInfo.createMap(newMap);
        }
    };

    return (
        <Box className='flex-column' id='create-container'>
            {createSuccess && <SuccessAlert type='map-create'/>}
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
            <Box className='flex-row' id='create-selection'>
                <SelectFileFormat
                    isLoading={isLoading}
                    fileFormat={fileFormat}
                    fileContent={fileContent}
                    setFileFormat={setFileFormat}
                    missingFileFormat={missingFileFormat}
                    tags={tags}
                    setTags={setTags}
                />
                <SelectMapType
                    isLoading={isLoading}
                    fileContent={fileContent}
                    mapType={mapType}
                    setMapType={setMapType}
                    missingMapType={missingMapType}
                    tags={tags}
                    setTags={setTags}
                />
            </Box>
            <FileUpload
                isLoading={isLoading}
                inputFile={inputFile}
                fileContent={fileContent}
                handleSelectFile={handleSelectFile}
            />
            <Tags tags={tags} setTags={setTags} isEditingTag={isEditingTag} setIsEditingTag={setIsEditingTag}/>
            <ButtonSet prompt='upload' isLoading={isLoading && fileContent} handleClear={handleClear} handleUpload={handleUpload}/>
            <Modals/>
        </Box>
    )
}

export default CreateMap;