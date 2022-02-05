import { Chart as ChartJS } from "chart.js/auto";
import "chartjs-adapter-moment";

import { useContext } from "react";
import { GlobalContext } from "../context/context";

import Overview from "../components/Overview";
import MainChart from "../components/MainChart";
import Footer from "../components/Interface/Footer";

export default function Home() {
  const { covidData } = useContext(GlobalContext);

  return (
    <>
      {covidData ? (
        <div className="full__width">
          <Overview covidData={covidData} />
          <MainChart covidData={covidData} />
          <Footer data={covidData?.overview} />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
