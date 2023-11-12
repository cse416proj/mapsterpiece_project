import { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField } from '@mui/material';

import FileUpload from './FileUpload';
import FileDropdown from './FileDropdown';
import Tags from '../tag/Tags';
import ButtonSet from '../ButtonSet';
// import MapContext from './MapContext';

import JSZip from 'jszip';
import * as shapefile from 'shapefile';

function CreateMap(){
    // define file extension
    const fileExtension = {
        GeoJSON: 'json',
        Shapefiles: 'shp/dbf/zip',
        'Keyhole(KML)': 'kml',
    };

    // set up file reference
    const inputFile = useRef(null);

    // set up navigate to visit other link
    const navigate = useNavigate();

    // set up input variables
    const [title, setTitle] = useState('');
    const [fileFormat, setFileFormat] = useState('');
    const [fileContent, setFileContent] = useState('');
    const [shpBuffer, setShpBuffer] = useState(null);
    const [dbfBuffer, setDbfBuffer] = useState(null);
    const [map, setMap] = useState(null);
    const [tags, setTags] = useState([]);

    // set up error flags for these input
    const [missingTitle, setMissingTitle] = useState(false);
    const [missingFileFormat, setMissingFileFormat] = useState(false);

    // re-run effect when buffers change
    useEffect(() => {
        if (shpBuffer && dbfBuffer) {
            let features = [];
            shapefile.open(shpBuffer, dbfBuffer).then((source) =>
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
                )
                .catch((error) => console.error(error.stack));
        }
    }, [shpBuffer, dbfBuffer]);

    // to be removed: print map content when it updates
    useEffect(() => {
        console.log(map);
    }, [map])

    // handle title change
    const handleTitleChange = (event) => {
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
        setFileContent('');
        setShpBuffer(null);
        setDbfBuffer(null);
        setMap(null);
        setTags([]);
        setMissingTitle(false);
        setMissingFileFormat(false);
        clearInputFile();
    }

    // check if file format exists
    const checkTitleExists = () => {
        if(title.length === 0){
            setMissingTitle(true);
        }
        else{
            setMissingTitle(false);
        }
    }

    // check if file format exists
    const checkFileFormatExists = () => {
        if (!fileFormat) {
            setMissingFileFormat(true);
        }
        else{
            setMissingFileFormat(false);
        }
    }

    // validate file format
    const validateFileFormat = (fileCount, fileType, fileType2, fileTypeSet) => {
        const isNotZip = fileCount !== 2 && fileType !== "zip";
        const missingType = !fileExtension[fileFormat].includes(fileType2);
        const unmatchType = !fileExtension[fileFormat].includes(fileType);
        const invalidShapeFile = (fileFormat === "Shapefiles") && (isNotZip || missingType);
        const incorrectSize = fileTypeSet.size !== 2;
        
        if(fileFormat){
            if(invalidShapeFile || unmatchType || incorrectSize){
                return false;
            }
            return true;
        }
        return false;
    }

    // for reading .kml & .geojson file
    function readDataAsText(file) {
        const reader = new FileReader();
        reader.onload = () => {
            setFileContent(reader.result);
        };
        reader.readAsText(file);
    }

    // for reading data in bytes (.shp & .dbf file)
    function readDataAsArrayBuffer(file, stateHook) {
        const reader = new FileReader();
        reader.onload = () => {
            stateHook(reader.result);
        };
        reader.readAsArrayBuffer(file);
    }

    // for reading shapefiles (.shp & .dbf file)
    function readDataFromShapeFiles(shpFile, dbfFile) {
        readDataAsArrayBuffer(shpFile, setShpBuffer);
        readDataAsArrayBuffer(dbfFile, setDbfBuffer);
    }

    // for reading .zip file containing diff file format (we only want .shp & .dbf)
    function readDataFromZipFile(file) {
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
                            setShpBuffer(content);
                        }
                        else{
                            setDbfBuffer(content);
                        }
                    });
                });
            });
        };
        reader.readAsArrayBuffer(file);
    }

    // handle selected file input
    const handleSelectFile = (files) => {
        const fileCount = files.length;
       
        // only process non-empty file that matches selected file extension
        if(files[0] && fileFormat) {
            const fileType = files[0].name.split('.').pop();
            const fileType2 = (fileCount === 2) ? files[1].name.split('.').pop() : '';
            const fileTypeSet = new Set([fileType, fileType2]);

            // if invalidate file format, display error
            if(!validateFileFormat(fileCount, fileType, fileType2, fileTypeSet)){
                alert('Unmatch upload file format.');
                clearInputFile();
                return;
            } 

            if(fileFormat === 'GeoJSON'){
                readDataAsText(files[0]);
            }
            else if(fileFormat === 'Shapefiles'){
                if(fileType === 'shp' || fileType === 'dbf'){
                    var shpFile = (fileType === 'shp') ? files[0] : files[1];
                    var dbfFile = (fileType === 'dbf') ? files[0] : files[1];
                    readDataFromShapeFiles(shpFile, dbfFile);
                }
                else if(fileType === 'zip'){
                    readDataFromZipFile(files[0]);
                }
            }
            else if (fileFormat === 'Keyhole(KML)') {
                readDataAsText(files[0]);
            }
        }
    };

    // handle map rendering after upload file & choose format
    const handleUpload = () => {
        console.log('handleUpload');

        checkTitleExists();
        checkFileFormatExists();

        if(missingTitle || missingFileFormat || !fileContent){
            if(!fileContent){
                alert('Please upload a map file (geojson/shapefile/kml).')
            }
            return;
        }

        if(fileFormat === 'GeoJSON'){
            setMap(JSON.parse(fileContent));
        }
        else if(fileFormat === 'Shapefiles'){
            setMap(fileContent);
        }
        else if(fileFormat === 'Keyhole(KML)'){
            const kmlText = new DOMParser().parseFromString(fileContent, 'text/xml');
            setMap(kmlText);
        }
        navigate('/');
    };

    return (
        <Box className='flex-column' id='create-container'>
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
        </Box>
    )
}

export default CreateMap;