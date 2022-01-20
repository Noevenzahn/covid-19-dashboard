import { Chart, Bar } from "react-chartjs-2";
import styles from "../styles/Home.module.css";

export default function MainChart({ covidData }) {
  const options = {
    responsive: true,
    maintainAspectRatio: true,
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
          displayFormats: {
            month: "MMM",
          },
        },
        grid: {
          display: false,
          // color: "#e5eaed"
        },
      },
      y: {
        grid: {
          display: false,
          // color: "#e5eaed"
        },
      },
      y2: {
        position: "right",
        grid: {
          display: false,
          // color: "#e5eaed"
        },
      },
    },
  };
  const optionsStackedBar = {
    indexAxis: "y",
    scales: {
      x: {
        stacked: false,
        ticks: {
          beginAtZero: true,
        },
      },
      y: {
        stacked: true,
      },
    },
  };

  const mainChartData = {
    labels: [],
    datasets: [],
  };
  const vaccinationChartData = {
    labels: [],
    datasets: [],
  };

  if (
    covidData &&
    covidData.casesHistory &&
    covidData.recoveredHistory &&
    covidData.deathsHistory
  ) {
    mainChartData = {
      labels: [],
      datasets: [
        // {
        //     type: 'line',
        //     label: 'Recovered',
        //     data: covidData.recoveredHistory.data.map((recoveredData) => { return { x: recoveredData.date.substring(0, 10), y: recoveredData.recovered } }),
        //     borderColor: '#2e33c7',
        //     backgroundColor: '#2e33c7',
        // },
        {
          type: "line",
          label: "Cases",
          data: covidData.casesHistory.data.map((casesData) => {
            return { x: casesData.date.substring(0, 10), y: casesData.cases };
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
              x: deathsData.date.substring(0, 10),
              y: deathsData.deaths,
            };
          }),
          yAxisID: "y2",
          backgroundColor: "#121416",
        },
      ],
    };
  }

  if (covidData && covidData.vaccinations) {
    vaccinationChartData = {
      labels: [],
      datasets: [
        {
          label: "Unvaccinated",
          // data: [{x: 100 - (100 * covidData.vaccinations.data.quotes.total), y: 1}],
          data: [{ x: 24.9, y: 1 }],
          borderColor: "red",
          borderWidth: 1,
          backgroundColor: "transparent",
        },
        {
          label: "3 Vaccinations",
          // data: [{x: 100 * covidData.vaccinations.data.boosterVaccination.quotes.total, y: 1}],
          data: [{ x: 47.6, y: 1 }],
          borderColor: "green",
          borderWidth: 1,
          backgroundColor: "transparent",
        },
        {
          label: "2 Vaccinations",
          // data: [{x: 100 * covidData.vaccinations.data.secondVaccination.quotes.total, y: 1}],
          data: [{ x: 72.8, y: 1 }],
          borderColor: "blue",
          borderWidth: 1,
          backgroundColor: "transparent",
        },
        {
          label: "1 Vaccinations",
          // data: [{x: 100 * covidData.vaccinations.data.quotes.total, y: 1}],
          data: [{ x: 75.1, y: 1 }],
          borderColor: "yellow",
          borderWidth: 1,
          backgroundColor: "transparent",
        },
      ],
    };
  }

  if (!covidData) return <div>loading...</div>;
  return (
    <>
      <div className={styles.number__group}>
        <div className={styles.number__subGroup}>
          <div className={styles.number__element}>
            <p className={styles.label}>Week Incidence</p>
            <p className={styles.value}>
              {Math.round(covidData.overview.weekIncidence).toLocaleString()}
            </p>
          </div>
          <div className={styles.number__element}>
            <p className={styles.label}>Cases</p>
            <p className={styles.value}>
              {covidData.overview.cases.toLocaleString()}
            </p>
          </div>
        </div>
        <div className={styles.number__subGroup}>
          <div className={styles.number__element}>
            <p className={styles.label}>Deaths</p>
            <p className={styles.value}>
              {covidData.overview.deaths.toLocaleString()}
            </p>
          </div>
          <div className={styles.number__element}>
            <p className={styles.label}>Recovered</p>
            <p className={styles.value}>
              {covidData.overview.recovered.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* <div>
                <Bar options={optionsStackedBar} data={vaccinationChartData} />
            </div> */}

      <div id={styles.mainChart} className={styles.dashboard__element}>
        <Chart type="bar" options={options} data={mainChartData} />
      </div>
    </>
  );
}
