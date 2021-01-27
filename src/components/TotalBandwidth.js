import React from "react";
import {Card} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload, faUpload} from "@fortawesome/free-solid-svg-icons";
import {formatBytes} from "../services/helpers";

const TotalBandwidth = (props) => {
    const {speeds = []} = props;

    const totalBytesSent = speeds.reduce((previousValue, currentValue) => previousValue + parseFloat(currentValue['bytes_sent']), 0);
    const totalBytesReceived = speeds.reduce((previousValue, currentValue) => previousValue + parseFloat(currentValue['bytes_received']), 0);


    return (
        <Card>
            <Card.Header>
                Total Payload &mdash; {formatBytes(totalBytesReceived + totalBytesSent)}
            </Card.Header>
            <Card.Body>
                <span>
                    <FontAwesomeIcon icon={faDownload} /> {formatBytes(totalBytesReceived)}
                </span>

                <span className="float-right">
                    <FontAwesomeIcon icon={faUpload} /> {formatBytes(totalBytesSent)}
                </span>
            </Card.Body>
        </Card>
    );
};

export default TotalBandwidth;