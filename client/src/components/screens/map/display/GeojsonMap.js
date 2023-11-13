import { MapContainer, GeoJSON } from "react-leaflet";

function GeojsonMap({map}){
    if(!map || !map.features){
        return null;
    }

    console.log(map);

    // handle display region names
    const handleRegionDisplay = (country, layer) => {
        if (country.properties.admin) {
        layer.bindPopup(country.properties.admin);
        } else {
        layer.bindPopup(
            country.properties.ENGTYPE_1
            ? country.properties.NAME_1
            : country.properties.ENGTYPE_2
            ? country.properties.NAME_2
            : country.properties.ENGTYPE_3
            ? country.properties.NAME_3
            : country.properties.NAME_0
            ? country.properties.NAME_0
            : country.properties.NAME
        );
        }
    };
        
    return (
        <MapContainer
            center={[0, 0]}
            zoom={2}
            id='map-viewer'
        >
            <GeoJSON data={map} onEachFeature={handleRegionDisplay} />
        </MapContainer>
    );
}

export default GeojsonMap;