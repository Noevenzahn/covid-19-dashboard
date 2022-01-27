import { useEffect, useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import "chartjs-adapter-moment";

import styles from "../styles/Home.module.css";

import Navigation from "../components/Interface/Navigation";
import Overview from "../components/Overview";
import MainChart from "../components/MainChart";
import Footer from "../components/Interface/Footer";
import Sidebar from "../components/Interface/Sidebar";

export default function Home() {
  const [covidData, setCovidData] = useState();
  const [sidebar, toggleSidebar] = useState(true);

  useEffect(() => {
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
      <Navigation toggleSidebar={toggleSidebar} />
      <div className={styles.inner__elements}>
        {sidebar ? <Sidebar /> : <></>}
        <div>
          <Overview covidData={covidData} />
          <MainChart covidData={covidData} />
        </div>
      </div>
      <Footer data={covidData.overview} />
    </>
  );
}
