import React from "react";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWifi, faExclamation} from "@fortawesome/free-solid-svg-icons";
import {LAST_ACTIVITY_INTERVAL_MINUTES} from "../config";
import {getLocaleDate} from "../services/helpers";

const Status = ({ timestamp = null }) => {
    const offline = <Button variant="danger" className="text-uppercase"><FontAwesomeIcon icon={faExclamation} /> Offline</Button>;

    const online = <Button variant="success" className="text-uppercase"><FontAwesomeIcon icon={faWifi} /> Online</Button>;

    if (!timestamp) {
        return offline;
    }

    const dateDiffMilliseconds = (new Date()) - getLocaleDate(timestamp || '');

    if (dateDiffMilliseconds > (LAST_ACTIVITY_INTERVAL_MINUTES * 60 * 1000)) {
        return offline;
    }

    return online;
};

export default Status;