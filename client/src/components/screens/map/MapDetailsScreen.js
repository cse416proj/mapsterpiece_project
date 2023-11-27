import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { MapScreen, DeleteMapModal, MapDetailTopBar } from "../../index";
import CommentsSideBox from "../../appbars/CommentsSideBox";
import MapContext from "../../../contexts/map";

export default function MapDetailsScreen(){
    const { mapInfo } = useContext(MapContext);
    const { mapId } = useParams();
    
    useEffect(() => {
        mapInfo?.getMapById(mapId);
    }, [mapId]);

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