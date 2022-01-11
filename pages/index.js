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
  

  const mainChartData = {
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
  const hospitalizationChartData = {
    labels: [],
    datasets: [
      {
        label: 'Dataset 1',
        data: [{x:'2016-12-25', y:20}, {x:'2016-12-26', y:10}],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  }
  const pcrTestingChartData = {
    labels: [],
    datasets: [
      {
        label: 'Dataset 1',
        data: [{x:'2016-12-25', y:20}, {x:'2016-12-26', y:10}],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  }

  if(covidData 
    && covidData.casesHistory
    && covidData.recoveredHistory 
    && covidData.deathsHistory 
    && covidData.hospitalizationHistory
    && covidData.pcrTesting) {
    console.log(covidData.overview.cases)
    console.log(covidData.casesHistory.data.map((casesData) => [{x: casesData.date, y: casesData.cases}]))
    mainChartData = {
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
    hospitalizationChartData = {
      labels: [],
      datasets: [
        {
          label: 'Hospitalisations',
          data: covidData.hospitalizationHistory.data.map((hospitalizationData) => {return {x: hospitalizationData.date.substring(0, 10), y: hospitalizationData.cases7Days}}),
          borderColor: 'rgb(0, 255, 0)',
          backgroundColor: 'rgba(0, 255, 0, 0.5)',
        },
      ],
    };
    pcrTestingChartData = {
      labels: [],
      datasets: [
        {
          label: 'PCR Tests',
          data: covidData.pcrTesting.data.history.map((pcrTestingData) => {return {x: pcrTestingData.calendarWeek, y: pcrTestingData.performedTests}}),
          borderColor: 'rgb(0, 255, 0)',
          backgroundColor: 'rgba(0, 255, 0, 0.5)',
        },
        {
          label: 'Positive Tests',
          data: covidData.pcrTesting.data.history.map((pcrTestingData) => {return {x: pcrTestingData.calendarWeek, y: pcrTestingData.positiveTests}}),
          borderColor: 'rgb(0, 255, 0)',
          backgroundColor: 'rgba(0, 255, 0, 0.5)',
        },
      ],
    };
  }

  if(!covidData) return <div>loading...</div>
  return (
    <>      
      <Line
        options={options} data={mainChartData}
      />
      <Line
        options={options} data={hospitalizationChartData}
      />
      <Line
        options={options} data={pcrTestingChartData}
      />
    </>
  )
};