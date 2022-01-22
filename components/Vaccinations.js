import styles from "../styles/Home.module.css";

import BoosterVaccChart from "./BoosterVaccChart";
import SecondVaccChart from "./SecondVaccChart";
import FirstVaccChart from "./FirstVaccChart";

export default function Vaccinations({ covidData }) {
  if (!covidData) return <div>loading...</div>;
  return (
    <div id={styles.vaccinationCharts}>
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
  );
}
