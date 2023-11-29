
import { Box } from "@mui/material";
import { DeleteMapModal, MapCommentSideBox, MapDetailTopBar, MapScreen } from "../../../index";

export default function MapDetailsScreen() {
  return (
    <Box>
      <MapDetailTopBar/>
      <Box className="map-screen-container">
        <MapScreen/>
        <MapCommentSideBox/>
        <DeleteMapModal/>
      </Box>
    </Box>
  );
}