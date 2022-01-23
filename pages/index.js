import { useEffect, useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import "chartjs-adapter-moment";

import Overview from "../components/Overview";
import MainChart from "../components/MainChart";

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
        console.log(covidData);
      }
    };
    fetchData();
  }, []);

  if (!covidData) return <div>loading...</div>;
  return (
    <>
      <Overview covidData={covidData} />
      <MainChart covidData={covidData} />
    </>
  );
}
