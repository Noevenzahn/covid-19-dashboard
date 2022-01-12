import { Line } from 'react-chartjs-2';


export default function HospitalizationChart({ covidData }) {
    
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
    
    const hospitalizationChartData = {
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
        hospitalizationChartData = {
            labels: [],
            datasets: [
                {
                    label: 'Hospitalisations',
                    data: covidData.hospitalizationHistory.data.map((hospitalizationData) => { return { x: hospitalizationData.date.substring(0, 10), y: hospitalizationData.cases7Days } }),
                    borderColor: 'rgb(0, 255, 0)',
                    backgroundColor: 'rgba(0, 255, 0, 0.5)',
                },
            ],
        };
    }
    
    if (!covidData) return <div>loading...</div>
    return (
        <div>
            <Line options={options} data={hospitalizationChartData} />
        </div>
    )
}