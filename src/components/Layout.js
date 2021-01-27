import React from "react";
import Status from "./Status";
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import {Container, Nav, Navbar} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {APP_NAME} from "../config";
import Dashboard from "./Dashboard";

const Layout = (props) => {
    const { speeds = [], date = new Date(), onDateChanged } = props;

    const [latestSpeed = {timestamp: null}] = speeds;

    return (
        <BrowserRouter>
            <header>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand as={Link} to="/">{APP_NAME}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            {/*<Nav.Link as={Link} to="/"><FontAwesomeIcon icon={faHome} /> Home</Nav.Link>*/}
                            {/*<Nav.Link as={Link} to="/about">About</Nav.Link>*/}
                        </Nav>

                        <Nav className="mr-2">
                            <Nav.Item>
                                <DatePicker className="form-control" selected={date} onChange={(d) => onDateChanged(d)} />
                            </Nav.Item>
                        </Nav>

                        <Status timestamp={latestSpeed.timestamp} />
                    </Navbar.Collapse>
                </Navbar>
            </header>

            <main>
                <Container>
                    <Switch>
                        <Route
                            exact
                            path="/"
                            component={(props) => <Dashboard {...props} speeds={speeds} />}
                        />
                    </Switch>
                </Container>
            </main>

            <footer />
        </BrowserRouter>
    );
};

export default Layout;