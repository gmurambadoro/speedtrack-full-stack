import React from "react";
import {Card, ListGroup} from "react-bootstrap";

const ServiceProviders = (props) => {
    const { providers, isp, handleChange } = props;

    const styles = {
        groupItem: {
            cursor: 'pointer',
        },
    };

    const renderProvider = (provider) => {
        return (
            <ListGroup.Item
                key={provider}
                onClick={() => handleChange(provider)}
                style={styles.groupItem}
            >
                {provider.toUpperCase()} {isp.toLowerCase() === provider.toLowerCase() ? '*' : ''}
            </ListGroup.Item>
        );
    };

    return (
        <Card>
            <Card.Header>Internet Service Provider (ISP)</Card.Header>
            <ListGroup variant="flush">

                {
                    providers.length === 1 ? null : (
                        <ListGroup.Item
                            style={styles.groupItem}
                            onClick={() => handleChange('all')}
                        >
                            ALL {isp.toLowerCase() === 'all' ? '*' : ''}
                        </ListGroup.Item>
                    )
                }

                {providers.map(provider => renderProvider(provider))}
            </ListGroup>
        </Card>
    );
};

export default ServiceProviders;
