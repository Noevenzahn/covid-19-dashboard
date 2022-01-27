import Image from "next/image";
import githubLogo from "../../public/github-logo.svg";

import styles from "../../styles/Home.module.css";

export default function Sidebar() {
  return (
    <>
      <nav className={styles.sidebar}>
        <div className={styles.sidebar__element}></div>
        <div className={styles.sidebar__element}></div>
        <div className={styles.sidebar__element}></div>
        <div className={styles.sidebar__element}></div>
      </nav>
    </>
  );
}
