import dynamic from "next/dynamic";
import "mapbox-gl/dist/mapbox-gl.css";

import { GlobalContext } from "../context/state";
import { useEffect, useState, useContext } from "react";

import styles from "../styles/Home.module.css";

import Navigation from "../components/Interface/Navigation";
import Sidebar from "../components/Interface/Sidebar";

const WorldMap = dynamic(() => import("../components/WorldMap/WorldMap"), {
  ssr: false,
});

export default function WorldmapPage() {
  const [sidebar, toggleSidebar] = useContext(GlobalContext);

  return (
    <>
      <Navigation toggleSidebar={toggleSidebar} />
      <div className={styles.inner__elements}>
        {sidebar ? <Sidebar /> : <></>}
        <WorldMap />
      </div>
    </>
  );
}
