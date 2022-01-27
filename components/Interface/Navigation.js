import Image from "next/image";
import githubLogo from "../../public/github-logo.svg";

import styles from "../../styles/Home.module.css";

export default function Navigation() {
  return (
    <div className={styles.navigation}>
      <p>Covid Dashboard</p>
      <a
        href="https://github.com/Noevenzahn/covid-19-dashboard"
        className={styles.githubLogo}>
        <Image src={githubLogo} alt="" />
      </a>
    </div>
  );
}
