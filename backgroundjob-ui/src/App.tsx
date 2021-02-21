import React from 'react';
import {Router, Switch, Route} from 'react-router-dom';
import './App.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import {Navbar, Nav,} from "react-bootstrap";
import {JobForm} from "./components/jobs/JobForm";
import {Link} from 'react-router-dom';
import history from './history';
import JobList from "./components/jobs/JobList";

const AddQueue = () => (
    <div className="m-4">
        <Row>
            <h2>Add a job to the queue</h2>
        </Row>
        <Row>
            <JobForm/>
        </Row>
    </div>
)
const JobTable = () => (
    <div className="m-4">
        <Row>
            <p><Link to="/add-to-queue" className="btn btn-info">Add a Job to the Queue</Link></p>
        </Row>
        <Row>
            <JobList/>
        </Row>
    </div>
)

const App: React.FC = () => {
    return (
        <Router history={history}>
            <Container className="p-3">
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="/">Background Jobs</Navbar.Brand>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/all-jobs">Jobs in Queue</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <Jumbotron>
                    <h1 className="header"> Welcome to Background Job handler</h1>
                </Jumbotron>

                <Switch>
                    <Route path="/all-jobs">
                        <JobTable/>
                    </Route>
                    <Route path="/add-to-queue">
                        <AddQueue/>
                    </Route>
                    <Route path="/">
                        <JobTable/>
                    </Route>
                </Switch>
            </Container>
        </Router>
    );
}


export default App;
