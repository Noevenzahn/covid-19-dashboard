import { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext();

export default function ContextProvider({ children }) {
  const [sidebar, toggleSidebar] = useState(true);
  const [covidData, setCovidData] = useState();

  useEffect(() => {
    const baseUrl = "https://api.corona-zahlen.org/";
    const dataGermany = {
      overview: "germany",
      casesHistory: "germany/history/cases/",
      deathsHistory: "germany/history/deaths/",
      recoveredHistory: "germany/history/recovered/",
      vaccinations: "vaccinations",
      hospitalizationHistory: "germany/history/hospitalization/",
      pcrTesting: "testing/history",
    };

    const fetchData = async () => {
      for (const key in dataGermany) {
        const res = await fetch(baseUrl + dataGermany[key]);
        const resJson = await res.json();
        setCovidData((data) => ({ ...data, [key]: resJson }));
      }
    };
    fetchData();
  }, []);

  return (
    <GlobalContext.Provider value={{ sidebar, toggleSidebar, covidData }}>
      {children}
    </GlobalContext.Provider>
  );
}
