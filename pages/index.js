import { Chart as ChartJS } from "chart.js/auto";
import "chartjs-adapter-moment";

import { useContext } from "react";
import { GlobalContext } from "../context/state";

import styles from "../styles/Home.module.css";

import Navigation from "../components/Interface/Navigation";
import Overview from "../components/Overview";
import MainChart from "../components/MainChart";
import Footer from "../components/Interface/Footer";
import Sidebar from "../components/Interface/Sidebar";

export default function Home() {
  const [covidData, setCovidData] = useContext(GlobalContext);
  const [sidebar, toggleSidebar] = useContext(GlobalContext);

  return (
    <>
      <Navigation toggleSidebar={toggleSidebar} />
      <div className={styles.inner__elements}>
        {sidebar ? <Sidebar /> : <></>}
        {covidData ? (
          <div className="full__width">
            <Overview covidData={covidData} />
            <MainChart covidData={covidData} />
          </div>
        ) : (
          <></>
        )}
      </div>
      <Footer data={covidData?.overview} />
    </>
  );
}
