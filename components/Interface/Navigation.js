import Image from "next/image";
import githubLogo from "../../public/github-logo.svg";
import menuIcon from "../../public/menu-icon.svg";

import styles from "../../styles/Home.module.css";

export default function Navigation({ toggleSidebar }) {
  return (
    <div className={styles.navigation}>
      <div className={styles["row--centered"]}>
        <Image
          src={menuIcon}
          alt=""
          className={styles.menu__icon}
          onClick={() => toggleSidebar((state) => !state)}
        />
        <p>Covid Dashboard</p>
      </div>
      <a
        href="https://github.com/Noevenzahn/covid-19-dashboard"
        className={styles.githubLogo}>
        <Image src={githubLogo} alt="" />
      </a>
    </div>
  );
}
