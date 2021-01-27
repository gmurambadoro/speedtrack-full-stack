import React, {useState} from "react";
import {Col, Row} from "react-bootstrap";
import ServiceProviders from "./ServiceProviders";
import InternetSpeed from "./InternetSpeed";
import TotalBandwidth from "./TotalBandwidth";

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

    return (
        <Row>
            <Col md={9}>
                <InternetSpeed isp={isp} speeds={speeds.filter(ispFilter)} />
            </Col>

            <Col md={3}>
                <div className={"mt-3"}>
                    <div className="mb-2">
                        <TotalBandwidth speeds={speeds.filter(ispFilter)} />
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