import React, {useEffect, useState} from "react";
import {findSpeeds} from "../services/speedtrack-api";
import {REFRESH_INTERVAL_MILLISECONDS} from "../config";
import Layout from "./Layout";

const App = () => {
    const [speedData, setSpeedData] = useState([]);

    const refreshData = () => {
        findSpeeds().then(speeds => {
            setSpeedData([...speeds]);

            console.log('DATA REFRESHED @ ' + new Date());
        });
    };

    useEffect(() => {
        const timer = setInterval(refreshData, REFRESH_INTERVAL_MILLISECONDS);

        refreshData(); // force an initial data fetch

        return () => clearInterval(timer); // clear the timer when component unmounts
    }, []); // this effect should only run once

    return <Layout speedData={speedData} />;
};

export default App;