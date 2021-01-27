import React from "react";
import {Card} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown, faArrowUp} from "@fortawesome/free-solid-svg-icons";
import {formatBytes} from "../services/helpers";

const TotalBandwidth = (props) => {
    const {speeds = []} = props;

    const totalBytesSent = speeds.reduce((previousValue, currentValue) => previousValue + parseFloat(currentValue['bytes_sent']), 0);
    const totalBytesReceived = speeds.reduce((previousValue, currentValue) => previousValue + parseFloat(currentValue['bytes_received']), 0);

    const styles = {
        span: {
            cursor: 'pointer',
        },
    };

    return (
        <Card>
            <Card.Header title="Total Bytes Exchanged">
                Total Payload &mdash; {formatBytes(totalBytesReceived + totalBytesSent)}
            </Card.Header>
            <Card.Body>
                <span title={"Bytes Received / Downloaded"} style={styles.span}>
                    <FontAwesomeIcon icon={faArrowDown} /> {formatBytes(totalBytesReceived)}
                </span>

                <span title="Bytes Sent / Uploaded" className="float-right" style={styles.span}>
                    <FontAwesomeIcon icon={faArrowUp} /> {formatBytes(totalBytesSent)}
                </span>
            </Card.Body>
        </Card>
    );
};

export default TotalBandwidth;