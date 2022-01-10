import { useEffect, useState } from "react";
import { Chart as ChartJS } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';


export default function Home() {
  const baseUrl = "https://api.corona-zahlen.org/";
  const dataGermany = {
    overview: "germany",
    casesHistory: "germany/history/cases/",
    deathsHistory: "germany/history/deaths/",
    recoveredHistory: "germany/history/recovered/",
    vaccinations: "vaccinations",
    hospitalizations: "germany/history/hospitalization/",
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

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };
  

  const chartData = {
    labels: [],
    datasets: [
      {
        label: 'Dataset 1',
        data: [{x:'2016-12-25', y:20}, {x:'2016-12-26', y:10}],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  if(covidData && covidData.casesHistory && covidData.recoveredHistory && covidData.deathsHistory) {
    console.log(covidData.overview.cases)
    console.log(covidData.casesHistory.data.map((casesData) => [{x: casesData.date, y: casesData.cases}]))
    chartData = {
      labels: [],
      datasets: [
        {
          label: 'Recovered',
          data: covidData.recoveredHistory.data.map((recoveredData) => {return {x: recoveredData.date.substring(0, 10), y: recoveredData.recovered}}),
          borderColor: 'rgb(0, 255, 0)',
          backgroundColor: 'rgba(0, 255, 0, 0.5)',
        },
        {
          label: 'Cases',
          data: covidData.casesHistory.data.map((casesData) => {return {x: casesData.date.substring(0, 10), y: casesData.cases}}),
          borderColor: 'rgb(255, 153, 51)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Deaths',
          data: covidData.deathsHistory.data.map((deathsData) => {return {x: deathsData.date.substring(0, 10), y: deathsData.deaths}}),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    };
  }

  if(!covidData) return <div>loading...</div>
  return (
    <>
      {/* <h1>{data.casesHistory[0]}</h1> */}
      
      <Line
        options={options} data={chartData}
      />
    </>
  )
};