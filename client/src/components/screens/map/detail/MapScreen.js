import { useState, useContext, useEffect, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Modals, DataEntryModal } from "../../../index";
// import html2canvas from 'html2canvas';
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";

import MapContext from "../../../../contexts/map";
import { MapContainer, GeoJSON } from "react-leaflet";
import HeatmapOverlay from "heatmap.js/plugins/leaflet-heatmap";

function MapScreen() {
  const location = useLocation();
  // const { mapId } = useParams();
  const { mapInfo } = useContext(MapContext);

  const mapContainerRef = useRef(null);
  const mapContentRef = useRef(null);
  const geoJsonRef = useRef(null);

  const colorRef = useRef();
  const [editMode, setEditMode] = useState(false);
  const [dataEditMode, setDataEditMode] = useState(
    mapInfo?.currentMap?.mapType !== "REGULAR"
  );
  const dataEditModeRef = useRef(dataEditMode);
  const [dataEntryModalOpen, setDataEntryModalOpen] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [regionNameLevel, setRegionNameLevel] = useState("");
  const [heatMapLayer, setHeatMapLayer] = useState(null);

  const [map, setMap] = useState(null);
  const [selectedRegionProps, setSelectedRegionProps] = useState(null);

  // determine if we are on map-edit screen or map-detail screen
  useEffect(() => {
    setEditMode(location.pathname.includes("map-detail") ? false : true);
  }, [location]);

  // color region
  useEffect(() => {
    colorRef.current = mapInfo?.currentRegionColor;
  }, [mapInfo?.currentRegionColor]);

  // update map when currentMap changes
  useEffect(() => {
    setMap(mapInfo.currentMap);
  }, [mapInfo?.currentMap]);

  // clear color fill, update map type in map object & determine if this map type suppoesd to edit by data when map type changes in edit screen
  useEffect(() => {
    if (geoJsonRef?.current) {
      geoJsonRef.current.setStyle({
        fillColor: "transparent",
        fillOpacity: 0,
      });
    }

    setMap((prevMap) => ({
      ...prevMap,
      mapType: mapInfo?.currentMapEditType
    }))

    if (mapInfo?.currentMapEditType === "REGULAR") {
      dataEditModeRef.current = false;
    } else {
      dataEditModeRef.current = true;
    }
  }, [mapInfo?.currentMapEditType]);

  // update map region names when map changes
  useEffect(() => {
    mapContentRef.current = map?.mapContent;

    if (!mapContentRef?.current) {
      return;
    }

    let max = -1;

    const nameProperties = mapContentRef.current[0].properties;
    for (const key in nameProperties) {
      max = Math.max(max, parseInt(key.split("_")[1]));
    }

    let name =
      max === 3
        ? "name_3"
        : max === 2
        ? "name_2"
        : max === 1
        ? "name_1"
        : max === 0
        ? "name_0"
        : "name";
    setRegionNameLevel(name);
  }, [map]);

  // auto zoom when load map content into geojson
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
  }, [initialLoad && mapContainerRef?.current && geoJsonRef?.current]);


  // render when map type changes
  useEffect(() => {
    if (!mapContainerRef?.current || !geoJsonRef?.current || !map) {
      return;
    }

    if (map.mapType === "HEATMAP") {
      const initialHeatMapLayer = new HeatmapOverlay({
        radius: 3,
        maxOpacity: 1,
        scaleRadius: true,
        useLocalExtrema: true,
        latField: "lat",
        lngField: "lng",
        valueField: "value",
      });
  
      const heatMapdata = map?.heatmapData
        ? map?.heatmapData
        : {
            max: 0,
            data: [],
          };
  
      initialHeatMapLayer.setData(heatMapdata);
      mapContainerRef.current.addLayer(initialHeatMapLayer);
      setHeatMapLayer(initialHeatMapLayer);
    }
  }, [mapContainerRef?.current && geoJsonRef?.current, map?.mapType]);

  if (!mapInfo || !mapContentRef?.current) {
    return null;
  }

  // when map region is clicked
  const handleFeatureClick = (event) => {
    const layer = event.sourceTarget;

    // region will be colored if map is in edit mode & not belongs to 5 map type
    if (editMode && !dataEditModeRef.current) {
      event.target.setStyle({
        fillColor: colorRef.current,
        fillOpacity: 1,
      });
    }

    const position = layer.getBounds().getCenter();
    const regionName = layer.feature.properties[regionNameLevel];
    setSelectedRegionProps({ position, regionName });

    if (!layer.feature) {
      return;
    }

    // update mapcontent ref
    const index = mapContentRef.current.findIndex(
      (region) =>
        region.properties[regionNameLevel] ===
        layer.feature.properties[regionNameLevel]
    );
    if (index !== -1 && editMode && !dataEditModeRef.current) {
      mapContentRef.current[index].properties.fillColor = colorRef.current;
      mapInfo.updateMapContent(index, colorRef.current);
    }

    if (dataEditModeRef.current) {
      setDataEntryModalOpen(true);
    }
  };

  // edit data value for region on click
  const editValue = (value) => {
    const newDataObj = {
      lat: selectedRegionProps.position.lat,
      lng: selectedRegionProps.position.lng,
      value: value,
      regionName: selectedRegionProps.regionName,
    }

    if (map.mapType === "HEATMAP") {
      heatMapLayer.addData(newDataObj);
      mapInfo.updateHeatmapData(newDataObj);
    }
  };

  // render color and show text for each regions
  const onEachFeature = (feature, layer) => {
    if (!layer.feature) {
      return;
    }

    const name = layer.feature.properties[regionNameLevel]
      ? layer.feature.properties[regionNameLevel]
      : layer.feature.properties["name_0"]
      ? layer.feature.properties["name_0"]
      : layer.feature.properties["name"];

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
        fillOpacity: 0.1,
      });
    }

    layer.on({
      click: handleFeatureClick,
    });
  };

  return (
    <>
      <Modals/>
      <DataEntryModal
        isOpen={dataEntryModalOpen}
        handleClose={() => setDataEntryModalOpen(false)}
        setData={editValue}
      />
      <MapContainer
        ref={mapContainerRef}
        id="map-viewer"
        style={{ width: editMode ? "70vw" : "100vw", zIndex: 0 }}
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
}

export default MapScreen;
