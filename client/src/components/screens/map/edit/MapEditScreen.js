import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Box } from '@mui/material';

import MapEditTopBar from '../../../appbars/mapEdit/MapEditTopBar';
import MapEditSideBar from '../../../appbars/mapEdit/MapEditSideBar';

import MapScreen from '../detail/MapScreen';
import DeleteMapModal from '../../../modals/DeleteMapModal';
import MapContext from "../../../../contexts/map";
import AuthContext from "../../../../contexts/auth";

import { NoAccessWarning } from "../../../index";

export default function MapEditScreen() {
  const { mapInfo } = useContext(MapContext);
  const { auth } = useContext(AuthContext);
  const { mapId } = useParams();

  useEffect(() => {
    mapInfo?.getMapById(mapId);
  }, [mapId]);

  if(!auth.user){
    return <NoAccessWarning/>
  }

  return (
    <Box>
      <MapEditTopBar/>
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
    </Box>
  );
}
