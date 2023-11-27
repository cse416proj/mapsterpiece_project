import { useState, useContext, useEffect, useParams, useRef } from "react";
import { Box } from "@mui/material";
// import html2canvas from 'html2canvas';

import GeojsonMap from "./GeojsonMap";
// import KmlMap from './KmlMap';

import MapContext from "../../../../contexts/map";
import { MapContainer, GeoJSON, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";

function MapScreen() {
  const { mapInfo } = useContext(MapContext);
  const mapContainerRef = useRef();
  const mapContentRef = useRef();
  const geoJsonRef = useRef();
  const [color, setColor] = useState("#fff");
  const colorRef = useRef();
  const [initialLoad, setInitialLoad] = useState(true);
  const [regionNameLevel, setRegionNameLevel] = useState("");

  useEffect(() => {
    colorRef.current = mapInfo?.currentRegionColor;
  }, [mapInfo?.currentRegionColor]);

  useEffect(() => {
    mapContentRef.current = mapInfo?.currentMap?.mapContent;
  }, [mapInfo?.currentMap?.mapContent]);

  useEffect(() => {
    if(!mapContentRef?.current){
      return;
    }

    const individualProperties = mapContentRef?.current[0]?.properties;
    let name = individualProperties.ID_3
      ? "name_3"
      : individualProperties.ID_2
      ? "name_2"
      : individualProperties.ID_1
      ? "name_1"
      : individualProperties.ID_0
      ? "name_0"
      : "name";
    
      setRegionNameLevel(name);
  }, []);

  if (!mapInfo || !mapContentRef?.current) {
    return null;
  }

  const handleFeatureClick = (event) => {
    const layer = event.sourceTarget;
    event.target.setStyle({
      fillColor: colorRef.current,
      fillOpacity: 1,
    });

    // update mapcontent ref
    const index = mapContentRef.current.findIndex(
      (region) => region.properties[regionNameLevel] === layer.feature.properties[regionNameLevel]
    );
    if (index !== -1) {
      mapContentRef.current[index].properties.fillColor = colorRef.current;
    }

    mapInfo.updateMapContent(index, colorRef.current);
  };

  const onEachFeature = (feature, layer) => {
    layer
      .bindTooltip(layer.feature.properties[regionNameLevel], {
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

  return <>{mapContent}</>;
}

export default MapScreen;
