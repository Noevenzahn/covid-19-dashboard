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
            <p className={styles.label}>Second Vaccination</p>
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
        <div className={styles.overview__subGroup}>
          <div className={styles.vaccChart}>
            <span className={styles.vaccNumber}>
              {covidData.vaccinations.data.quote * 100}%
            </span>
            <FirstVaccChart covidData={covidData} />
          </div>
          <div className={styles.vaccChart}>
            <span className={styles.vaccNumber}>
              {covidData.vaccinations.data.secondVaccination.quote * 100}%
            </span>
            <SecondVaccChart covidData={covidData} />
          </div>
          <div className={styles.vaccChart}>
            <span className={styles.vaccNumber}>
              {covidData.vaccinations.data.boosterVaccination.quote * 100}%
            </span>
            <BoosterVaccChart covidData={covidData} />
          </div>
        </div>
      </div>
    </>
  );
}
