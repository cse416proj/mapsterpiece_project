import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Box } from "@mui/material";

import { MapCommentSideBox, MapDetailTopBar, MapScreen } from "../../../index";
import { DeleteMapModal, UnpublishMapModal, Warning, SuccessAlert } from "../../../index";

import MapContext from "../../../../contexts/map";
import GlobalStoreContext from "../../../../contexts/store";

export default function MapDetailsScreen() {
  const { mapInfo } = useContext(MapContext);
  const { store } = useContext(GlobalStoreContext);
  
  const { mapId } = useParams();
  const navigate = useNavigate();

  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [unpublishSuccess, setUnpublishSuccess] = useState(false);

  useEffect(() => {
    setDeleteSuccess(false);
    setUnpublishSuccess(false);
  }, []);

  useEffect(() => {
    if(mapId){
      mapInfo.getMapById(mapId);
    }
  }, [mapId]);

  useEffect(() => {
    if (mapInfo.currentMap) {
      mapInfo.getAllCommentsFromPublishedMap(mapId);
    }
  }, [mapInfo.currentMap]);

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

  // update & redirect if map got successfully unpublished
  useEffect(() => {
    if((store?.unpublishSuccess === true)){
      setUnpublishSuccess(true);
    }
    else{
      setUnpublishSuccess(false);
    }
  }, [store?.unpublishSuccess]);

  useEffect(() => {
    console.log(`unpublishSuccess: ${unpublishSuccess}`);
    if(unpublishSuccess === true){
      setTimeout(() => {
        navigate(`/map-edit/${mapId}`);
        store.clearUnpublishSuccess();
      }, 2250);
    }
  }, [unpublishSuccess]);

  return (
    <Box>
      {
        (mapInfo?.errorMessage) ?
          <Warning message={mapInfo?.errorMessage}/> :
          <>
            { deleteSuccess && <SuccessAlert type='map-delete'/> }
            { unpublishSuccess && <SuccessAlert type='map-unpublish'/> }
            <MapDetailTopBar/>
            <Box className="map-screen-container">
              <MapScreen/>
              <MapCommentSideBox/>
              <DeleteMapModal/>
              <UnpublishMapModal/>
            </Box>
          </>
      }
    </Box>
  );
}