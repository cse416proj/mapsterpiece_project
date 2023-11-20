import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Card, CardContent, Typography, Chip, Stack } from "@mui/material";

import ActionButtons from "./ActionButtons";
import MapContext from "../../contexts/map";

function MapCard({mapData, clickHandler, editHandler, deleteHandler}){
    const { mapInfo } = useContext(MapContext);

    function handlePublish(event){
        event.stopPropagation();
        event.preventDefault();
        mapInfo.publishMapById(mapData._id);
    };

    function handleUnpublish(event){
        event.stopPropagation();
        event.preventDefault();
        mapInfo.unpublishMapById(mapData._id);
    };

    return(
        <Card className="individualDynamicCard" >
            <CardContent
                className="cardContent"
                style={{ height: `100%`, background: `#86C9B5` }}
                onClick={clickHandler}
            >
                <Box className="flex-row">
                    <Typography
                        sx={{ fontSize: 16, fontWeight: `bold` }}
                        color="black"
                        gutterBottom
                    >
                        {mapData.title}
                    </Typography>
                    <Typography
                        sx={{ fontSize: 12, marginLeft: 3 }}
                        color="white"
                        gutterBottom
                    >
                        { (mapData.isPublished) ? 'Published' : 'Created' } by @{mapData.ownerUserName}
                    </Typography>
                </Box>
                <Stack direction="row" spacing={1}>
                    {
                        mapData.tags.map((tag) => (
                            <Chip key={tag} label={tag} size="small" style={{ color: 'white' }}/>
                        ))
                    }
                </Stack>
                <ActionButtons
                    type='map'
                    currentUserName={mapData.ownerUserName}
                    comments={mapData.comments}
                    deleteHandler = {deleteHandler}
                    editHandler={editHandler}
                    isPublished={mapData.isPublished}
                    publishHandler={handlePublish}
                    unpublishHandler={handleUnpublish}
                />
            </CardContent>
        </Card>
    )
}

export default MapCard;