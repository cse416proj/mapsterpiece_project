import { Box, Card, CardContent, Typography, Chip, Stack } from "@mui/material";

import ActionButtons from "./ActionButtons";

function MapCard({mapData, clickHandler}){
    return(
        <Card className="individualDynamicCard">
            <CardContent
                style={{ height: `100%`, background: `#86C9B5` }}
                className="cardContent"
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
                        Published by @{mapData.ownerUserName}
                    </Typography>
                </Box>
                <Stack direction="row" spacing={1}>
                    {
                        mapData.tags.map((tag) => (
                            <Chip label={tag} size="small" style={{ color: 'white' }}/>
                        ))
                    }
                </Stack>
                <ActionButtons
                    type='map'
                    comments={mapData.comments}
                />
            </CardContent>
        </Card>
    )
}

export default MapCard;