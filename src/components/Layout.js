import React from "react";
import ServerStatusIndicator from "./ServerStatus";

const Layout = (props) => {
    const { speedData = [] } = props;

    const [latestSpeed = {timestamp: null}] = speedData;

    return (
        <div>
            <h1>Header</h1>

            <ServerStatusIndicator timestamp={latestSpeed.timestamp || null} />

            {props.children}
        </div>
    );
};

export default Layout;