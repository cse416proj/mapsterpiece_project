import { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField } from '@mui/material';

import FileUpload from './FileUpload';
import FileDropdown from './FileDropdown';
import Tags from '../tag/Tags';
import ButtonSet from '../ButtonSet';
import MapContext from '../../../../contexts/map';

function CreateMap(){
    // set up file reference
    const inputFile = useRef(null);

    // get map Info from MapContext
    const { mapInfo } = useContext(MapContext);

    // set up input variables
    const [title, setTitle] = useState('');
    const [fileFormat, setFileFormat] = useState('');
    const [map, setMap] = useState(null);
    const [tags, setTags] = useState([]);

    // set up error flags for these input
    const [missingTitle, setMissingTitle] = useState(false);
    const [missingFileFormat, setMissingFileFormat] = useState(false);

    useEffect(() => {
        if(mapInfo){
            mapInfo.setTitle(title);
            mapInfo.setFileFormat(fileFormat);
            mapInfo.setTags(tags);
        }
    }, [title, fileFormat, tags, mapInfo])

    // to be removed: print map content when it updates
    useEffect(() => {
        console.log(map);
    }, [map])

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
        setMissingTitle(false);
        setMissingFileFormat(false);
        clearInputFile();
        if(mapInfo){
            mapInfo.clearUpload();
        }
    }

    // check if file format exists
    const checkTitleExists = () => {
        if(title.length === 0){
            setMissingTitle(true);
        }
        else{
            setMissingFileFormat(false);
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

    // handle selected file input
    const handleSelectFile = (files) => {
        const processSuccess = mapInfo.processFile(files);
        if(!processSuccess){
            alert('Unmatch upload file format.');
            clearInputFile();
            return;
        }
    };

    // handle map rendering after upload file & choose format
    const handleUpload = () => {
        console.log('handleUpload');

        checkTitleExists();
        checkFileFormatExists();

        if(mapInfo){
            if(missingTitle || missingFileFormat){
                return;
            }
            else if(!mapInfo.fileContent){
                alert('Please upload a map file (geojson/shapefile/kml).');
            }
            else{
                mapInfo.createMap(title, fileFormat, tags);
            }
        }
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