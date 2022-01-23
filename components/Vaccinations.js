import styles from "../styles/Home.module.css";

import BoosterVaccChart from "./BoosterVaccChart";
import SecondVaccChart from "./SecondVaccChart";
import FirstVaccChart from "./FirstVaccChart";

export default function Vaccinations({ covidData }) {
  if (!covidData) return <div>loading...</div>;
  return (
    <div className={styles.number__group2}>
      <div style={{ display: "flex" }}>
        <div className={styles.dougnut__chart}>
          <FirstVaccChart covidData={covidData} />
        </div>
        <div className={styles.dougnut__chart}>
          <SecondVaccChart covidData={covidData} />
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div className={styles.dougnut__chart}>
          <BoosterVaccChart covidData={covidData} />
        </div>
        <div className={styles.dougnut__chart}>
          <BoosterVaccChart covidData={covidData} />
        </div>
      </div>
    </div>
  );
}
