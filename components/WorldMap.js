import ReactMapGL, { FullscreenControl, NavigationControl, AttributionControl, Source, Layer } from 'react-map-gl';
import { useEffect, useState } from 'react';
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
      setViewport(viewport => { return {...viewport, width: "100vw", height: "100vh"}})
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
      'circle-opacity': 0.75,
      'circle-stroke-width': 1,
      'circle-radius': 4,
      'circle-color': '#FFEB3B'
    }
  };

  const [viewport, setViewport] = useState({
    latitude: 27,
    longitude: 10,
    zoom: 2.25
  })

  if (!geojson) return <div>loading...</div>
  return (
    <ReactMapGL
      width="100vw"
      height="100vh"
      onViewportChange={setViewport}
      {...viewport}
      attributionControl={false}

      mapStyle="mapbox://styles/mapbox/dark-v10"
      mapboxApiAccessToken="pk.eyJ1IjoiajAzZXBoIiwiYSI6ImNreDFyM2E4ZjFrcjIyb3A4Z2M5bGVpNGsifQ.Xs9GQEe28Uup1LYNrO09cQ"
    >
      <AttributionControl compact={false} style={{ bottom: 0, right: 0 }} />
      <FullscreenControl />
      <NavigationControl style={{ right: 0 }} />

      <Source id="points" type="geojson" data={geojson}>
        <Layer {...layerStyle} />
      </Source>
    </ReactMapGL>
  );
}