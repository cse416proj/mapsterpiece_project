import React, { useContext, useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Box } from "@mui/material";

import { MapEditTopBar, MapEditSideBar, MapScreen } from "../../../index";
import { DeleteMapModal, PublishMapModal, Warning, SuccessAlert, DuplicateMapModal } from "../../../index";

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
  const [duplicateSuccess, setDuplicateSuccess] = useState(false);

  useEffect(() => {
    setDeleteSuccess(false);
    setPublishSuccess(false);
    setDuplicateSuccess(false);

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

  // duplicate & redirect if map got successfully duplicated
  useEffect(() => {
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
        console.log(store.mapMarked);
        navigate(`/map-edit/${store.mapMarked._id}`);
        window.location.reload();
        store.clearDuplicateSuccess();
      }, 2250);
    }
  }, [duplicateSuccess]);

  if(!auth.user){
    return <Warning message='You have no permission to access this page. Please login first if you think you are the owner!'/>
  }

  return (
    <Box>
      <MapEditTopBar/>
      { deleteSuccess && <SuccessAlert type='map-delete'/> }
      { publishSuccess && <SuccessAlert type='map-publish'/> }
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
      <DeleteMapModal/>
      <PublishMapModal/>
      <DuplicateMapModal/>
    </Box>
  );
}
