import { Line } from 'react-chartjs-2';


export default function PcrTestingChart({ covidData }) {

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

    const pcrTestingChartData = {
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

    if (covidData && covidData.pcrTesting) {
        pcrTestingChartData = {
            labels: [],
            datasets: [
                {
                    label: 'PCR Tests',
                    data: covidData.pcrTesting.data.history.map((pcrTestingData) => { return { x: pcrTestingData.calendarWeek, y: pcrTestingData.performedTests } }),
                    borderColor: 'rgb(0, 255, 0)',
                    backgroundColor: 'rgba(0, 255, 0, 0.5)',
                },
                {
                    label: 'Positive Tests',
                    data: covidData.pcrTesting.data.history.map((pcrTestingData) => { return { x: pcrTestingData.calendarWeek, y: pcrTestingData.positiveTests } }),
                    borderColor: 'rgb(0, 255, 0)',
                    backgroundColor: 'rgba(0, 255, 0, 0.5)',
                },
            ],
        };
    }

    if (!covidData) return <div>loading...</div>
    return (
        <Line options={options} data={pcrTestingChartData} />
    )
}