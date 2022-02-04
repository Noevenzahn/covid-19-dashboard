import { Doughnut } from "react-chartjs-2";

export default function BoosterVaccChart({ covidData }) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Booster Vaccinations",
      },
    },
  };

  let BoosterVaccChartData = {
    labels: [],
    datasets: [],
  };

  if (covidData && covidData.vaccinations) {
    BoosterVaccChartData = {
      labels: [],
      datasets: [
        {
          label: "Hospitalisations",
          data: [
            covidData.vaccinations.data.boosterVaccination.quote * 100,
            100 - covidData.vaccinations.data.boosterVaccination.quote * 100,
          ],
          borderColor: "transparent",
          backgroundColor: ["#2e33c7", "#e5eaed"],
        },
      ],
    };
  }

  if (!covidData) return <div>loading...</div>;
  return <Doughnut options={options} data={BoosterVaccChartData} />;
}
