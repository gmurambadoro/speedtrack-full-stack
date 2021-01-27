import React from "react";
import {getLocaleDate, getMegaBytes} from "../services/helpers";
import {Line} from "react-chartjs-2";

const InternetSpeed = (props) => {
    const { speeds, isp } = props;

    const chartData = {
        labels: speeds.map(speed => getLocaleDate(speed.timestamp).toTimeString().split('', 5).join('')),
        datasets: [
            {
                label: 'Download (Mbps)',
                data: speeds.map(speed => getMegaBytes(parseFloat(speed.download))),
                fill: false,
                backgroundColor: 'green',
                borderColor: 'green',
            },
            {
                label: 'Upload (Mbps)',
                data: speeds.map(speed => getMegaBytes(parseFloat(speed.upload))),
                fill: false,
                backgroundColor: 'red',
                borderColor: 'red',
            },
        ],
    }

    let chartTitle = `Internet Speed (${new Date().toDateString()})`;

    if (isp.toLowerCase() === 'all') {
        chartTitle += " - All Networks".toUpperCase();
    } else {
        chartTitle += " - " + isp.toUpperCase();
    }

    const chartOptions = {
        title: {
            display: true,
            text: chartTitle,
        },
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                    label: {
                    }
                },
            ],
        },
    }

    return (
        <React.Fragment>
            <h3 className="mt-3">Internet Speeds</h3>

            <Line data={chartData} options={chartOptions} />
        </React.Fragment>
    );
};

export default InternetSpeed;