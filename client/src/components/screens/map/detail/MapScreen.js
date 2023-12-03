import { useState, useContext, useEffect, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Modals, DataEntryModal } from "../../../index";
// import html2canvas from 'html2canvas';
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import Alert from "@mui/material/Alert";

import { DataInfoControl, LegendControl } from "../index";
import MapContext from "../../../../contexts/map";
import { MapContainer, GeoJSON, ZoomControl,  LayersControl, TileLayer } from "react-leaflet";
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
  const heatmapDataRef = useRef();
  heatmapDataRef.current = mapInfo?.currentMap?.heatmapData;
  const [initialLoad, setInitialLoad] = useState(true);
  const [regionNameLevel, setRegionNameLevel] = useState("");
  const [heatMapLayer, setHeatMapLayer] = useState(null);

  const [map, setMap] = useState(null);
  const [selectedRegionProps, setSelectedRegionProps] = useState(null);
  const [indexElementTobeChanged, setIndexElementTobeChanged] = useState(-1);

  const [currProp, setCurrProp] = useState('gdp_md');
  const [currLayer, setCurrLayer] = useState(null);
  const [coloredRegion, setColoredRegion] = useState({});
  const [currMaxData, setCurrMaxData] = useState([]);
  const [palette, setpalette] = useState([]);

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

  // come back later: do sth when mapContent changes
  useEffect(() => {
    if(mapContentRef?.current){
      console.log(`mapContentRef?.current start`);
      console.log(mapContentRef?.current);
      console.log(`mapContentRef?.current end`);

      setCurrMaxData(Math.max(...mapContentRef?.current?.map((feature) => feature.properties[currProp])));
      setpalette(['#FF0000', '#FF8800', '#FFFF00', '#88FF00', '#00FF00']);
    }
  }, [mapContentRef?.current]);

  // get color for corresponding data from each feature
  function getColor(data){
    const levels = 5
    const step = 14342903 / levels;

    const index = Math.min(Math.floor(data / step), levels-1);
    return palette[index];
  }

  // get region name from each feature
  function getRegionName(feature){
    if(!feature){
      return '';
    }
    return(
      feature.properties[regionNameLevel]
        ? feature.properties[regionNameLevel]
        : feature.properties["name_0"]
        ? feature.properties["name_0"]
        : feature.properties["name"]
    )
  }

  // get style for each feature
  const getFeatureStyle = (feature) => {
    // REGULAR MAP
    if (editMode && !dataEditModeRef.current) {
      const colorKey = getRegionName(feature);
      const color = (coloredRegion[colorKey]) ? coloredRegion[colorKey] : feature.properties.fillColor;
      if(color){
        return {
          fillColor: color,
          color: color,
          fillOpacity: 1,
          dashArray: ''
        }
      }
      else if(JSON.stringify(currLayer?.feature) === JSON.stringify(feature)){
        console.log('hovering');
        return {
          weight: 5,
          color: '#86C9B5',
          dashArray: '',
          fillOpacity: 0.7
        };
      }
      else{
        return {
          color: 'white',
          weight: 2,
          opacity: 1,
          dashArray: '3',
          fillOpacity: 0.7
        }
      }
    }

    // 5 MAP TYPES
    if(JSON.stringify(currLayer?.feature) === JSON.stringify(feature)){
      console.log('hovering');
      return {
        weight: 5,
        color: '#86C9B5',
        dashArray: '',
        fillOpacity: 0.7
      };
    }

    if(mapInfo?.currentMapEditType === "CHOROPLETH"){
      return {
        fillColor: getColor(feature.properties[currProp]),
        color: 'white',
        weight: 2,
        opacity: 1,
        dashArray: '3',
        fillOpacity: 0.7
      }
    }

    return {
      color: 'white',
      weight: 2,
      opacity: 1,
      dashArray: '3',
      fillOpacity: 0.7
    }
  }

  // clear color fill, update map type in map object & determine if this map type suppoesd to edit by data when map type changes in edit screen
  useEffect(() => {
    if (geoJsonRef?.current) {
      geoJsonRef?.current?.resetStyle();
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

  // // auto zoom when load map content into geojson
  // useEffect(() => {
  //   if (initialLoad && mapContainerRef?.current && geoJsonRef?.current) {
  //     if (Object.values(geoJsonRef.current._layers).length <= 0) {
  //       return;
  //     }
  //     let featureGroup = L.featureGroup(
  //       Object.values(geoJsonRef.current._layers)
  //     );

  //     console.log(featureGroup);

  //     mapContainerRef.current.fitBounds(featureGroup.getBounds());
  //     setInitialLoad(false);
  //   }
  // }, [initialLoad && mapContainerRef?.current && geoJsonRef?.current]);

  // render when map type changes
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

  // set current heatmap data
  useEffect(() => {
    heatmapDataRef.current = mapInfo?.currentMap?.heatmapData;
  }, [mapInfo?.currentMap?.heatmapData]);

  // auto zoom when load map content into geojson
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

  // when map region is clicked
  const handleFeatureClick = (event) => {
    const layer = event.sourceTarget;

    const regularMode = (editMode && !dataEditModeRef.current);

    // REGULAR MAP DISPLAY
    if(regularMode && layer?.feature) {
      setColoredRegion((prevColoredRegion) => {
        const newColoredRegion = { ...prevColoredRegion };
        const colorKey = getRegionName(layer.feature);
        newColoredRegion[colorKey] = colorRef.current;
        return newColoredRegion;
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
    if (index !== -1 && regularMode) {
      mapContentRef.current[index].properties.fillColor = colorRef.current;
      mapInfo.updateMapContent(index, colorRef.current);
    }

    if (dataEditModeRef.current) {
      const index = heatmapDataRef?.current?.data?.findIndex(
        (data) => data.regionName === regionName
      );
      if (index >= 0) {
        setIndexElementTobeChanged(index);
      }
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
    };

    if (map.mapType === "HEATMAP") {
      if (indexElementTobeChanged >= 0) {
        heatmapDataRef.current.data[indexElementTobeChanged] = newDataObj;
        heatMapLayer.setData(heatmapDataRef.current);
      } else {
        heatMapLayer.addData(newDataObj);
      }

      mapInfo.updateHeatmapData(newDataObj, indexElementTobeChanged);
      setIndexElementTobeChanged(-1);
    }
  };

  // highlight region when hover
  const highlightFeature = (event) => {
    console.log('highlightFeature');
    const layer = event.sourceTarget;
    layer.bringToFront();
    setCurrLayer(layer);
  }

  // reset style when not hover
  const resetHighlight = (event) => {
    console.log('resetHighlight');
    const layer = event.sourceTarget;
    geoJsonRef?.current?.resetStyle(layer);
    setCurrLayer(null);
  }

  // render color and show text for each regions
  const onEachFeature = (feature, layer) => {
    if (!layer.feature) {
      return;
    }

    // // come back later
    // const name = getRegionName(layer);

    // layer
    //   .bindTooltip(name, {
    //     permanent: true,
    //   })
    //   .openTooltip();

    // if (layer.feature.properties.fillColor) {
    //   layer.setStyle({
    //     fillColor: layer.feature.properties.fillColor,
    //     fillOpacity: 1,
    //   });
    // } else {
    //   layer.setStyle({
    //     fillColor: "#FFFFFF",
    //     fillOpacity: 0.1,
    //   });
    // }

    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: handleFeatureClick,
    });
  };

  const mapContent = (
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
        zoomControl={false}
      >
        <LayersControl position='topleft'>
          <LayersControl.Overlay name="Show Tile Layer (Light Mode)">
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Show Tile Layer (Dark Mode)">
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
            />
          </LayersControl.Overlay>
        </LayersControl>

        <ZoomControl position='topleft'/>

        <DataInfoControl
          type={mapInfo?.currentMapEditType}
          property={currProp}
          regionName={getRegionName(currLayer?.feature)}
          data={currLayer?.feature?.properties}
        />

        <LegendControl
          legendTitle='legend'
          type={mapInfo?.currentMapEditType}
          max={currMaxData}
          getColor={getColor}
        />

        <GeoJSON
          data={mapContentRef?.current}
          style={getFeatureStyle}
          onEachFeature={onEachFeature}
          ref={geoJsonRef}
        />
      </MapContainer>
    </>
  );

  return <>{mapContent}</>;
}

export default MapScreen;