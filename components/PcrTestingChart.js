import { Line } from 'react-chartjs-2';


export default function PcrTestingChart({ covidData }) {

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'PCR Tests',
            },
        },
    };

    const pcrTestingChartData = {
        labels: [],
        datasets: [],
    }

    if (covidData && covidData.pcrTesting) {
        pcrTestingChartData = {
            labels: [],
            datasets: [
                {
                    label: 'PCR Tests',
                    data: covidData.pcrTesting.data.history.map((pcrTestingData) => { return { x: pcrTestingData.calendarWeek, y: pcrTestingData.performedTests } }),
                    borderColor: '#2e33c7',
                    backgroundColor: '#2e33c7',
                },
                {
                    label: 'Positive Tests',
                    data: covidData.pcrTesting.data.history.map((pcrTestingData) => { return { x: pcrTestingData.calendarWeek, y: pcrTestingData.positiveTests } }),
                    borderColor: '#2e33c7',
                    backgroundColor: '#2e33c7',
                },
            ],
        };
    }

    if (!covidData) return <div>loading...</div>
    return (
        <Line options={options} data={pcrTestingChartData} />
    )
}