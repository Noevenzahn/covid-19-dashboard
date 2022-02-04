import styles from "../../styles/Home.module.css";

import BoosterVaccChart from "./BoosterVaccChart";
import SecondVaccChart from "./SecondVaccChart";
import FirstVaccChart from "./FirstVaccChart";

export default function Vaccinations({ covidData }) {
  if (!covidData) return <div>loading...</div>;
  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "33%" }}>
        <FirstVaccChart covidData={covidData} />
      </div>
      <div style={{ width: "33%" }}>
        <SecondVaccChart covidData={covidData} />
      </div>
      <div style={{ width: "33%" }}>
        <BoosterVaccChart covidData={covidData} />
      </div>
    </div>
  );
}
