
import { Box } from "@mui/material";

import { DeleteMapModal, MapCommentSideBox, MapDetailTopBar, MapScreen } from "../../../index";
// import AuthContext from "../../../../contexts/auth";

export default function MapDetailsScreen() {
  return (
    <Box>
      <MapDetailTopBar/>
      <Box
        className="map-screen-container"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          flex: 1,
        }}
      >
        <MapScreen />
        <MapCommentSideBox/>
        <DeleteMapModal />
      </Box>
    </Box>
  );
}