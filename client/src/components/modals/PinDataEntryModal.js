import { useState, useEffect } from 'react';
import { Box, Modal, Button, Typography, TextField, Divider, Alert } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function PinDataEntryModal({isOpen, latLng, mapTypeData, setMapTypeData, createPin, handleClose}) {
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        setErrorMsg(null);
    }, []);

    if(!latLng){
        return;
    }

    function handleCloseModal(event){
        event.stopPropagation();
        event.preventDefault();
        handleClose();
    }

    function handleAddPin(event){
        event.stopPropagation();
        event.preventDefault();

        const properties = Object.keys(mapTypeData);
        const newProperties = [];

        for(let i=0; i < properties.length; i++){
            const property = properties[i];
            const value = mapTypeData[property];
            console.log(`mapTypeData[${property}]: ${value}`);

            const trimmedPropertyVal = value.replace(/(\s|\r\n|\n|\r)/gm, '');
            if(trimmedPropertyVal.length <= 0){
                setErrorMsg(`Cannot enter blank value for field ${property}!`);
                return;
            }

            const newProperty = {
                property: property,
                value: value
            }

            newProperties[i] = newProperty;
        }
        setErrorMsg(null);
        createPin(newProperties);
        handleClose();
    }

    function updateMapTypeData(event){
        event.stopPropagation();
        event.preventDefault();
        const field = event.target.name;
        setMapTypeData({
            ...mapTypeData,
            [field]: event.target.value
        });
    }

    function renderFields(){
        const properties = Object.keys(mapTypeData);
        return properties.map((property, index) => {
            return(
                <Box key={index} className='flex-row' id='data-entry'>
                    <Typography>{property}</Typography>
                    <TextField
                        style={{ width: '75%' }}
                        name={property}
                        value={mapTypeData[property]}
                        onChange={updateMapTypeData}
                    />
                </Box>
            )
        })
    }

    return (
        <Modal id='modal-overlay' open={isOpen}>
            <Box
                className='popUpBox'
                id='data-entry-box'
                style={ (errorMsg) ? { width: '50vw' } : { width: '47.5vw' } }
            >
                { errorMsg && <Alert severity='warning'>{errorMsg}</Alert>}
                <Box className='flex-column' style={{ width: '100%' }}>
                    <Box className='flex-row' id='data-entry-title'>
                        <LocationOnIcon id='pin-icon'/>
                        <Typography id='modal-title'>Add Pin</Typography>
                    </Box>

                    <Divider id='data-entry-divider'/>
                </Box>

                <Box className='flex-row'>
                    <Typography variant='h5'>Current Lat Lng: {latLng[0]}, {latLng[1]}</Typography>
                </Box>

                <Box className='flex-column' id='data-entry-container'>
                    { renderFields() }
                </Box>

                <Box className='flex-row' id='data-entry-buttons'>
                    <Button
                        variant='contained'
                        id='modal-contained-button'
                        onClick={handleAddPin}
                    >
                        Add
                    </Button>
                    <Button
                        variant='outlined'
                        id='modal-outline-button'
                        onClick={handleCloseModal}
                    >
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}
