import { Line } from 'react-chartjs-2';


export default function HospitalizationChart({ covidData }) {
    
    const options = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Hospitalisations',
            },
        },
    };
    
    const hospitalizationChartData = {
        labels: [],
        datasets: [],
    }

    if (covidData && covidData.hospitalizationHistory) {
        hospitalizationChartData = {
            labels: [],
            datasets: [
                {
                    label: 'Hospitalisations',
                    data: covidData.hospitalizationHistory.data.map((hospitalizationData) => { return { x: hospitalizationData.date.substring(0, 10), y: hospitalizationData.cases7Days } }),
                    borderColor: '#2e33c7',
                    backgroundColor: '#2e33c7',
                },
            ],
        };
    }
    
    if (!covidData) return <div>loading...</div>
    return (
        <Line options={options} data={hospitalizationChartData} />
    )
}