import ReactMapGL, {
  FullscreenControl,
  NavigationControl,
  AttributionControl,
  Source,
  Layer,
  Popup,
} from "react-map-gl";
import { useEffect, useState } from "react";
import { WorldDataFetcher } from "../../lib/Fetchers";
import DataSwitch from "./DataSwitch";
import styles from "../../styles/WorldmapPage.module.css";

export default function WorldMap() {
  const [geojson, setGeojson] = useState();
  const [showedData, setShowedData] = useState({
    dataType: "cases",
    circleColor: "#FF331F",
  });
  const [viewport, setViewport] = useState({
    latitude: 27,
    longitude: 10,
    zoom: 2,
  });
  // states for the on hover popups
  const [showPopup, setShowPopup] = useState(false);
  const [id, setId] = useState();
  const [newId, setNewId] = useState();
  const [popUpCoordinates, setPopUpCoordinates] = useState({ long: 1, lat: 2 });
  const [popUpContent, setPopUpContent] = useState({
    cases: 1,
    deaths: 0,
    mortalityRate: 0,
  });

  // fetch world data
  useEffect(() => {
    WorldDataFetcher("https://disease.sh/v3/covid-19/countries").then((data) =>
      setGeojson({
        type: "FeatureCollection",
        features: data,
      })
    );
  }, []);

  // making resizing of the browser window possible
  useEffect(() => {
    const resize = () => {
      setViewport((viewport) => {
        return {
          ...viewport,
          width: "calc(100vw - 75px)",
          height: "calc(100vh - 57.5px)",
        };
      });
    };
    window.addEventListener("resize", resize);

    return function cleanupListener() {
      window.removeEventListener("resize", resize);
    };
  }, []);

  const layerStyle = {
    id: "circles",
    type: "circle",
    paint: {
      "circle-opacity": 0.6,
      "circle-radius": [
        "interpolate",
        ["linear"],
        ["get", showedData.dataType],
        1,
        4,
        1000000,
        15,
        100000000,
        150,
      ],
      "circle-color": showedData.circleColor,
    },
  };

  const handleHover = ({ features }) => {
    const hoveredFeature = features && features[0];
    setShowPopup(hoveredFeature);

    if (!hoveredFeature) return;
    setNewId(features[0].properties.id);

    if (newId !== id) {
      setId(newId);
      const {
        country,
        cases,
        todayCases,
        deaths,
        todayDeaths,
        recovered,
        todayRecovered,
        active,
        critical,
      } = features[0].properties;
      const coordinates = features[0].geometry.coordinates.slice();
      const mortalityRate = ((deaths / cases) * 100).toFixed(2);
      setPopUpCoordinates({ long: coordinates[0], lat: coordinates[1] });
      setPopUpContent({
        country,
        cases,
        todayCases,
        deaths,
        todayDeaths,
        recovered,
        todayRecovered,
        active,
        critical,
        mortalityRate,
      });
    }
  };

  if (!geojson) return <div>loading...</div>;
  return (
    <div id={styles.map}>
      <DataSwitch setShowedData={setShowedData} />
      <ReactMapGL
        width="calc(100vw - 75px)"
        height="calc(100vh - 57.5px)"
        onViewportChange={setViewport}
        {...viewport}
        interactiveLayerIds={["circles"]}
        onHover={handleHover}
        attributionControl={false}
        mapStyle="mapbox://styles/mapbox/dark-v10"
        mapboxApiAccessToken="pk.eyJ1IjoiajAzZXBoIiwiYSI6ImNreDgwamxyYzM4NHIydnA4Y3ZqbXQ3MmIifQ.eqaKtWYXhRnakGf5uAlaOw">
        <AttributionControl compact={false} style={{ bottom: 0, right: 0 }} />
        <FullscreenControl style={{ top: "1.5vw", left: "1.5vw" }} />
        <NavigationControl style={{ top: "1.5vw", right: "1.5vw" }} />

        <Source id="points" type="geojson" data={geojson}>
          <Layer {...layerStyle} />
        </Source>
        {showPopup && (
          <Popup
            longitude={popUpCoordinates.long}
            latitude={popUpCoordinates.lat}
            closeButton={false}
            closeOnClick={false}
            anchor="top">
            <h3>{popUpContent.country}</h3>
            <p>active: {popUpContent.active}</p>
            <p>critical: {popUpContent.critical}</p>
            <p>cases: {popUpContent.cases}</p>
            <p>todays cases: {popUpContent.todayCases}</p>
            <p>deaths: {popUpContent.deaths}</p>
            <p>todays deaths: {popUpContent.todayDeaths}</p>
            <p>recovered: {popUpContent.recovered}</p>
            <p>today recovered: {popUpContent.todayRecovered}</p>
            <p>mortality rate: {popUpContent.mortalityRate}%</p>
          </Popup>
        )}
      </ReactMapGL>
    </div>
  );
}
