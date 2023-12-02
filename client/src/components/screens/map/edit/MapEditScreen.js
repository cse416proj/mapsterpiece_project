import React, { useContext, useState, useEffect } from "react";
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

  if(!auth.user){
    return <Warning message='You have no permission to access this page. Please login first if you think you are the owner!'/>
  }

  return (
    <Box>
      <MapEditTopBar/>
      { deleteSuccess && <SuccessAlert type='map-delete'/> }
      { publishSuccess && <SuccessAlert type='map-publish'/> }
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
