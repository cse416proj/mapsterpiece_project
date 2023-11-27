import { Box } from '@mui/material';
import React, { useContext, useState, useEffect } from "react";
import MapEditTopBar from '../../../appbars/MapEditTopBar';
import MapEditSideBar from '../../../appbars/MapEditSideBar';

import MapScreen from '../../map/display/MapScreen';
import DeleteMapModal from '../../../modals/DeleteMapModal';
import MapContext from "../../../../contexts/map";
import { useParams } from "react-router-dom";

export default function MapEditScreen() {
  const { mapInfo } = useContext(MapContext);
  const { mapId } = useParams();
  useEffect(() => {
    mapInfo?.getMapById(mapId);
  }, [mapId]);
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
