import React, {useState} from "react";
import {Col, Row} from "react-bootstrap";
import ServiceProviders from "./ServiceProviders";
import InternetSpeedChart from "./InternetSpeedChart";
import TotalBandwidth from "./TotalBandwidth";
import PingChart from "./PingChart";

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

    const filterSpeedByIsp = () => speeds.filter(ispFilter);

    return (
        <Row>
            <Col md={9}>
                <InternetSpeedChart isp={isp} speeds={filterSpeedByIsp()} />

                <PingChart isp={isp} speeds={filterSpeedByIsp()} />
            </Col>

            <Col md={3}>
                <div className={"mt-3"}>
                    <div className="mb-2">
                        <TotalBandwidth speeds={filterSpeedByIsp()} />
                    </div>

                    <ServiceProviders
                        providers={serviceProviders}
                        isp={isp}
                        handleChange={(provider) => setIsp(provider)}
                    />
                </div>
            </Col>
        </Row>
    );
};

export default Dashboard;