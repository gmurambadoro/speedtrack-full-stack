import React from "react";
import parse from "html-react-parser";
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import {Container, Nav, Navbar} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {APP_NAME} from "../config";
import Dashboard from "./Dashboard";
import Status from "./Status";

const Layout = (props) => {
    const { speeds = [], date = new Date(), onDateChanged } = props;
    const current = { timestamp: null };

    if (speeds.length > 0) {
        current.timestamp = speeds[speeds.length - 1].timestamp; // records are sorted by timestamp asc
    }

    return (
        <BrowserRouter>
            <header>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand as={Link} to="/">{parse(APP_NAME)}</Navbar.Brand>
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

                        <Status timestamp={current.timestamp} />
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