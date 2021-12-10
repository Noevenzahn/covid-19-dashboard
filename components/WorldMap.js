import { Component } from 'react';
import ReactMapGL from 'react-map-gl';

class Map extends Component {
  state = {
    viewport: {
      width: '100vw',
      height: '100vh',
      latitude: 27,
      longitude: 10,
      zoom: 2.25
    }
  };

  render() {
    return (
      <ReactMapGL
        mapStyle="mapbox://styles/mapbox/dark-v10"
        mapboxApiAccessToken="pk.eyJ1IjoiajAzZXBoIiwiYSI6ImNreDB0eXVtMDFhNTUybnA4d2R0MXp0bzkifQ.fREP65CSCE02YF1QM6ayHg"
        onViewportChange={(viewport) => this.setState({ viewport })}
        {...this.state.viewport}
      />
    );
  }
}

export default Map;
