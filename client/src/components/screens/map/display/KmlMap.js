import ReactLeafletKml from 'react-leaflet-kml';
import { MapContainer, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css";

function KmlMap({map}){
    if(!map){
        return null;
    }

    console.log(map);

    return (
        <MapContainer
            center={[0, 0]}
            zoom={2}
            id='map-viewer'
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <ReactLeafletKml kml={map}/>
        </MapContainer>
    );
}

export default KmlMap;