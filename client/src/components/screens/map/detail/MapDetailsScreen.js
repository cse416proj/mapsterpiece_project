import { useContext } from "react";

import { Box } from "@mui/material";
import { DeleteMapModal, MapCommentSideBox, MapDetailTopBar, MapScreen, Warning } from "../../../index";

import MapContext from "../../../../contexts/map";

export default function MapDetailsScreen() {
  const { mapInfo } = useContext(MapContext);

  return (
    <Box>
      {
        (mapInfo?.errorMessage) ?
          <Warning message={mapInfo?.errorMessage}/> :
          <>
            <MapDetailTopBar/>
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