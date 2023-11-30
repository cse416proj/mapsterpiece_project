import { useContext } from "react";

import { Box, Alert, AlertTitle, Typography } from "@mui/material";
import ExploreOffIcon from '@mui/icons-material/ExploreOff';

import { DeleteMapModal, MapCommentSideBox, MapDetailTopBar, MapScreen, Warning } from "../../../index";
import MapContext from "../../../../contexts/map";

export default function MapDetailsScreen() {
  const { mapInfo } = useContext(MapContext);

  // function renderAlert(){
  //   return(
  //     <Alert
  //       severity="success"
  //       className="popUpBox" style={{ zIndex: 1000 }}
  //       iconMapping={{
  //         success: <ExploreOffIcon style={{ height: '7.5vw', width: '7.5vw', color: 'var(--icon)' }}/> 
  //       }}
  //     >
  //       <AlertTitle style={{ fontSize: '2.5vw' }}>Map deleted!</AlertTitle>
  //       <Typography variant='h6' style={{ fontSize: '1.5vw' }}>Redirecting...</Typography>
  //     </Alert>
  //   )
  // }

  return (
    <Box>
      {
        (mapInfo?.errorMessage) ?
          <Warning message={mapInfo?.errorMessage}/> :
          <>
            <MapDetailTopBar/>
            {/* { renderAlert() } */}
            <Box className="map-screen-container">
              <MapScreen/>
              <MapCommentSideBox/>
              <DeleteMapModal/>
            </Box>
          </>
      }
    </Box>
  );
}