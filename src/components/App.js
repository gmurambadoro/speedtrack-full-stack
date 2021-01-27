import React, {useEffect, useState} from "react";
import {findSpeeds} from "../services/speedtrack-api";
import {REFRESH_INTERVAL_MILLISECONDS} from "../config";
import Layout from "./Layout";
import {getLocaleDate} from "../services/helpers";

const App = () => {
    // apply the date at the top-level so that components have less// data to process
    const [date, setDate] = useState(new Date());

    // internet speed for the specified date above
    const [speeds, setSpeeds] = useState([]);

    useEffect(() => {
        const refreshData = () => {
            findSpeeds().then(speeds => {
                const filtered = speeds
                    .filter(speed => getLocaleDate(speed.timestamp).toLocaleDateString() === date.toLocaleDateString());

                setSpeeds([...filtered]);

                console.log('DATA REFRESHED @ ' + new Date());
            });
        };

        const timer = setInterval(refreshData, REFRESH_INTERVAL_MILLISECONDS);

        refreshData(); // force an initial data fetch

        return () => clearInterval(timer); // clear the timer when component unmounts
    }, [date]); // this effect should only run once or when the date is changed

    return <Layout date={date} speeds={speeds} onDateChanged={(d) => setDate(d)} />;
};

export default App;