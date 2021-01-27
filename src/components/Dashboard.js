import React, {useState} from "react";
import {Col, Row} from "react-bootstrap";
import ServiceProviders from "./ServiceProviders";
import InternetSpeed from "./InternetSpeed";

const Dashboard = (props) => {
    const [isp, setIsp] = useState('all');

    const { speeds = [] } = props;
    
    const serviceProviders = speeds.filter(speed => speed.client && speed.client.isp).map(speed => speed.client.isp);

    const filterSpeedByProvider = () => speeds.filter(speed => {
        if (isp.toLowerCase() === 'all') {
            return true;
        }

        return isp.toLowerCase() === String(speed.client.isp).toString().toLowerCase();
    });

    return (
        <Row>
            <Col md={10}>
                <InternetSpeed isp={isp} speeds={filterSpeedByProvider()} />
            </Col>

            <Col md={2}>
                <div className={"mt-3"}>
                    <ServiceProviders
                        providers={[...(new Set(serviceProviders))]}
                        isp={isp}
                        handleChange={(provider) => setIsp(provider)}
                    />
                </div>
            </Col>
        </Row>
    );
};

export default Dashboard;