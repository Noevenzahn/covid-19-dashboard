import { Doughnut } from 'react-chartjs-2';


export default function FirstVaccChart({ covidData }) {
    
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'First Vaccinations',
            },
        },
    };
    
    const FirstVaccChartData = {
        labels: [],
        datasets: [
            {
                label: 'Dataset 1',
                data: [{ x: '2016-12-25', y: 20 }, { x: '2016-12-26', y: 10 }],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    }

    if (covidData && covidData.hospitalizationHistory) {
        FirstVaccChartData = {
            labels: [],
            datasets: [
                {
                    label: 'Hospitalisations',
                    data: [covidData.vaccinations.data.quote * 100, 100 - covidData.vaccinations.data.quote * 100],
                    borderColor: 'rgb(0, 255, 0)',
                    backgroundColor: ['rgba(0, 255, 0, 0.5)', 'rgba(255, 255, 255, 0.5)']
                },
            ],
        };
    }
    
    if (!covidData) return <div>loading...</div>
    return (
        <Doughnut options={options} data={FirstVaccChartData} />
    )
}