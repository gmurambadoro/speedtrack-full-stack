import React, {useState} from "react";
import {Col, Row} from "react-bootstrap";
import ServiceProviders from "./ServiceProviders";
import InternetSpeedChart from "./InternetSpeedChart";
import TotalBandwidth from "./TotalBandwidth";
import PingChart from "./PingChart";
import Sponsors from "./Sponsers";
import Github from "./Github";

const Dashboard = (props) => {
    const [isp, setIsp] = useState('all');

    const { speeds = [] } = props;
    
    const serviceProviders = [...(new Set(speeds.filter(speed => speed.client && speed.client.isp).map(speed => speed.client.isp)))];

    const ispFilter = (speed) => {
        if (isp.toLowerCase() === 'all') {
            return true;
        }

        return isp.toLowerCase() === String(speed.client.isp).toString().toLowerCase();
    };

    const getSpeedFilteredByISP = () => speeds.filter(ispFilter);

    return (
        <Row>
            <Col md={9}>
                <InternetSpeedChart isp={isp} speeds={getSpeedFilteredByISP()} />

                <PingChart isp={isp} speeds={getSpeedFilteredByISP()} />
            </Col>

            <Col md={3}>
                <div className={"mt-3"}>
                    <div className="mb-2">
                        <TotalBandwidth speeds={getSpeedFilteredByISP()} />
                    </div>

                    <ServiceProviders
                        providers={serviceProviders}
                        isp={serviceProviders.length === 1 ? serviceProviders[0] : isp}
                        handleChange={(provider) => setIsp(provider)}
                    />

                    <div className="mt-2">
                        <Sponsors sponsors={[...(new Set(getSpeedFilteredByISP().map(speed => speed.server.sponsor)))]} />
                    </div>

                    <div className="mt-2 mb-2">
                        <Github />
                    </div>
                </div>
            </Col>
        </Row>
    );
};

export default Dashboard;