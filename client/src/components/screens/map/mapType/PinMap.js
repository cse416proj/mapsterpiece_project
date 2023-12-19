import * as L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import markerIcon from "leaflet/dist/images/marker-icon.png";

import { Box, Typography } from '@mui/material';

export default function PinMap({data}){
    if(!data){
        return null;
    }

    return (
        <div>
            {data.map((prop) => {
                const icon = L.icon({
                    iconUrl: markerIcon,
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                });
                return (
                    <Marker
                        position={[prop.lat, prop.lng]}
                        title={prop?.regionName}
                        alt={`marker for ${prop?.regionName}`}
                        icon={icon}
                    >
                        <Popup>
                            {(prop.properties.length === 0) ?
                                ( `No properties has added for ${prop?.regionName} yet.` ) : (
                                <Box className='flex-column'>
                                    {prop.properties.map((property) => {
                                        return (
                                            <Typography variant='p'>
                                                {property.property}: {property.value}
                                            </Typography>
                                        );
                                    })}
                                </Box>
                            )}
                        </Popup>
                    </Marker>
                );
            })}
        </div>
    )
}