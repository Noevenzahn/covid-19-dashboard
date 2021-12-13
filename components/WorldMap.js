import ReactMapGL, { FullscreenControl, NavigationControl, AttributionControl, Source, Layer, Popup } from 'react-map-gl';
import { useEffect, useState, useCallback } from 'react';
import { fetcher } from '../lib/Fetcher';

export default function WorldMap() {

  const [geojson, setGeojson] = useState();
  
  useEffect(() => {
    fetcher("https://disease.sh/v3/covid-19/countries")
    .then((data) => setGeojson({
      type: 'FeatureCollection',
      features: data
    }))
  }, [])
  
  useEffect(() => {
    const resize = () => {
      setViewport(viewport => { return { ...viewport, width: "100vw", height: "100vh" } })
    }
    window.addEventListener("resize", resize);
    
    return function cleanupListener() {
      window.removeEventListener("resize", resize)
    }
  }, [])
  
  const layerStyle = {
    id: 'circles',
    type: 'circle',
    paint: {
      'circle-opacity': 0.60,
      "circle-radius": [
        "interpolate",
        ["linear"],
        ["get", "cases"],
        1, 4,
        1000, 8,
        4000, 10,
        8000, 14,
        12000, 18,
        100000, 20,
        200000, 40,
        500000, 45,
        1000000, 50,
      ],
      "circle-color": [
        "interpolate",
        ["linear"],
        ["get", "cases"],
        1, '#ffffb2',
        5000, '#fed976',
        10000, '#feb24c',
        25000, '#fd8d3c',
        50000, '#fc4e2a',
        75000, '#e31a1c',
        100000, '#b10026'
      ],
    }
  };
  
  const [viewport, setViewport] = useState({
    latitude: 27,
    longitude: 10,
    zoom: 2.25
  })

  const [showPopup, setShowPopup] = useState(false);
  const [id, setId] = useState();
  const [newId, setNewId] = useState();
  const [popUpCoordinates, setPopUpCoordinates] = useState({long: 1, lat: 2});
  const [popUpContent, setPopUpContent] = useState({cases: 1, deaths: 0, mortalityRate: 0});

  const handleHover = ({ features }) => {
    
    const hoveredFeature = features && features[0];
    setShowPopup(hoveredFeature);

    if(!hoveredFeature) return
    setNewId(features[0].properties.id);
    
    if(newId !== id) {
      setId(newId);
      
      const { cases, deaths, country } = features[0].properties;
      const coordinates = features[0].geometry.coordinates.slice();   
      setPopUpCoordinates({ long: coordinates[0], lat: coordinates[1] });
      setPopUpContent({ cases, deaths, country });
    }
  };
  
  if (!geojson) return <div>loading...</div>
  return (
    <ReactMapGL
      width="100vw"
      height="100vh"
      onViewportChange={setViewport}
      {...viewport}
      interactiveLayerIds={['circles']}
      onHover={handleHover}
      
      attributionControl={false}
      mapStyle="mapbox://styles/mapbox/dark-v10"
      mapboxApiAccessToken="pk.eyJ1IjoiajAzZXBoIiwiYSI6ImNreDFxeDdyMTE0azcyb255bXFqMHJobWkifQ.85nLAZTn-aS13Cd_nvRIlQ"
    >
    <AttributionControl compact={false} style={{ bottom: 0, right: 0 }} />
    <FullscreenControl />
    <NavigationControl style={{ right: 0 }} />

      <Source id="points" type="geojson" data={geojson}>
        <Layer {...layerStyle} 
        />
      </Source>
      {showPopup && <Popup
        longitude={popUpCoordinates.long}
        latitude={popUpCoordinates.lat}
        closeButton={false}
        closeOnClick={false}
        anchor="top" 
        >
          <h3>{popUpContent.country}</h3>
          <p>Total Cases: {popUpContent.cases}</p>
          <p>Total Deaths: {popUpContent.deaths}</p>
      </Popup>}
    </ReactMapGL>
  );
}