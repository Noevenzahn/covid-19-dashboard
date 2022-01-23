import { Doughnut } from "react-chartjs-2";

export default function FirstVaccChart({ covidData }) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "First Vaccinations",
      },
    },
  };

  const FirstVaccChartData = {
    labels: [],
    datasets: [],
  };

  if (covidData && covidData.vaccinations) {
    FirstVaccChartData = {
      labels: [],
      datasets: [
        {
          label: "Hospitalisations",
          data: [
            covidData.vaccinations.data.quote * 100,
            100 - covidData.vaccinations.data.quote * 100,
          ],
          borderColor: "transparent",
          backgroundColor: ["#2e33c7", "#e5eaed"],
        },
      ],
    };
  }

  if (!covidData && !covidData.vaccinations) return <div>loading...</div>;
  return <Doughnut options={options} data={FirstVaccChartData} />;
}
