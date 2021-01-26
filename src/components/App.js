import React, {useEffect, useState} from "react";
import {findSpeeds} from "../services/speedtrack-api";

const App = () => {
    const [speedData, setSpeedData] = useState([]);

    useEffect(() => {
        findSpeeds().then(data => setSpeedData([...data]));
    }, []);

    console.log(speedData);

    return <p>App</p>;
};

export default App;