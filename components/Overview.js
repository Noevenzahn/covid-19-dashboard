import styles from "../styles/Home.module.css";

export default function Overview({ covidData }) {
  if (!covidData) return <div>loading...</div>;
  return (
    <div className={styles.number__group}>
      <div className={styles.number__subGroup}>
        <div className={styles.number__element}>
          <p className={styles.label}>Week Incidence</p>
          <p className={styles.value}>
            {Math.round(covidData.overview.weekIncidence).toLocaleString()}
          </p>
        </div>
        <div className={styles.number__element}>
          <p className={styles.label}>Cases</p>
          <p className={styles.value}>
            {covidData.overview.cases.toLocaleString()}
          </p>
        </div>
      </div>
      <div className={styles.number__subGroup}>
        <div className={styles.number__element}>
          <p className={styles.label}>Deaths</p>
          <p className={styles.value}>
            {covidData.overview.deaths.toLocaleString()}
          </p>
        </div>
        <div className={styles.number__element}>
          <p className={styles.label}>Recovered</p>
          <p className={styles.value}>
            {covidData.overview.recovered.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
