import "../styles/globals.css";
import styles from "../styles/Home.module.css";

import ContextProvider from "../context/context";
import Navigation from "../components/Interface/Navigation";

function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
      <Navigation />
      <div className={styles.inner__elements}>
        <Component {...pageProps} />
      </div>
    </ContextProvider>
  );
}

export default MyApp;
