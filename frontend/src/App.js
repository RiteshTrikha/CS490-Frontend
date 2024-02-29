import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import FilmsPage from './pages/FilmsPage';
import CustomersPage from './pages/CustomersPage';
import { Navbar, Container, Nav } from "react-bootstrap";

function App() {
    return (
        <div className="bg-gray">
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href='/'>
                        Sakila Blockbuster
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav>
                            <Nav.Link href='/'>Home</Nav.Link>
                            <Nav.Link href='/films'>Films</Nav.Link>
                            <Nav.Link href='/customers'>Customers</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Router>
                <Routes>
                    <Route path="/" exact element={<IndexPage />} />
                    <Route path="/films" exact element={<FilmsPage />} />
                    <Route path="/customers" exact element={<CustomersPage />} />
                    {/* Define other routes here */}
                </Routes>
            </Router>
        </div>
    );
}

export default App;
