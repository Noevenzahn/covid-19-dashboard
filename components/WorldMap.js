import ReactMapGL from 'react-map-gl';
import { useState } from 'react';

export default function WorldMap() {

  const initialState = {
    viewport: {
      width: '100vw',
      height: '100vh',
      latitude: 27,
      longitude: 10,
      zoom: 2.25
    }
  };

  const [state, setState] = useState(initialState)

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/mapbox/dark-v10"
      mapboxApiAccessToken="pk.eyJ1IjoiajAzZXBoIiwiYSI6ImNreDB0eXVtMDFhNTUybnA4d2R0MXp0bzkifQ.fREP65CSCE02YF1QM6ayHg"
      onViewportChange={(viewport) => setState({ viewport })}
      {...state.viewport}
    />
  );
}