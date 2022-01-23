import styles from "../styles/Home.module.css";

export default function Overview({ covidData }) {
  return (
    <div className={styles.overview__group}>
      <div className={styles.overview__subGroup}>
        <div className={styles.overview__element}>
          <p className={styles.label}>Week Incidence</p>
          <p className={styles.value}>
            {Math.round(covidData.overview.weekIncidence).toLocaleString()}
          </p>
        </div>
        <div className={styles.overview__element}>
          <p className={styles.label}>R-Value</p>
          <p className={styles.value}>
            {covidData.overview.r.value.toLocaleString()}
          </p>
        </div>
        <div className={styles.overview__element}>
          <p className={styles.label}>Hospitalization Incidence</p>
          <p className={styles.value}>
            {covidData.overview.hospitalization.incidence7Days.toLocaleString()}
          </p>
        </div>
      </div>
      <div className={styles.overview__subGroup}>
        <div className={styles.overview__element}>
          <p className={styles.label}>Cases</p>
          <p className={styles.value}>
            {covidData.overview.cases.toLocaleString()}
          </p>
        </div>
        <div className={styles.overview__element}>
          <p className={styles.label}>Deaths</p>
          <p className={styles.value}>
            {covidData.overview.deaths.toLocaleString()}
          </p>
        </div>
        <div className={styles.overview__element}>
          <p className={styles.label}>Recovered</p>
          <p className={styles.value}>
            {covidData.overview.recovered.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
