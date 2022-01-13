import { useEffect, useState } from "react";
import { Chart as ChartJS } from 'chart.js/auto';


import HospitalizationChart from "../components/HospitalizationChart";
import PcrTestingChart from "../components/PcrTestingChart";
import MainChart from "../components/MainChart";
import BoosterVaccChart from "../components/BoosterVaccChart";
import FirstVaccChart from "../components/FirstVaccChart";
import SecondVaccChart from "../components/SecondVaccChart";


export default function Home() {
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
  const [covidData, setCovidData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      for (const key in dataGermany) {
        const res = await fetch(baseUrl + dataGermany[key]);
        const resJson = await res.json();
        setCovidData((data) => ({ ...data, [key]: resJson }));
      }
    };
    fetchData();
  }, []);
  console.log(covidData)

  if(!covidData) return <div>loading...</div>
  return (
    <>
      <MainChart covidData={covidData} />
      <HospitalizationChart covidData={covidData} />
      <PcrTestingChart covidData={covidData} />
      <BoosterVaccChart covidData={covidData} />
      <FirstVaccChart covidData={covidData} />
      <SecondVaccChart covidData={covidData} />
    </>
  )
};