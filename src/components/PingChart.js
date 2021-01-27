import React from "react";
import {getLocaleDate, getMegaBytes} from "../services/helpers";
import {Line} from "react-chartjs-2";

const PingChart = (props) => {
    const { speeds, isp } = props;

    const chartOptions = {
        title: {
            display: true,
            text: `Latency - ${isp.toUpperCase()} ISP(s)`,
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

    const chartData = {
        labels: speeds.map(speed => getLocaleDate(speed.timestamp).toTimeString().split('', 5).join('')),
        datasets: [
            {
                label: 'Ping (ms)',
                data: speeds.map(speed => getMegaBytes(parseFloat(speed.ping))),
                fill: false,
                backgroundColor: 'green',
                borderColor: 'green',
            },
        ],
    }

    return (
        <React.Fragment>
            <h4 className="mt-3">Latency</h4>

            <Line data={chartData} options={chartOptions} />
        </React.Fragment>
    );
};

export default PingChart;