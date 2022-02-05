import { Chart as ChartJS } from "chart.js/auto";
import "chartjs-adapter-moment";

import { useContext } from "react";
import { GlobalContext } from "../context/context";

import Vaccinations from "../components/Vaccinations/Vaccinations";
import Footer from "../components/Interface/Footer";
import Loader from "../components/Interface/Loader";

export default function VaccinationsPage() {
  const { covidData } = useContext(GlobalContext);

  return (
    <>
      {covidData ? (
        <div className="full__width">
          <Vaccinations covidData={covidData} />
          <Footer data={covidData?.overview} />
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}
