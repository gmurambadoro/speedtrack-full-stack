import React, {useEffect, useState} from "react";
import {findSpeeds} from "../services/speedtrack-api";
import {REFRESH_INTERVAL_SECONDS} from "../config";

const App = () => {
    const [speedData, setSpeedData] = useState([]);

    const refreshData = () => {
        findSpeeds()
            .then(data => setSpeedData([...data]));
    };

    useEffect(() => {
        const timer = setInterval(() => refreshData, REFRESH_INTERVAL_SECONDS);

        refreshData(); // force an initial data fetch

        return () => clearInterval(timer); // clear the timer when component unmounts
    }, []); // this effect should only run once

    console.log(speedData);

    return <p>App</p>;
};

export default App;