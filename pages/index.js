import { Chart as ChartJS } from "chart.js/auto";
import "chartjs-adapter-moment";

import { useContext } from "react";
import { GlobalContext } from "../context/context";

import styles from "../styles/Home.module.css";

import Navigation from "../components/Interface/Navigation";
import Overview from "../components/Overview";
import MainChart from "../components/MainChart";
import Footer from "../components/Interface/Footer";
import Sidebar from "../components/Interface/Sidebar";

export default function Home() {
  const { sidebar, toggleSidebar, covidData } = useContext(GlobalContext);

  return (
    <>
      <Navigation toggleSidebar={toggleSidebar} />
      <div className={styles.inner__elements}>
        {sidebar ? <Sidebar /> : <></>}
        {covidData ? (
          <div className="full__width">
            <Overview covidData={covidData} />
            <MainChart covidData={covidData} />
            <Footer data={covidData?.overview} />
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
