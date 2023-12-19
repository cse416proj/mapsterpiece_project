import { useState, useEffect } from "react";
import {
  Box,
  Modal,
  Button,
  Typography,
  TextField,
  Divider,
  Alert,
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
} from "@mui/material";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditIcon from "@mui/icons-material/Edit";

export default function PinDataEntryModal({
  isOpen,
  latLng,
  mapTypeData,
  setMapTypeData,
  createPin,
  handleClose,
}) {
  const [errorMsg, setErrorMsg] = useState(null);

  const [propertyName, setPropertyName] = useState('');
  const [editActive, setEditActive] = useState('');
  const [propertyNameError, setPropertyNameError] = useState('');

  function clearAll(){
    setErrorMsg(null);
    setEditActive(-1);
    setPropertyName('');
    setPropertyNameError('');
  }

  useEffect(() => {
    clearAll();
  }, []);

  if(!latLng) {
    return;
  }

  function handleCloseModal(event) {
    // event.stopPropagation();
    // event.preventDefault();
    clearAll();
    handleClose();
  }

  function handleAddPin(event) {
    // event.stopPropagation();
    // event.preventDefault();

    const properties = Object.keys(mapTypeData);
    const newProperties = [];

    for (let i = 0; i < properties.length; i++) {
      const property = properties[i];
      const value = mapTypeData[property];
      console.log(`mapTypeData[${property}]: ${value}`);

      const trimmedPropertyVal = value.replace(/(\s|\r\n|\n|\r)/gm, "");
      if (trimmedPropertyVal.length <= 0) {
        setErrorMsg(`Cannot enter blank value for field ${property}!`);
        return;
      }

      const newProperty = {
        property: property,
        value: value,
      };

      newProperties[i] = newProperty;
    }
    clearAll();
    createPin(newProperties);
    handleClose();
  }

  function handleAddField(event) {
    // event.stopPropagation();
    // event.preventDefault();
    const newField = `property ${Object.keys(mapTypeData).length + 1}`;
    setMapTypeData({
      ...mapTypeData,
      [newField]: "",
    });
  }

  function handleRemoveProperty(property) {
    const newMapTypeData = { ...mapTypeData };
    delete newMapTypeData[property];

    const reIndexedMapTypeData = Object.keys(newMapTypeData).reduce(
      (obj, key, index) => {
        const newKey = `property ${index + 1}`;
        obj[newKey] = newMapTypeData[key];
        return obj;
      },
      {}
    );

    setMapTypeData(reIndexedMapTypeData);
  }

  function updateMapTypeData(event) {
    // event.stopPropagation();
    // event.preventDefault();
    const field = event.target.name;
    setMapTypeData({
      ...mapTypeData,
      [field]: event.target.value,
    });
  }

  function handleEditProperty(event, property) {
    // event.preventDefault();
    // event.stopPropagation();
    console.log('handleEditProperty')
    setEditActive(property);
  }

  function handleUpdatePropertyName(event) {
    // event.preventDefault();
    // event.stopPropagation();
    setPropertyName(event.target.value);
  }

  const handleEnterPropertyName = (event, property) => {
    if(event.key === 'Enter'){
      const trimmedInput = propertyName.replace(/(\s|\r\n|\n|\r)/gm, '');

      if(trimmedInput.length === 0){
        setPropertyNameError('Cannot submit blank text for a property name!');
      }
      else{
        handleSavePropertyName(event, property);
      }
    }
  };

  const handleSavePropertyName = (event, property) => {
    // update property name, update data & clear
    const trimmedInput = propertyName.replace(/(\s|\r\n|\n|\r)/gm, '');
    if(trimmedInput.length > 0){
      const updatedObject = Object.fromEntries(
        Object.entries(mapTypeData).map(([prop, value]) => {
          return [(prop === property) ? propertyName : prop, value];
        })
      );
      setMapTypeData(updatedObject);
      clearAll();
    }
  }

  function renderFields() {
    const properties = Object.keys(mapTypeData);

    if(properties.length === 0){
      return <Typography variant='h6'>No pin properties has been added yet.</Typography>
    }

    return properties.map((property, index) => {
      if(editActive === property){
        return(
          <TextField
            style={{ width: "92.5%" }}
            label="Value for current property"
            defaultValue={property}
            value={propertyName}
            error={propertyNameError !== ''}
            helperText={(propertyNameError !== '') ? propertyNameError : ''}
            onChange={handleUpdatePropertyName}
            onKeyDown={(e) => handleEnterPropertyName(e, property)}
            onBlur={(e) => handleSavePropertyName(e, property)}
          />
        );
      }
      return (
        <Box key={index} className="flex-row" id="data-entry">
          <Box className="flex-row" id="pin-property" style={{ width: "20%" }}>
            <Typography>{property}</Typography>
            <EditIcon id="edit-property-type" onClick={(e) => handleEditProperty(e, property)}/>
          </Box>
          <TextField
            style={{ width: "75%" }}
            name={property}
            label="Value for current property"
            value={mapTypeData[property]}
            onChange={updateMapTypeData}
          />
          <DeleteForeverOutlinedIcon
            onClick={() => handleRemoveProperty(property)}
          />
        </Box>
      );
    });
  }

  return (
    <Modal id="modal-overlay" open={isOpen}>
      <Box
        className="popUpBox"
        id="data-entry-box"
        style={errorMsg ? { width: "50vw" } : { width: "47.5vw" }}
      >
        {errorMsg && <Alert severity="warning">{errorMsg}</Alert>}
        <Box className="flex-column" style={{ width: "100%" }}>
          <Box className="flex-row" id="data-entry-title">
            <LocationOnIcon id="pin-icon" />
            <Typography id="modal-title">Add Pin</Typography>
          </Box>

          <Divider id="data-entry-divider" />
        </Box>

        <Box className="flex-row">
          <Typography variant="h5">
            Current Lat Lng: {latLng[0]}, {latLng[1]}
          </Typography>
        </Box>

        <Box
          className="flex-column"
          id="data-entry-container"
          style={{ overflowY: "auto", maxHeight: "200px" }}
        >
          {renderFields()}
        </Box>

        <SpeedDial
          id="action-button"
          ariaLabel="SpeedDial basic"
          icon={<SpeedDialIcon/>}
          onClick={handleAddField}
        />

        <Box className="flex-row" id="data-entry-buttons">
          <Button
            variant="contained"
            id="modal-contained-button"
            onClick={handleAddPin}
            disabled={editActive.length === 0}
            style={(editActive.length === 0) ? {backgroundColor: 'gray'} : {backgroundColor: 'var(--secondary-color)'}}
          >
            Add
          </Button>
          <Button
            variant="outlined"
            id="modal-outline-button"
            onClick={handleCloseModal}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
