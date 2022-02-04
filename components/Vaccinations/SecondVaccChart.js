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
        text: "Second Vaccinations",
      },
    },
  };

  let SecondVaccChartData = {
    labels: [],
    datasets: [],
  };

  if (covidData && covidData.vaccinations) {
    SecondVaccChartData = {
      labels: [],
      datasets: [
        {
          label: "Hospitalisations",
          data: [
            covidData.vaccinations.data.secondVaccination.quote * 100,
            100 - covidData.vaccinations.data.secondVaccination.quote * 100,
          ],
          borderColor: "transparent",
          backgroundColor: ["#2e33c7", "#e5eaed"],
        },
      ],
    };
  }

  if (!covidData) return <div>loading...</div>;
  return <Doughnut options={options} data={SecondVaccChartData} />;
}
