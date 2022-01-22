import { Line } from "react-chartjs-2";

export default function PcrTestingChart({ covidData }) {
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "PCR Tests",
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };

  const pcrTestingChartData = {
    labels: [],
    datasets: [],
  };

  if (covidData && covidData.pcrTesting) {
    pcrTestingChartData = {
      labels: [],
      datasets: [
        {
          label: "Positive Tests",
          data: covidData.pcrTesting.data.history.map((pcrTestingData) => {
            return {
              x: pcrTestingData.calendarWeek,
              y: pcrTestingData.positiveTests,
            };
          }),
          fill: true,
          borderColor: "transparent",
          backgroundColor: "#2e33c7",
        },
        {
          label: "PCR Tests",
          data: covidData.pcrTesting.data.history.map((pcrTestingData) => {
            return {
              x: pcrTestingData.calendarWeek,
              y: pcrTestingData.performedTests,
            };
          }),
          fill: true,
          borderColor: "transparent",
          backgroundColor: "#e5eaed",
        },
      ],
    };
  }

  if (!covidData) return <div>loading...</div>;
  return <Line options={options} data={pcrTestingChartData} />;
}
