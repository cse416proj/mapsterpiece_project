import { MapContainer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function GeojsonMap({ map }) {
console.log(map)
  return (
    <MapContainer center={[0,0]} zoom={2} id="map-viewer">
      <GeoJSON data={map} />
    </MapContainer>
  );
}

export default GeojsonMap;
