import { useState, useContext, useEffect, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";

// import html2canvas from 'html2canvas';

import GeojsonMap from "./GeojsonMap";
// import KmlMap from './KmlMap';

import MapContext from "../../../../contexts/map";
import { MapContainer, GeoJSON, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";

function MapScreen() {
  const location = useLocation();
  const { mapId } = useParams();
  const { mapInfo } = useContext(MapContext);

  const mapContainerRef = useRef(null);
  const mapContentRef = useRef(null);
  const geoJsonRef = useRef(null);

  const [canColor, setCanColor] = useState(false);
  const colorRef = useRef();

  const [initialLoad, setInitialLoad] = useState(true);
  const [regionNameLevel, setRegionNameLevel] = useState("");

  const [map, setMap] = useState(null);

  useEffect(() => {
    mapInfo?.getMapById(mapId);
  }, [mapId]);

  useEffect(() => {
    setCanColor((location.pathname.includes("map-detail") ? false : true));
  }, [location]);

  useEffect(() => {
    colorRef.current = mapInfo?.currentRegionColor;
  }, [mapInfo?.currentRegionColor]);

  useEffect(() => {
    setMap(mapInfo.currentMap);
  }, [mapInfo?.currentMap]);

  useEffect(() => {
    mapContentRef.current = map?.mapContent;

    if(!mapContentRef?.current){
      return;
    }

    let max = -1;

    for (const obj of mapContentRef?.current) {
      const idNums = Object.keys(obj.properties)
        .filter((key) => key.includes("ID"))
        .map((id) => parseInt(id.charAt(3)));

      const currMax = Math.max(...idNums);

      if (!isNaN(currMax)) {
        max = Math.max(max, currMax);
      }
    }

    let name = (max === 3)
      ? "name_3"
      : (max === 2)
      ? "name_2"
      : (max === 1)
      ? "name_1"
      : (max === 0)
      ? "name_0"
      : "name";
    
      setRegionNameLevel(name);
  }, [map]);

  useEffect(() => {
    if (initialLoad && mapContainerRef?.current && geoJsonRef?.current) {
      if (Object.values(geoJsonRef.current._layers).length <= 0) {
        return;
      }
      let featureGroup = L.featureGroup(
        Object.values(geoJsonRef.current._layers)
      );
      mapContainerRef.current.fitBounds(featureGroup.getBounds());
      setInitialLoad(false);
    }
  }, [initialLoad && mapContainerRef?.current && geoJsonRef?.current])

  if (!mapInfo || !mapContentRef?.current) {
    return null;
  }

  const handleFeatureClick = (event) => {
    const layer = event.sourceTarget;

    if(canColor){
      event.target.setStyle({
        fillColor: colorRef.current,
        fillOpacity: 1,
      });
    }

    if(!layer.feature){
      return;
    }

    // update mapcontent ref
    const index = mapContentRef.current.findIndex(
      (region) => region.properties[regionNameLevel] === layer.feature.properties[regionNameLevel]
    );
    if (index !== -1 && canColor) {
      mapContentRef.current[index].properties.fillColor = colorRef.current;
    }

    mapInfo.updateMapContent(index, colorRef.current);
  };

  const onEachFeature = (feature, layer) => {
    if(!layer.feature){
      return;
    }

    console.log(layer.feature.properties);
    console.log(layer.feature.properties[regionNameLevel]);

    const name = (layer.feature.properties[regionNameLevel]) ?
                  layer.feature.properties[regionNameLevel] :
                  (
                    (layer.feature.properties["name_0"]) ? 
                      layer.feature.properties["name_0"] :
                      layer.feature.properties["name"]
                  );

    layer
    .bindTooltip(name, {
      permanent: true,
    })
    .openTooltip();
    

    if (layer.feature.properties.fillColor) {
      layer.setStyle({
        fillColor: layer.feature.properties.fillColor,
        fillOpacity: 1,
      });
    } else {
      layer.setStyle({
        fillColor: "#FFFFFF",
        fillOpacity: 1,
      });
    }
    
    layer.on({
      click: handleFeatureClick,
    });
  };

  const mapContent = (
    <>
      <MapContainer
        ref={mapContainerRef}
        style={{ height: "91vh" }}
        id="map-viewer"
        center={[0, 0]}
        zoom={2}
      >
        <GeoJSON
          data={mapContentRef?.current}
          onEachFeature={onEachFeature}
          ref={geoJsonRef}
        />
      </MapContainer>
    </>
  );

  return <>{mapContent}</>;
}

export default MapScreen;
