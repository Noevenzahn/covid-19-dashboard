import { Line, Chart } from 'react-chartjs-2';


export default function MainChart({ covidData }) {

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: 'General Overview',
            },
        },
        elements: {
            point: {
                radius: 0
            }
        },
        scales: {
            x: {
                type: 'time',
                time: {
                    displayFormats: {
                        month: 'MMM'
                    }
                },
                grid: {
                    display: false
                    // color: "#e5eaed"
                }
            },
            y: {
                grid: {
                    display: false,
                    // color: "#e5eaed"
                }
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
                    type: 'line',
                    label: 'Recovered',
                    data: covidData.recoveredHistory.data.map((recoveredData) => { return { x: recoveredData.date.substring(0, 10), y: recoveredData.recovered } }),
                    borderColor: '#2e33c7',
                    backgroundColor: '#2e33c7',
                },
                {
                    type: 'line',
                    label: 'Cases',
                    data: covidData.casesHistory.data.map((casesData) => { return { x: casesData.date.substring(0, 10), y: casesData.cases } }),
                    borderColor: '#2e33c7',
                    backgroundColor: '#2e33c7',
                },
                {
                    type: 'bar',
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
        <Chart type="bar" options={options} data={mainChartData} />
    )
}