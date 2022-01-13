import { Line } from 'react-chartjs-2';


export default function MainChart({ covidData }) {

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'General Overview',
            },
        },
    };

    const mainChartData = {
        labels: [],
        datasets: [],
    };

    if (covidData
        && covidData.casesHistory
        && covidData.recoveredHistory
        && covidData.deathsHistory) {
        mainChartData = {
            labels: [],
            datasets: [
                {
                    label: 'Recovered',
                    data: covidData.recoveredHistory.data.map((recoveredData) => { return { x: recoveredData.date.substring(0, 10), y: recoveredData.recovered } }),
                    borderColor: '#2e33c7',
                    backgroundColor: '#2e33c7',
                },
                {
                    label: 'Cases',
                    data: covidData.casesHistory.data.map((casesData) => { return { x: casesData.date.substring(0, 10), y: casesData.cases } }),
                    borderColor: '#2e33c7',
                    backgroundColor: '#2e33c7',
                },
                {
                    label: 'Deaths',
                    data: covidData.deathsHistory.data.map((deathsData) => { return { x: deathsData.date.substring(0, 10), y: deathsData.deaths } }),
                    borderColor: '#2e33c7',
                    backgroundColor: '#2e33c7',
                },
            ],
        };
    }

    if (!covidData) return <div>loading...</div>
    return (
        <Line options={options} data={mainChartData} />
    )
}