import { useState, useContext, useEffect, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";

import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import * as turf from '@turf/turf';
import {
  MapContainer,
  GeoJSON,
  ZoomControl,
  LayersControl,
  TileLayer
} from "react-leaflet";
import HeatmapOverlay from "heatmap.js/plugins/leaflet-heatmap";
import tinycolor from "tinycolor2";

import {
  DataInfoControl, LegendControl, PrintControl,
  PinMap, DotDistributionMap, GraduatedSymbolMap
} from "../index";

import { Modals, DataEntryModal, PinDataEntryModal } from "../../../index";
import MapContext from "../../../../contexts/map";

function MapScreen() {
  const location = useLocation();
  const { mapId } = useParams();
  const { mapInfo } = useContext(MapContext);
  // const { store } = useContext(GlobalStoreContext);
  // store.setCurrentView("MAP_VIEW");

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
  const dataColorRef = useRef();
  dataColorRef.current = mapInfo?.currentMap?.mapTypeData?.dataColor;
  const [initialLoad, setInitialLoad] = useState(true);
  const [regionNameLevel, setRegionNameLevel] = useState("");
  const [heatMapLayer, setHeatMapLayer] = useState(null);

  const [map, setMap] = useState(null);
  const [mapCenter, setMapCenter] = useState([0, 0]);
  const [selectedRegionProps, setSelectedRegionProps] = useState(null);
  const [indexElementTobeChanged, setIndexElementTobeChanged] = useState(-1);
  const [geoJsonKey, setGeoJsonKey] = useState(1);
  const [mapContainterKey, setMapContainterKey] = useState(1);
  const [dataMapKey, setDataMapKey] = useState(1);

  // to be replaced with currentMap.property, currentMap.mapTypeData.max, currentMap.mapTypeData.color later
  // const [currProp, setCurrProp] = useState('gdp_md');
  const [currProp, setCurrProp] = useState("property");
  // const [currMaxData, setCurrMaxData] = useState(
  //   mapInfo?.currentMap?.mapTypeData?.max
  // );
  const [latLng, setLatLng] = useState(null);
  const [pinMapTypeData, setPinMapTypeData] = useState({
    property1: "",
    property2: "",
    property3: "",
  });

  // const [palette, setPalette] = useState([]);
  const [currLayer, setCurrLayer] = useState(null);
  const [coloredRegion, setColoredRegion] = useState({});
  const [curBbox, setCurBbox] = useState(null);
  const [latlngs, setLatlngs] = useState([]);
  const [curFeature, setCurFeature] = useState(null);

  const hoverRegionStyle = {
    color: "#86C9B5",
    fillOpacity: 0.7,
    dashArray: "",
    weight: 5,
  };

  const defaultRegionStyle = {
    fillColor: "#FFFFFF",
    fillOpacity: 0.1,
    opacity: 1,
    dashArray: "3",
    weight: 2,
  };

  // color region
  useEffect(() => {
    console.log('useEffect mapInfo?.dataColor');

    // colorRef.current = mapInfo?.currentRegionColor;
    setDataMapKey(dataMapKey + 1);
    dataColorRef.current = mapInfo?.dataColor;
    // mapInfo?.updateDataColor(colorRef.current);
  }, [mapInfo?.dataColor]);

  // update map when currentMap changes
  useEffect(() => {
    if(mapInfo?.currentMap){
      setMap(mapInfo.currentMap);
      setEditMode(!mapInfo?.currentMap.isPublished);
      if(!mapInfo?.dataColor){
        mapInfo.setDataColor(mapInfo.currentMap.mapTypeData?.dataColor);
      }
    }
    else{
      mapInfo.getMapById(mapId);
    }
  }, [mapInfo?.currentMap]);

  function getPalette() {
    const minLight = 0.35;
    const maxLight = 0.65;

    // // calculate 4 steps away from current color
    // const color = (dataColorRef.current) ?
    //                 dataColorRef.current :
    //                 (
    //                   (mapInfo?.currentMap?.mapTypeData?.dataColor) ? 
    //                     mapInfo?.currentMap?.mapTypeData?.dataColor :
    //                     '#86C9B5'
    //                 );

    // console.log('~~~~~~~~~~~getPalette~~~~~~~~~~~');
    // console.log(`dataColorRef.current: ${dataColorRef.current}`);
    // console.log(`mapInfo?.currentMap?.mapTypeData?.dataColor: ${mapInfo?.currentMap?.mapTypeData?.dataColor}`);
    // console.log(`color: ${color}`);
    
    const color = (mapInfo?.dataColor) ? mapInfo?.dataColor : mapInfo?.currentMap?.mapTypeData?.dataColor;

    const colorObj = tinycolor(color);
    const palette = new Array(5);
    const steps = 4;
    const calcLight = (i) => (i * (maxLight - minLight)) / steps + minLight;

    // generate palette from darkest and lightest
    for (let i = 0; i < palette.length; i++) {
      const baseColor = colorObj.clone().toHsl();
      const outputColor = { ...baseColor, l: calcLight(i) };
      palette[i] = tinycolor(outputColor).toHexString();
    }

    return palette.reverse();
  }

  // get color for corresponding data from each feature
  function getColor(data) {
    const palette = getPalette();

    const levels = 5;
    const max =  mapInfo?.currentMap?.mapTypeData?.max;
    const step = max / levels;

    const index = Math.min(Math.floor(data / step), levels - 1);

    return palette[index];
  }

  // get region name from each feature
  function getRegionName(feature) {
    if (!feature) {
      return "";
    }
    return feature.properties[regionNameLevel]
      ? feature.properties[regionNameLevel]
      : feature.properties["name_0"]
      ? feature.properties["name_0"]
      : feature.properties["name"];
  }

  // get style for each feature
  const getFeatureStyle = (feature) => {
    if (!feature) {
      return defaultRegionStyle;
    }

    // REGULAR MAP
    if (editMode && !dataEditModeRef.current) {
      const colorKey = getRegionName(feature);
      const color = coloredRegion[colorKey]
        ? coloredRegion[colorKey]
        : feature.properties.fillColor;
      if (color) {
        return {
          fillColor: color,
          fillOpacity: 0.7,
          color:
            JSON.stringify(currLayer?.feature) === JSON.stringify(feature)
              ? "#86C9B5"
              : color,
          weight:
            JSON.stringify(currLayer?.feature) === JSON.stringify(feature)
              ? 5
              : 2,
          dashArray: "",
        };
      } else if (
        JSON.stringify(currLayer?.feature) === JSON.stringify(feature)
      ) {
        return hoverRegionStyle;
      }
      return defaultRegionStyle;
    }

    // 5 MAP TYPES
    if (JSON.stringify(currLayer?.feature) === JSON.stringify(feature)) {
      return hoverRegionStyle;
    }

    const mapType = (editMode && mapInfo.currentMapEditType) ? mapInfo.currentMapEditType : map?.mapType;

    // CHOROPLETH MAP HAS TO FILL COLORS BY INTENSITY
    if(mapType === "CHOROPLETH") {
      let i = -1;
      for (i = 0; i < map?.mapTypeData?.data?.length; i++) {
        const currData = map?.mapTypeData?.data[i];
        if (currData.regionName === getRegionName(feature)) {
          break;
        }
      }

      return {
        fillColor:
          i > -1 && map?.mapTypeData?.data[i]
            ? getColor(map?.mapTypeData?.data[i].value)
            : "white",
        fillOpacity: 0.7,
        color: "white",
        opacity: 1,
        dashArray: "2",
        weight: 2,
      };
    }

    return defaultRegionStyle;
  };

  // console.log(mapInfo?.currentMap);

  // update map region names when map changes
  useEffect(() => {
    console.log('useEffect map');

    mapContentRef.current = map?.mapContent;

    if (!mapContentRef?.current) {
      return;
    }

    let max = -1;

    if(mapContentRef.current[0]){
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
    }
  }, [map]);

  // // clear color fill, update map type in map object & determine if this map type suppoesd to edit by data when map type changes in edit screen
  // useEffect(() => {
  //   console.log('useEffect mapInfo?.currentMapEditType');

  //   if (geoJsonRef?.current) {
  //     geoJsonRef?.current?.resetStyle();
  //   }

  //   if (mapInfo?.currentMapEditType === "REGULAR") {
  //     dataEditModeRef.current = false;
  //   } else {
  //     dataEditModeRef.current = true;
  //   }

  //   setGeoJsonKey(geoJsonKey + 1);
  //   if (
  //     mapInfo?.currentMapEditType !== "HEATMAP" &&
  //     mapContainerRef?.current &&
  //     heatMapLayer
  //   ) {
  //     mapContainerRef.current.removeLayer(heatMapLayer);
  //     setMapContainterKey(mapContainterKey + 1);
  //   }
  // }, [mapInfo?.currentMapEditType]);

  // render when map type changes
  useEffect(() => {
    console.log('useEffect mapInfo?.currentMapEditType');

    if (!mapContainerRef?.current || !geoJsonRef?.current || !mapInfo?.currentMapEditType) {
      return;
    }

    if (geoJsonRef?.current) {
      geoJsonRef?.current?.resetStyle();
    }

    // if (mapInfo?.currentMapEditType === "REGULAR") {
    //   dataEditModeRef.current = false;
    // } else {
    //   dataEditModeRef.current = true;
    // }

    setGeoJsonKey(geoJsonKey + 1);

    if (
      mapInfo?.currentMapEditType !== "HEATMAP" &&
      mapContainerRef?.current &&
      heatMapLayer
    ) {
      mapContainerRef.current.removeLayer(heatMapLayer);
      setMapContainterKey(mapContainterKey + 1);
    }

    if (mapInfo?.currentMapEditType === "HEATMAP") {
      const initialHeatMapLayer = new HeatmapOverlay({
        maxOpacity: 1,
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
    } else if (mapInfo?.currentMapEditType === "PINMAP") {
      console.log(map?.mapTypeData);
    }
  }, [mapContainerRef?.current && geoJsonRef?.current, mapInfo?.currentMapEditType]);

  // set current heatmap data
  useEffect(() => {
    console.log('useEffect mapInfo?.currentMap.mapTypeData');
    if(mapInfo?.currentMap?.mapTypeData){
      mapTypeDataRef.current = mapInfo?.currentMap?.mapTypeData;
    }
  }, [mapInfo?.currentMap?.mapTypeData]);

  useEffect(() => {
    console.log('mapTypeDataRef?.current?.data');

    const mapType = (editMode && mapInfo?.currentMapEditType) ? mapInfo?.currentMapEditType : map?.mapType;
    if (mapType === "HEATMAP" && heatMapLayer && mapTypeDataRef.current) {
      heatMapLayer.setData(mapTypeDataRef.current);
      setMapContainterKey(mapContainterKey + 1);
      setGeoJsonKey(geoJsonKey + 1);
      setInitialLoad(true);
    }
  }, [mapTypeDataRef?.current?.data]);

  if (!mapInfo) {
    return null;
  }
  
  // first load, set up center & map edit type
  if (initialLoad && mapContainerRef?.current && geoJsonRef?.current) {
    mapInfo.setCurrentMapEditType(mapInfo?.currentMap?.mapType);
    if (Object.values(geoJsonRef.current._layers).length <= 0) {
      return;
    }
    let featureGroup = L.featureGroup(
      Object.values(geoJsonRef.current._layers)
    );
    const center = featureGroup.getBounds().getCenter();
    setMapCenter([center.lat, center.lng]);
    mapContainerRef.current.fitBounds(featureGroup.getBounds());
    setInitialLoad(false);
  }

  // when map region is clicked
  const handleFeatureClick = (event) => {
    console.log('handleFeatureClick');

    const layer = event.sourceTarget;
    const regularMap = editMode && !dataEditModeRef.current;
    const mapType = (editMode && mapInfo?.currentMapEditType) ? mapInfo?.currentMapEditType : map?.mapType;

    if (layer) {
      // REGULAR MAP DISPLAY
      if (regularMap && layer?.feature) {
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

      const bbox = turf.bbox(layer.feature);
      setCurBbox(bbox);
      setCurFeature(layer.feature);
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
          setIndexElementTobeChanged(index);
        }

        if(mapType === "PINMAP") {
          setPinDataEntryModal(true);
          setLatLng([position.lat, position.lng]);
        } else {
          setDataEntryModalOpen(true);
        }
      }
    }
  };

  // edit data value for region on click
  const editValue = (value) => {
    console.log('editValue');

    const mini = 10;
    const factor = 10;
    const radius = Math.floor(Math.log(value) * factor) + mini;

    let randomPoints = [];
    let points = turf.randomPoint(value, { bbox: curBbox });
    let ptsWithin = turf.pointsWithinPolygon(points, curFeature);
    randomPoints = randomPoints.concat(ptsWithin.features);

    while (randomPoints.length < value) {
      points = turf.randomPoint(value - randomPoints.length, { bbox: curBbox });
      ptsWithin = turf.pointsWithinPolygon(points, curFeature);
      randomPoints = randomPoints.concat(ptsWithin.features);
    }
    
    const newDataObj = {
      lat: selectedRegionProps.position.lat,
      lng: selectedRegionProps.position.lng,
      value: value,
      regionName: selectedRegionProps.regionName,
      radius: radius,
      randomDotsForRegion: randomPoints,
      properties: []
    };

    // setCurrMaxData(Math.max(currMaxData, value));

    const mapType = (editMode && mapInfo?.currentMapEditType) ? mapInfo?.currentMapEditType : map?.mapType;
    
    // update existing data or add data to region
    if (indexElementTobeChanged >= 0) {
      mapTypeDataRef.current.data[indexElementTobeChanged] = newDataObj;
      mapTypeDataRef.current.max = Math.max(
        mapTypeDataRef.current.max,
        value
      );
      if (mapType === "HEATMAP") {
        heatMapLayer.setData(mapTypeDataRef.current);
      }
    } else {
      if (mapType === "HEATMAP") {
        heatMapLayer.addData(newDataObj);
      }
    }
    
    if (mapType === "HEATMAP") {
      setMapContainterKey(mapContainterKey + 1);
      setGeoJsonKey(geoJsonKey + 1);
      setInitialLoad(true);
    }
    mapInfo.updateMapTypeData(newDataObj, indexElementTobeChanged);
    setIndexElementTobeChanged(-1);
  };

  // add pin for region on cilck
  const createPin = (newProperties) => {
    console.log('createPin');

    const existingData = indexElementTobeChanged >= 0;

    const value =
      existingData &&
      mapTypeDataRef.current?.data[indexElementTobeChanged]?.value
        ? mapTypeDataRef.current.data[indexElementTobeChanged].value
        : 0;

    const radius =
      existingData &&
      mapTypeDataRef.current?.data[indexElementTobeChanged]?.radius
        ? mapTypeDataRef.current.data[indexElementTobeChanged].radius
        : 0;

    const newDataObj = {
      lat: selectedRegionProps.position.lat,
      lng: selectedRegionProps.position.lng,
      value: value,
      regionName: selectedRegionProps.regionName,
      radius: radius,
      properties: newProperties,
    };

    // update existing data
    if (indexElementTobeChanged >= 0) {
      mapTypeDataRef.current.data[indexElementTobeChanged] = newDataObj;
    }

    mapInfo.updateMapTypeData(newDataObj, indexElementTobeChanged);
    setIndexElementTobeChanged(-1);
  };

  // highlight region when hover
  const highlightFeature = (event) => {
    const layer = event.sourceTarget;
    layer.bringToFront();
    setCurrLayer(layer);
  };

  // reset style when not hover
  const resetHighlight = (event) => {
    const layer = event.sourceTarget;
    geoJsonRef?.current?.resetStyle(layer);
    setCurrLayer(null);
  };

  // render color and show text for each regions
  const onEachFeature = (feature, layer) => {
    if (!layer?.feature) {
      return;
    }

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
      property1: "",
      property2: "",
      property3: "",
    });
  };

  function renderMapLayer(mapType){
    console.log(`renderMapLayer, mapType: ${mapType}`);

    const color = (mapInfo?.dataColor) ? mapInfo?.dataColor : mapInfo?.currentMap?.mapTypeData?.dataColor;

    if(mapType === 'PINMAP'){
      return <PinMap data={mapTypeDataRef?.current?.data}/>
    }
    else if(mapType === 'GRADUATED_SYMBOL'){
      return <GraduatedSymbolMap dataMapKey={dataMapKey} data={mapTypeDataRef?.current?.data} color={color}/>
    }
    else if(mapType === 'DOT_DISTRIBUTION'){
      return <DotDistributionMap dataMapKey={dataMapKey} data={mapTypeDataRef?.current?.data} color={color}/>
    }
    return null;
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
        style={{ width: (editMode) ? "70%" : "100%", zIndex: 0 }}
        center={mapCenter}
        zoom={3}
        zoomControl={false}
      >
        <LayersControl position="topleft">
          <LayersControl.Overlay name="Show Tile Layer">
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.Overlay>
        </LayersControl>

        <ZoomControl position="topleft" />

        <PrintControl
          position='topleft'
          title='Export as PNG'
          filename={map?.title}
          sizeModes={['Current', 'A4Landscape']}
          hideControlContainer={true}
          exportOnly
        />

        <DataInfoControl
          type={(editMode && mapInfo?.currentMapEditType) ? mapInfo?.currentMapEditType : map?.mapType}
          // type={map?.mapType ? map?.mapType : mapInfo?.currentMapEditType}
          property={currProp}
          regionName={getRegionName(currLayer?.feature)}
          data={currLayer?.feature?.properties}
          mapTypeData={mapTypeDataRef?.current?.data}
        />

        <LegendControl
          legendTitle={mapInfo?.currentMap?.mapTypeData?.legendTitle}
          type={(editMode && mapInfo?.currentMapEditType) ? mapInfo?.currentMapEditType : map?.mapType}
          // type={map?.mapType ? map?.mapType : mapInfo?.currentMapEditType}
          max={mapInfo?.currentMap?.mapTypeData?.max}
          color={(mapInfo?.dataColor) ? mapInfo?.dataColor : mapInfo?.currentMap?.mapTypeData?.dataColor}
          getColor={getColor}
        />

        <GeoJSON
          key={geoJsonKey}
          data={mapContentRef?.current}
          style={getFeatureStyle}
          onEachFeature={onEachFeature}
          ref={geoJsonRef}
        />
        {
          renderMapLayer((editMode && mapInfo?.currentMapEditType) ? mapInfo?.currentMapEditType : map?.mapType)
        }
      </MapContainer>
    </>
  );

  return <>{mapContent}</>;
}

export default MapScreen;
