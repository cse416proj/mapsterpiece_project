import { useContext } from "react";
import { Box, Card, CardContent, Typography, Chip, Stack } from "@mui/material";

import { formatDistanceToNow } from 'date-fns';

import ActionButtons from "./ActionButtons";
import GlobalStoreContext from "../../../contexts/store";

export default function MapCard({mapData, clickHandler, editHandler, deleteHandler}){
    const { store } = useContext(GlobalStoreContext);

    function handlePublish(event){
        event.stopPropagation();
        event.preventDefault();
        store.markMapForPublish(mapData);
    };

    function handleUnpublish(event){
        event.stopPropagation();
        event.preventDefault();
        store.markMapForUnpublish(mapData);
    };

    function getTimestamp(){
        try{
            const time = (mapData?.isPublished) ? mapData.datePublished : mapData.dateEdited;
            const parsedDate = new Date(time);
            const timeFromNow = formatDistanceToNow(parsedDate);
            return ` ${timeFromNow} ago`;
        }
        catch(error){
            console.log(error);
        }
    }

    if(!mapData){
        return null;
    }

    return(
        <Card className="individualDynamicCard">
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
                        { getTimestamp() }
                    </Typography>
                </Box>
                <Stack direction="row" spacing={1}>
                    {
                        mapData.tags?.map((tag) => (
                            <Chip key={tag} label={tag} size="small" style={{ color: 'white' }}/>
                        ))
                    }
                </Stack>
                <ActionButtons
                    type='map'
                    cardId={mapData._id}
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