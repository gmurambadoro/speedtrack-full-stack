import React from "react";
import {Col, Row} from "react-bootstrap";
import {Line} from "react-chartjs-2";
import {getLocaleDate, getMegaBytes} from "../services/helpers";

const Dashboard = (props) => {
    const { speeds: allSpeeds = [] } = props;

    const speeds = allSpeeds.filter(speed => getLocaleDate(speed.timestamp).getDate() === new Date().getDate());

    const data = {
        labels: speeds.map(speed => getLocaleDate(speed.timestamp).toTimeString()),
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

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    }

    return (
        <Row>
            <Col>
                <h3 className="mt-2">Upload / Download Speeds</h3>

                <Line data={data} options={options} />
            </Col>
        </Row>
    );
};

export default Dashboard;