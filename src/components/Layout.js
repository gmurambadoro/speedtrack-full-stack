import React from "react";
import Status from "./Status";
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import {Container, Nav, Navbar} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome} from "@fortawesome/free-solid-svg-icons";
import {APP_NAME} from "../config";
import Dashboard from "./Dashboard";

const Layout = (props) => {
    const { speedData: speeds = [] } = props;

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