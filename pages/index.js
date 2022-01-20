import { useEffect, useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import "chartjs-adapter-moment";

import styles from "../styles/Home.module.css";

import HospitalizationChart from "../components/HospitalizationChart";
import PcrTestingChart from "../components/PcrTestingChart";
import MainChart from "../components/MainChart";
import BoosterVaccChart from "../components/BoosterVaccChart";
import FirstVaccChart from "../components/FirstVaccChart";
import SecondVaccChart from "../components/SecondVaccChart";

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
    // <main id={styles.dashboard}>
    <MainChart covidData={covidData} />
    /* <div id={styles.vaccinationCharts}>
        <div id={styles.FirstVaccChart} className={styles.dashboard__element}>
          <FirstVaccChart covidData={covidData} />
        </div>
        <div id={styles.SecondVaccChart} className={styles.dashboard__element}>
          <SecondVaccChart covidData={covidData} />
        </div>
        <div id={styles.BoosterVaccChart} className={styles.dashboard__element}>
          <BoosterVaccChart covidData={covidData} />
        </div>
        <div id={styles.RValueChart} className={styles.dashboard__element}>
          <BoosterVaccChart covidData={covidData} />
        </div>
      </div>
      <div id={styles.hospitalizationChart} className={styles.dashboard__element}>
        <HospitalizationChart covidData={covidData} />
      </div>
      <div id={styles.PcrTestingChart} className={styles.dashboard__element}>
        <PcrTestingChart covidData={covidData} />
      </div> */
    // </main>
  );
}
