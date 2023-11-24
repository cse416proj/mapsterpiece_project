import { Box } from "@mui/material";

import { MapScreen, DeleteMapModal } from "../../index";
import { MapDetailTopBar } from "../../appbars/MapDetailTopBar";
import CommentsSideBox from "../../appbars/CommentsSideBox";

export default function MapDetailsScreen(){
    return (
        <Box>
            <MapDetailTopBar/>
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
                <CommentsSideBox/>
                <DeleteMapModal/>
            </Box>
        </Box>
    );
}