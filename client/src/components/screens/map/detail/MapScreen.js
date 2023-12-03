import { useState, useContext, useEffect, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import { DataEntryModal } from "../../../index";
// import html2canvas from 'html2canvas';
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import Alert from "@mui/material/Alert";

import MapContext from "../../../../contexts/map";
import { MapContainer, GeoJSON, CircleMarker } from "react-leaflet";
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
  const [dataEntryModalOpen, setDataEntryModalOpen] = useState(false);
  const dataEditModeRef = useRef();
  dataEditModeRef.current = mapInfo?.currentMapEditType !== "REGULAR";
  const mapTypeDataRef = useRef();
  mapTypeDataRef.current = mapInfo?.currentMap?.mapTypeData;
  const [initialLoad, setInitialLoad] = useState(true);
  const [regionNameLevel, setRegionNameLevel] = useState("");
  const [heatMapLayer, setHeatMapLayer] = useState(null);

  const [map, setMap] = useState(null);
  const [selectedRegionProps, setSelectedRegionProps] = useState(null);
  const [indexElementTobeChanged, setIndexElementTobeChanged] = useState(-1);
  const [geoJsonKey, setGeoJsonKey] = useState(1);
  const [mapContainterKey, setMapContainterKey] = useState(1);

  useEffect(() => {
    setEditMode(location.pathname.includes("map-detail") ? false : true);
  }, [location]);

  useEffect(() => {
    colorRef.current = mapInfo?.currentRegionColor;
  }, [mapInfo?.currentRegionColor]);

  useEffect(() => {
    setMap(mapInfo.currentMap);
  }, [mapInfo?.currentMap]);

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

  useEffect(() => {
    if (mapInfo?.currentMapEditType === "REGULAR") {
      dataEditModeRef.current = false;
    } else {
      dataEditModeRef.current = true;
    }
    setGeoJsonKey(geoJsonKey + 1);
    if (mapInfo?.currentMapEditType !== "HEATMAP" && mapContainerRef?.current && heatMapLayer) {
      mapContainerRef.current.removeLayer(heatMapLayer);
      setMapContainterKey(mapContainterKey + 1);
    }
  }, [mapInfo?.currentMapEditType]);

  useEffect(() => {
    if (!mapContainerRef?.current || !geoJsonRef?.current || !map) {
      return;
    }

    if (map.mapType === "HEATMAP") {
      const initialHeatMapLayer = new HeatmapOverlay({
        radius: regionNameLevel === "name" ? 7 : 0.5,
        maxOpacity: 1,
        scaleRadius: true,
        useLocalExtrema: true,
        latField: "lat",
        lngField: "lng",
        valueField: "value",
      });

      const heatMapdata = map?.mapTypeData
        ? map?.mapTypeData
        : {
            max: 0,
            data: [],
          };

      initialHeatMapLayer.setData(heatMapdata);
      mapContainerRef.current.addLayer(initialHeatMapLayer);
      setHeatMapLayer(initialHeatMapLayer);
    }
  }, [mapContainerRef?.current && geoJsonRef?.current, map?.mapType]);

  useEffect(() => {
    mapTypeDataRef.current = mapInfo?.currentMap?.mapTypeData;
  }, [mapInfo?.currentMap?.mapTypeData]);

  useEffect(() => {
    if (initialLoad && mapContainerRef?.current && geoJsonRef?.current) {
      mapInfo.setCurrentMapEditType(mapInfo?.currentMap?.mapType);
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

  if (!mapInfo || !mapContentRef?.current) {
    return null;
  }

  const handleFeatureClick = (event) => {
    const layer = event.sourceTarget;
    if (editMode && !dataEditModeRef.current) {
      event.target.setStyle({
        fillColor: colorRef.current,
        fillOpacity: 1,
      });
    }

    const position = layer.getBounds().getCenter();
    const regionName = layer.feature.properties[regionNameLevel].replace(
      /\0/g,
      ""
    );

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
      const index = mapTypeDataRef?.current?.data?.findIndex(
        (data) => data.regionName === regionName
      );
      if (index >= 0) {
        setIndexElementTobeChanged(index);
      }
      setDataEntryModalOpen(true);
    }
  };

  const editValue = (value) => {
    const mini = 10;
    const factor = 10;
    const radius = Math.floor(Math.log(value) * factor) + mini;
    
    const newDataObj = {
      lat: selectedRegionProps.position.lat,
      lng: selectedRegionProps.position.lng,
      value: value,
      regionName: selectedRegionProps.regionName,
      radius: radius,
    };

    if (indexElementTobeChanged >= 0) {
      mapTypeDataRef.current.data[indexElementTobeChanged] = newDataObj;
      if (map.mapType === "HEATMAP") {
        heatMapLayer.setData(mapTypeDataRef.current);
      }
    } else {
      if (map.mapType === "HEATMAP") {
        heatMapLayer.addData(newDataObj);
      }
    }

    mapInfo.updateMapTypeData(newDataObj, indexElementTobeChanged);
    setIndexElementTobeChanged(-1);
  };

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

    if (layer.feature.properties.fillColor && !dataEditModeRef.current) {
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

  const mapContent = (
    <>
      <DataEntryModal
        isOpen={dataEntryModalOpen}
        handleClose={() => setDataEntryModalOpen(false)}
        setData={editValue}
      />
      <MapContainer
        ref={mapContainerRef}
        key={mapContainterKey}
        id="map-viewer"
        style={{ width: editMode ? "70vw" : "100vw", zIndex: 0 }}
        center={[0, 0]}
        zoom={2}
      >
        <GeoJSON
          key={geoJsonKey}
          data={mapContentRef?.current}
          onEachFeature={onEachFeature}
          ref={geoJsonRef}
        />
        {map?.mapType === "GRADUATED_SYMBOL" && (
          <>
            {mapTypeDataRef?.current?.data?.map((prop) => {
              return (
                <CircleMarker
                  center={[prop.lat, prop.lng]}
                  radius={prop.radius}
                  fillOpacity={0.5}
                  stroke={false}
                  color={"red"}
                />
              );
            })}
          </>
        )}
      </MapContainer>
    </>
  );

  return <>{mapContent}</>;
}

export default MapScreen;
