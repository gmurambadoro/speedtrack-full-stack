import React from "react";
import {Badge, Card} from "react-bootstrap";

const Sponsors = (props) => {
    const { sponsors = [] } = props;

    const renderSponsor = (name, key) => {
        const variants = ['success', 'danger', 'info', 'warning', 'dark'];

        const index = Math.floor(Math.random() * variants.length);

        return <Badge key={key} variant={variants[index]} className="m-1">{name}</Badge>
    }

    return (
        <Card>
            <Card.Header>
                Sponsors
            </Card.Header>
            <Card.Body>
                {sponsors.map((sponsor, index) => renderSponsor(sponsor, index))}
            </Card.Body>
        </Card>
    );
};

export default Sponsors;