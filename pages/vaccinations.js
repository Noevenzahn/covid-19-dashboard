import { Chart as ChartJS } from "chart.js/auto";
import "chartjs-adapter-moment";

import { useContext } from "react";
import { GlobalContext } from "../context/context";

import Vaccinations from "../components/Vaccinations/Vaccinations";
import Footer from "../components/Interface/Footer";

export default function Home() {
  const { covidData } = useContext(GlobalContext);

  return (
    <>
      {covidData ? (
        <div className="full__width">
          <Vaccinations covidData={covidData} />
          <Footer data={covidData?.overview} />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
