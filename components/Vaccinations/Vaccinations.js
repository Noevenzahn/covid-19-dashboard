import styles from "../../styles/Home.module.css";

import BoosterVaccChart from "./BoosterVaccChart";
import SecondVaccChart from "./SecondVaccChart";
import FirstVaccChart from "./FirstVaccChart";

export default function Vaccinations({ covidData }) {
  if (!covidData.vaccinations) return <div>loading...</div>;
  return (
    <>
      <div className={styles.overview__group}>
        <div className={styles.overview__subGroup}>
          <div className={styles.overview__element}>
            <p className={styles.label}>Administered</p>
            <p className={styles.value}>
              {covidData.vaccinations.data.administeredVaccinations.toLocaleString()}
            </p>
          </div>
          <div className={styles.overview__element}>
            <p className={styles.label}>First Vaccination</p>
            <p className={styles.value}>
              {covidData.vaccinations.data.vaccinated.toLocaleString()}
            </p>
          </div>
          <div className={styles.overview__element}>
            <p className={styles.label}>Secound Vaccination</p>
            <p className={styles.value}>
              {covidData.vaccinations.data.secondVaccination.vaccinated.toLocaleString()}
            </p>
          </div>
          <div className={styles.overview__element}>
            <p className={styles.label}>Booster Vaccination</p>
            <p className={styles.value}>
              {covidData.vaccinations.data.boosterVaccination.vaccinated.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
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
    </>
  );
}
