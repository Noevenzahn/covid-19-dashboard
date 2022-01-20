import { Line } from "react-chartjs-2";

export default function HospitalizationChart({ covidData }) {
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Hospitalisations",
      },
    },
    elements: {
      point: {
        radius: 0,
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
    },
  };

  const hospitalizationChartData = {
    labels: [],
    datasets: [],
  };

  if (covidData && covidData.hospitalizationHistory) {
    hospitalizationChartData = {
      labels: [],
      datasets: [
        {
          label: "Hospitalisations",
          data: covidData.hospitalizationHistory.data.map(
            (hospitalizationData) => {
              return {
                x: hospitalizationData.date,
                y: hospitalizationData.cases7Days,
              };
            }
          ),
          fill: true,
          borderColor: "transparent",
          backgroundColor: "#2e33c7",
        },
      ],
    };
  }

  if (!covidData) return <div>loading...</div>;
  return <Line options={options} data={hospitalizationChartData} />;
}
