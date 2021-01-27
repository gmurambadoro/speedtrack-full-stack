import React from "react";

const ServerStatus = ({ timestamp = null }) => {
    if (!timestamp) {
        return <p>Offline</p>
    }

    const date = new Date(timestamp).toLocaleString("en-ZA");


    return <p>{date}</p>
};

export default ServerStatus;