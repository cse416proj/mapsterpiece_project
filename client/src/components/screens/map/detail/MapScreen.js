import { useState, useContext, useEffect, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Modals, DataEntryModal, PinDataEntryModal } from "../../../index";
// import html2canvas from 'html2canvas';
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";

import { DataInfoControl, LegendControl } from "../index";
import MapContext from "../../../../contexts/map";
import { MapContainer, GeoJSON, ZoomControl,  LayersControl, TileLayer, CircleMarker, Marker, Popup } from "react-leaflet";
import HeatmapOverlay from "heatmap.js/plugins/leaflet-heatmap";
import tinycolor from "tinycolor2";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import { Typography, Box } from "@mui/material";

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
  const [pinDataEntryModal, setPinDataEntryModal] = useState(false);
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

  // to be replaced with currentMap.property, currentMap.mapTypeData.max, currentMap.mapTypeData.color later
  // const [currProp, setCurrProp] = useState('gdp_md');
  const [currProp, setCurrProp] = useState('property');
  const [currMaxData, setCurrMaxData] = useState(mapInfo?.currentMap?.mapTypeData?.max);
  const [currColor, setCurrColor] = useState('#86C9B5');
  const [latLng, setLatLng] = useState(null);
  const [pinMapTypeData, setPinMapTypeData] = useState({
    property1: '',
    property2: '',
    property3: '',
  });

  // const [palette, setPalette] = useState([]);
  const [currLayer, setCurrLayer] = useState(null);
  const [coloredRegion, setColoredRegion] = useState({});

  const hoverRegionStyle = {
    color: '#86C9B5',
    fillOpacity: 0.7,
    dashArray: '',
    weight: 5,
  };

  const defaultRegionStyle = {
    fillColor: "#FFFFFF",
    fillOpacity: 0.1,
    opacity: 1,
    dashArray: '3',
    weight: 2
  };

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

  // // if map type changes & it is choropleth map, find the palette
  // useEffect(() => {
  //   if(map?.mapType === "CHOROPLETH" || mapInfo?.currentMapEditType === "CHOROPLETH"){
  //     const minLight = 0.35;
  //     const maxLight = 0.65;
      
  //     // calculate 4 steps away from current color
  //     const colorObj = tinycolor('#86C9B5');
  //     const palette = new Array(5);
  //     const steps = 4;
  //     const calcLight = (i) => (i * (maxLight - minLight)) / steps + minLight;

  //     // generate palette from darkest and lightest
  //     for(let i = 0; i < palette.length; i++) {
  //       const baseColor = colorObj.clone().toHsl();
  //       const outputColor = { ...baseColor, l: calcLight(i) };
  //       palette[i] = tinycolor(outputColor).toHexString();
  //     }

  //     // rank from lightest to darkesst
  //     setPalette(palette.reverse());
  //   }
  // }, [map?.mapType]);

  // // come back later: do sth when mapContent changes for choropleth
  // useEffect(() => {
  //   if(mapContentRef?.current){
  //     setCurrMaxData(Math.max(...mapContentRef?.current?.map((feature) => feature.properties[currProp])));
  //   }
  // }, [mapContentRef?.current]);

  function getPalette(){
    const minLight = 0.35;
    const maxLight = 0.65;
    
    // calculate 4 steps away from current color
    const colorObj = tinycolor('#86C9B5');
    const palette = new Array(5);
    const steps = 4;
    const calcLight = (i) => (i * (maxLight - minLight)) / steps + minLight;

    // generate palette from darkest and lightest
    for(let i = 0; i < palette.length; i++) {
      const baseColor = colorObj.clone().toHsl();
      const outputColor = { ...baseColor, l: calcLight(i) };
      palette[i] = tinycolor(outputColor).toHexString();
    }

    return palette.reverse();
  }

  // get color for corresponding data from each feature
  function getColor(data){
    const palette = getPalette();
    console.log(palette)

    const levels = 5
    const max = (currMaxData) ? currMaxData : mapInfo?.currentMap?.mapTypeData?.max;
    const step = max / levels;

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
    if(!feature){
      return defaultRegionStyle;
    }

    // REGULAR MAP
    if (editMode && !dataEditModeRef.current) {
      console.log('regular');
      const colorKey = getRegionName(feature);
      const color = (coloredRegion[colorKey]) ? coloredRegion[colorKey] : feature.properties.fillColor;
      if(color){
        return {
          fillColor: color,
          fillOpacity: 0.7,
          color: ((JSON.stringify(currLayer?.feature) === JSON.stringify(feature))) ? '#86C9B5' : color,
          weight: ((JSON.stringify(currLayer?.feature) === JSON.stringify(feature))) ? 5 : 2,
          dashArray: '',
        };
      }
      else if(JSON.stringify(currLayer?.feature) === JSON.stringify(feature)){
        return hoverRegionStyle;
      }
      return defaultRegionStyle;
    }

    console.log('five map types');
    // 5 MAP TYPES
    if(JSON.stringify(currLayer?.feature) === JSON.stringify(feature)){
      return hoverRegionStyle;
    }

    // CHOROPLETH MAP HAS TO FILL COLORS BY INTENSITY
    if(map?.mapType === "CHOROPLETH"){
      let i = -1;
      for(i = 0; i < map.mapTypeData?.data?.length; i++){
        const currData = map.mapTypeData?.data[i];
        if(currData.regionName === getRegionName(feature)){
          break;
        }
      }

      console.log(`index: ${i}`)

      return {
        // fillColor: (i > -1) ? getColor(feature.properties[currProp]) : 'white',
        fillColor: (i>-1 && map.mapTypeData?.data[i]) ? getColor(map.mapTypeData?.data[i].value) : 'white',
        fillOpacity: 0.7,
        color: 'white',
        opacity: 1,
        dashArray: '2',
        weight: 2
      }
    }

    return defaultRegionStyle;
  }

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

  // clear color fill, update map type in map object & determine if this map type suppoesd to edit by data when map type changes in edit screen
  useEffect(() => {
    if (geoJsonRef?.current) {
      geoJsonRef?.current?.resetStyle();
    }

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
    else if(map.mapType === "PINMAP"){
      console.log(map?.mapTypeData);
    }
  }, [mapContainerRef?.current && geoJsonRef?.current, map?.mapType]);

  // set current heatmap data
  useEffect(() => {
    mapTypeDataRef.current = mapInfo?.currentMap?.mapTypeData;
  }, [mapInfo?.currentMap?.mapTypeData]);

  if (initialLoad && mapContainerRef?.current && geoJsonRef?.current) {
    console.log(initialLoad);
    console.log(mapContainerRef?.current);
    console.log(geoJsonRef?.current);
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

  // // auto zoom when load map content into geojson
  // useEffect(() => {
  //   console.log(initialLoad);
  //   console.log(mapContainerRef?.current);
  //   console.log(geoJsonRef?.current);
  //   mapInfo.setCurrentMapEditType(mapInfo?.currentMap?.mapType);

  //   if (initialLoad && mapContainerRef?.current && geoJsonRef?.current) {
  //     console.log(initialLoad);
  //     console.log(mapContainerRef?.current);
  //     console.log(geoJsonRef?.current);
  //     mapInfo.setCurrentMapEditType(mapInfo?.currentMap?.mapType);
  //     if (Object.values(geoJsonRef.current._layers).length <= 0) {
  //       return;
  //     }
  //     let featureGroup = L.featureGroup(
  //       Object.values(geoJsonRef.current._layers)
  //     );
  //     mapContainerRef.current.fitBounds(featureGroup.getBounds());
  //     setInitialLoad(false);
  //   }
  // }, [initialLoad && mapContainerRef?.current && geoJsonRef?.current]);

  if (!mapInfo) {
    return null;
  }

  // when map region is clicked
  const handleFeatureClick = (event) => {
    const layer = event.sourceTarget;

    const regularMap = (editMode && !dataEditModeRef.current);

    if(layer){
      // REGULAR MAP DISPLAY
      if(regularMap && layer?.feature) {
        setColoredRegion((prevColoredRegion) => {
          const newColoredRegion = { ...prevColoredRegion };
          const colorKey = getRegionName(layer?.feature);
          newColoredRegion[colorKey] = colorRef.current;
          return newColoredRegion;
        });
      }

      const position = layer?.getBounds().getCenter();
      const regionName = layer?.feature.properties[regionNameLevel].replace(
        /\0/g,
        ""
      );

      setSelectedRegionProps({ position, regionName });

      if (!layer?.feature) {
        return;
      }

      // update mapcontent ref
      const index = mapContentRef.current.findIndex(
        (region) =>
          region.properties[regionNameLevel] ===
          layer?.feature.properties[regionNameLevel]
      );
      if (index !== -1 && regularMap) {
        mapContentRef.current[index].properties.fillColor = colorRef.current;
        mapInfo.updateMapContent(index, colorRef.current);
      }

      if (editMode && dataEditModeRef.current) {
        const index = mapTypeDataRef?.current?.data?.findIndex(
          (data) => data.regionName === regionName
        );
        if (index >= 0) {
          console.log(`index: ${index}`);
          setIndexElementTobeChanged(index);
        }

        if(map?.mapType === "PINMAP"){
          setPinDataEntryModal(true);
          setLatLng([position.lat, position.lng]);
        }
        else{
          setDataEntryModalOpen(true);
        }
      }
    }
  };

  // edit data value for region on click
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
      properties: []
    };

    setCurrMaxData(Math.max(currMaxData, value));
    
    // update existing data or add data to region
    if (indexElementTobeChanged >= 0) {
      console.log(mapTypeDataRef.current.data[indexElementTobeChanged]);
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

  // add pin for region on cilck
  const createPin = (newProperties) => {
    console.log(newProperties);

    const existingData = indexElementTobeChanged >= 0;

    const value = (existingData && mapTypeDataRef.current?.data[indexElementTobeChanged]?.value) ?
                    mapTypeDataRef.current.data[indexElementTobeChanged].value :
                    0;

    const radius = (existingData && mapTypeDataRef.current?.data[indexElementTobeChanged]?.radius) ?
                    mapTypeDataRef.current.data[indexElementTobeChanged].radius :
                    0;

    const newDataObj = {
      lat: selectedRegionProps.position.lat,
      lng: selectedRegionProps.position.lng,
      value: value,
      regionName: selectedRegionProps.regionName,
      radius: radius,
      properties: newProperties
    };

    // update existing data
    if(indexElementTobeChanged >= 0) {
      mapTypeDataRef.current.data[indexElementTobeChanged] = newDataObj;
    }

    mapInfo.updateMapTypeData(newDataObj, indexElementTobeChanged);
    setIndexElementTobeChanged(-1);
  }

  // highlight region when hover
  const highlightFeature = (event) => {
    const layer = event.sourceTarget;
    layer.bringToFront();
    setCurrLayer(layer);
  }

  // reset style when not hover
  const resetHighlight = (event) => {
    const layer = event.sourceTarget;
    geoJsonRef?.current?.resetStyle(layer);
    setCurrLayer(null);
  }

  // render color and show text for each regions
  const onEachFeature = (feature, layer) => {
    if (!layer?.feature) {
      return;
    }

    // // come back later
    // const name = getRegionName(layer);

    // layer
    //   .bindTooltip(name, {
    //     permanent: true,
    //   })
    //   .openTooltip();
    
    // if (layer?.feature.properties.fillColor && !dataEditModeRef.current) {
    //   layer.setStyle({
    //     fillColor: layer?.feature.properties.fillColor,
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

  const closePinDataEntryModal = () => {
    setPinDataEntryModal(false);
    setLatLng(null);
    setPinMapTypeData({
      property1: '',
      property2: '',
      property3: ''
    });
  }

  const mapContent = (
    <>
      <Modals/>
      <DataEntryModal
        isOpen={dataEntryModalOpen}
        handleClose={() => setDataEntryModalOpen(false)}
        setData={editValue}
      />
      <PinDataEntryModal
        isOpen={pinDataEntryModal}
        createPin={createPin}
        handleClose={closePinDataEntryModal}
        latLng={latLng}
        mapTypeData={pinMapTypeData}
        setMapTypeData={setPinMapTypeData}
      />
      <MapContainer
        ref={mapContainerRef}
        key={mapContainterKey}
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
          <LayersControl.Overlay name="Show Tile Layer (Printing Mode)">
            <TileLayer
              attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://tiles.stadiamaps.com/tiles/stamen_toner/{z}/{x}/{y}{r}.png"
              minZoom={0}
              maxZoom={20}
            />
          </LayersControl.Overlay>
        </LayersControl>

        <ZoomControl position='topleft'/>

        <DataInfoControl
          type={(map?.mapType) ? map?.mapType : mapInfo?.currentMapEditType}
          property={currProp}
          regionName={getRegionName(currLayer?.feature)}
          data={currLayer?.feature?.properties}
          mapTypeData={mapTypeDataRef?.current?.data}
        />

        <LegendControl
          legendTitle={mapInfo?.currentMap?.mapTypeData?.legendTitle}
          type={(map?.mapType) ? map?.mapType : mapInfo?.currentMapEditType}
          max={(currMaxData) ? currMaxData : mapInfo?.currentMap?.mapTypeData?.max}
          getColor={getColor}
        />

        <GeoJSON
          key={geoJsonKey}
          data={mapContentRef?.current}
          style={getFeatureStyle}
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
        {map?.mapType === "PINMAP" && (
          <>
            {mapTypeDataRef?.current?.data?.map((prop) => {
              const icon = L.icon({
                iconUrl: markerIcon,
                iconSize: [25, 41],
                iconAnchor: [12, 41]
              })
              return (
                <Marker
                  position={[prop.lat, prop.lng]}
                  title={prop?.regionName}
                  alt={`marker for ${prop?.regionName}`}
                  icon={icon}
                >
                  <Popup>
                    {
                      (prop.properties.length === 0) ?
                        `No properties has added for ${prop?.regionName} yet.` :
                        <Box className='flex-column'>
                          {
                            prop.properties.map((property) => {
                              return <Typography variant='p'>{property.property}: {property.value}</Typography>
                            })
                          }
                        </Box>
                    }
                  </Popup>
                </Marker>
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