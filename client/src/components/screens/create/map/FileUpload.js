import { useContext, useState, useRef, useEffect } from 'react';
import { Box, FormControl, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// import JSZip from 'jszip';
// import * as shapefile from 'shapefile';
// import MapContext from './MapContext';

function FileUpload({ inputFile, handleSelectFile, handleUpload, handleClear }){
    const navigate = useNavigate();
    // const { mapInfo } = useContext(MapContext);

    // const [fileFormat, setFileFormat] = useState('');
    // const [fileContent, setFileContent] = useState('');
    // const [shpBuffer, setShpBuffer] = useState(null);
    // const [dbfBuffer, setDbfBuffer] = useState(null);

    // // define file extension
    // const fileExtension = {
    //     GeoJSON: 'json',
    //     Shapefiles: 'shp/dbf/zip',
    //     'Keyhole(KML)': 'kml',
    // };

    // useEffect(() => {
    //     if(mapInfo?.fileFormat){
    //         console.log(mapInfo.fileFormat);
    //         setFileFormat(mapInfo.fileFormat);
    //     }
    // }, [mapInfo?.fileFormat]);

    // // re-run effect when buffers change
    // useEffect(() => {
    //     if (shpBuffer && dbfBuffer) {
    //     let features = [];
    //     shapefile.open(shpBuffer, dbfBuffer).then((source) =>
    //         source.read().then(function log(result) {
    //             if (result.done) {
    //                 const geoJSON = {
    //                     type: 'FeatureCollection',
    //                     features: features,
    //                 };
    //                 setFileContent(geoJSON);
    //                 return;
    //             }
    //             features.push(result.value);
    //             return source.read().then(log);
    //         })
    //         )
    //         .catch((error) => console.error(error.stack));
    //     }
    // }, [shpBuffer, dbfBuffer]);

    // // for reading .kml & .geojson file
    // function readDataAsText(file) {
    //     const reader = new FileReader();
    //     reader.onload = () => {
    //     setFileContent(reader.result);
    //     };
    //     reader.readAsText(file);
    // }

    // // for reading .shp & .dbf file
    // function readDataAsArrayBuffer(file, stateHook) {
    //     const reader = new FileReader();
    //     reader.onload = () => {
    //     stateHook(reader.result);
    //     };
    //     reader.readAsArrayBuffer(file);
    // }

    // function readDataFromShapeFiles(shpFile, dbfFile) {
    //     readDataAsArrayBuffer(shpFile, setShpBuffer);
    //     readDataAsArrayBuffer(dbfFile, setDbfBuffer);
    // }

    // // for reading .zip file containing diff file format (we only want .shp & .dbf)
    // function readDataFromZipFile(file) {
    //     const reader = new FileReader();

    //     reader.onload = () => {
    //         const zipData = reader.result;
    //         const jszip = new JSZip();

    //         jszip.loadAsync(zipData).then((zip) => {
    //             zip.forEach((fileName, file) => {
    //             // ignore file that is not .shp/.dbf
    //             const fileType = fileName.split('.').pop();
    //             if (fileType !== 'shp' && fileType !== 'dbf') {
    //                 return;
    //             }

    //             // Read file content by arraybuffer type
    //             file.async('arraybuffer').then((content) => {
    //                 if (fileType === 'shp') setShpBuffer(content);
    //                 else setDbfBuffer(content);
    //             });
    //             });
    //         });
    //     };
    //     reader.readAsArrayBuffer(file);
    // }

    // handle selected file input
    const selectFile = (event) => {
        console.log('selectFile');
        console.log(event.target.files);
        console.log('now call handleSelectFile');
        handleSelectFile(event.target.files);

        // const fileCount = event.target.files.length;

        // // only process non-empty file that matches selected file extension
        // if (event.target.files[0] && fileFormat) {
        //     const fileType = event.target.files[0].name.split('.').pop();
        //     const fileType2 = (fileCount === 2) ? event.target.files[1].name.split('.').pop() : '';
        //     const fileTypeSet = new Set([fileType, fileType2]);

        //     if(
        //         (fileFormat === "Shapefiles" &&
        //           ((fileCount !== 2 && fileType !== "zip") ||
        //             !fileExtension[fileFormat].includes(fileType2))) ||
        //         !fileExtension[fileFormat].includes(fileType) ||
        //         fileTypeSet.size !== 2
        //       ) {
        //         alert('Unmatch upload file format.');
        //         clearInputFile();
        //     } 
        //     else {
        //         if(fileFormat === 'GeoJSON'){
        //             readDataAsText(event.target.files[0]);
        //         }
        //         else if(fileFormat === 'Shapefiles'){
        //             if(fileType === 'shp' || fileType === 'dbf'){
        //                 var shpFile = (fileType === 'shp') ? event.target.files[0] : event.target.files[1];
        //                 var dbfFile = (fileType === 'dbf') ? event.target.files[0] : event.target.files[1];
        //                 readDataFromShapeFiles(shpFile, dbfFile);
        //             }
        //             else if(fileType === 'zip'){
        //                 readDataFromZipFile(event.target.files[0]);
        //             }
        //         }
        //         else if (fileFormat === 'Keyhole(KML)') {
        //             readDataAsText(event.target.files[0]);
        //         }
        //     }
        // }
    };

    return(
        <Box className='flex-row' id='file-create-container'>
            <FormControl style={{ width: '100%' }}>
                <input
                    type='file'
                    accept='.zip, .json, .shp, .kml, .dbf'
                    multiple
                    ref={inputFile}
                    id='file-upload-input'
                    onChange={selectFile}
                />
                <Box className='flex-row' id='button-container'>
                    <Button
                        variant='outlined'
                        id='clear-button'
                        style={{ borderRadius: 50 }}
                        onClick={handleClear}
                    >
                        Clear
                    </Button>
                    <Button
                        variant='contained'
                        id='upload-button'
                        style={{ borderRadius: 50 }}
                        onClick={handleUpload}
                    >
                        Upload
                    </Button>
                </Box>
            </FormControl>
            
        </Box>
    )
}

export default FileUpload;