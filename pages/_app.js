import "../styles/globals.css";
import styles from "../styles/Home.module.css";

import ContextProvider from "../context/context";
import Navigation from "../components/Interface/Navigation";
import Sidebar from "../components/Interface/Sidebar";

function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
      <Navigation />
      <div className={styles.inner__elements}>
        <Sidebar />
        <Component {...pageProps} />
      </div>
    </ContextProvider>
  );
}

export default MyApp;
