import Image from "next/image";
import Link from "next/link";

import styles from "../../styles/Home.module.css";

import globeIcon from "../../public/globe-icon.svg";
import menuIcon from "../../public/menu-icon.svg";
import { useRouter } from "next/router";

export default function Sidebar() {
  const router = useRouter();
  return (
    <>
      <nav className={styles.sidebar}>
        <Link href="/">
          <a>
            <div
              className={
                router.pathname == "/" ? styles.active : styles.sidebar__element
              }>
              <Image src={menuIcon} alt="" className={styles.sidebar__icon} />
            </div>
          </a>
        </Link>
        <Link href="/worldmap">
          <a>
            <div
              className={
                router.pathname == "/worldmap"
                  ? styles.active
                  : styles.sidebar__element
              }>
              <Image src={globeIcon} alt="" className={styles.sidebar__icon} />
            </div>
          </a>
        </Link>
        <Link href="/vaccinations">
          <a>
            <div
              className={
                router.pathname == "/vaccinations"
                  ? styles.active
                  : styles.sidebar__element
              }>
              {/* <Image src={globeIcon} alt="" className={styles.sidebar__icon} /> */}
            </div>
          </a>
        </Link>
      </nav>
    </>
  );
}
