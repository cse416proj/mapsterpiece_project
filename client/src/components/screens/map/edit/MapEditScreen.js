import React, { useContext, useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Box } from "@mui/material";

import { MapEditTopBar, MapEditSideBar, MapScreen } from "../../../index";
import { Modals, Warning, SuccessAlert } from "../../../index";

import MapContext from "../../../../contexts/map";
import AuthContext from "../../../../contexts/auth";
import GlobalStoreContext from "../../../../contexts/store";

export default function MapEditScreen() {
  const { mapInfo } = useContext(MapContext);
  const { auth } = useContext(AuthContext);
  const { store } = useContext(GlobalStoreContext);

  const { mapId } = useParams();
  const navigate = useNavigate();

  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [duplicateSuccess, setDuplicateSuccess] = useState(false);

  useEffect(() => {
    store.closeModal();

    if(mapId){
      mapInfo?.getMapById(mapId);
    }
  }, []);

  // update & redirect if map got successfully deleted
  useEffect(() => {
    if((store?.deleteSuccess === true)){
      setDeleteSuccess(true);
    }
    else{
      setDeleteSuccess(false);
    }
  }, [store?.deleteSuccess]);

  useEffect(() => {
    console.log(`deleteSuccess: ${deleteSuccess}`);
    if(deleteSuccess === true){
      setTimeout(() => {
        navigate('/');
        store.clearDeleteSuccess();
      }, 2250);
    }
  }, [deleteSuccess]);

  // update & redirect if map got successfully published
  useEffect(() => {
    if((store?.publishSuccess === true)){
      setPublishSuccess(true);
    }
    else{
      setPublishSuccess(false);
    }
  }, [store?.publishSuccess]);

  useEffect(() => {
    console.log(`publishSuccess: ${publishSuccess}`);
    if(publishSuccess === true){
      setTimeout(() => {
        navigate(`/map-detail/${mapId}`);
        store.clearPublishSuccess();
      }, 2250);
    }
  }, [publishSuccess]);

  // update & redirect if map got successfully published
  useEffect(() => {
    console.log(`saveSuccess: ${store?.saveSuccess}`)
    if((store?.saveSuccess === true)){
      setSaveSuccess(true);
    }
    else{
      setSaveSuccess(false);
    }
  }, [store?.saveSuccess]);

  useEffect(() => {
    console.log(`saveSuccess: ${saveSuccess}`);
    if(saveSuccess === true){
        console.log('done saving');
        setTimeout(() => {
          store.clearSaveSuccess();
          navigate('/');
          // mapInfo?.getMapById(mapId);
        }, 2250);
    }
  }, [saveSuccess]);

  // duplicate & redirect if map got successfully duplicated
  useEffect(() => {
    console.log(store.duplicateSuccess);
    if((store?.duplicateSuccess === true)){
      setDuplicateSuccess(true);
    }
    else{
      setDuplicateSuccess(false);
    }
  }, [store?.duplicateSuccess]);

  useEffect(() => {
    console.log(`duplicateSuccess: ${duplicateSuccess}`);
    if(duplicateSuccess === true){
      setTimeout(() => {
        setDuplicateSuccess(false);
        console.log(store?.mapMarked?._id);
        navigate(`/map-edit/${store?.mapMarked?._id}`);
        window.location.reload();
        store.clearDuplicateSuccess();
      }, 2250);
    }
  }, [duplicateSuccess]);

  if(mapInfo?.errorMessage){
    return <Warning message={mapInfo?.errorMessage}/>;
  }

  if(!auth?.user){
    return <Warning message='Guest user has no permission to edit any map.'/>;
  }

  if(mapInfo?.currentMap?.ownerUserName !== auth?.user?.userName){
    return <Warning message="User has no permission to edit other user's private map."/>;
  }

  return (
    <Box>
      <MapEditTopBar/>
      { deleteSuccess && <SuccessAlert type='map-delete'/> }
      { publishSuccess && <SuccessAlert type='map-publish'/> }
      { saveSuccess && <SuccessAlert type='map-save'/> }
      { duplicateSuccess && <SuccessAlert type='map-duplicate'/>}
      <Box
        className="map-screen-container"
        style={{ 
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          flex: 1,
        }}
      >
        <MapScreen/>
        <MapEditSideBar/>
      </Box>
      <Modals/>
    </Box>
  );
}
