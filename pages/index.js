import { useEffect, useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import "chartjs-adapter-moment";

import styles from "../styles/Home.module.css";

import Overview from "../components/Overview";
import MainChart from "../components/MainChart";
import Vaccinations from "../components/Vaccinations";

export default function Home() {
  const baseUrl = "https://api.corona-zahlen.org/";
  const dataGermany = {
    overview: "germany",
    casesHistory: "germany/history/cases/",
    deathsHistory: "germany/history/deaths/",
    recoveredHistory: "germany/history/recovered/",
    vaccinations: "vaccinations",
    hospitalizationHistory: "germany/history/hospitalization/",
    pcrTesting: "testing/history",
  };
  const [covidData, setCovidData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      for (const key in dataGermany) {
        const res = await fetch(baseUrl + dataGermany[key]);
        const resJson = await res.json();
        setCovidData((data) => ({ ...data, [key]: resJson }));
      }
    };
    fetchData();
  }, []);

  if (!covidData) return <div>loading...</div>;
  return (
    <>
      <div style={{ display: "flex" }}>
        <Overview covidData={covidData} />
        <Vaccinations covidData={covidData} />
      </div>
      <MainChart covidData={covidData} />
    </>
  );
}
