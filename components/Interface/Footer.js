import styles from "../../styles/Home.module.css";

export default function Footer({ data }) {
  return (
    <div className={styles.footer}>
      <p>
        <span className={styles.bold}>Source: </span>
        {data.meta.source}
      </p>
      <p>
        <span className={styles.bold}>API-Source: </span>
        <a href={data.meta.info}>RKI Covid API</a>
      </p>
      <p>
        <span className={styles.bold}>Last Update: </span>
        {data.meta.lastUpdate
          .substring(0, 10)
          .replace("-", "/")
          .replace("-", "/")}
      </p>
    </div>
  );
}
