import { Chart, Bar } from "react-chartjs-2";
import styles from "../styles/Home.module.css";

export default function MainChart({ covidData }) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
      },
    },
    elements: {
      point: {
        radius: 2,
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "month",
        },
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
      y2: {
        position: "right",
        grid: {
          display: false,
        },
      },
    },
  };

  let mainChartData = {
    labels: [],
    datasets: [],
  };

  if (covidData && covidData.casesHistory && covidData.deathsHistory) {
    mainChartData = {
      labels: [],
      datasets: [
        {
          type: "line",
          label: "Cases",
          data: covidData.casesHistory.data.map((casesData) => {
            return {
              x: casesData.date,
              y: casesData.cases,
            };
          }),
          borderColor: "#fc3228",
          backgroundColor: "#fc3228",
          borderWidth: 1.5,
        },
        {
          type: "bar",
          label: "Deaths",
          data: covidData.deathsHistory.data.map((deathsData) => {
            return {
              x: deathsData.date,
              y: deathsData.deaths,
            };
          }),
          yAxisID: "y2",
          backgroundColor: "#121416",
        },
      ],
    };
  }

  return (
    <>
      <div id={styles.mainChart} className={styles.dashboard__element}>
        <Chart type="bar" options={options} data={mainChartData} />
      </div>
    </>
  );
}
