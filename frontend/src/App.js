import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation, useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav, NavDropdown, Row, Col } from "react-bootstrap";
import IndexPage from './pages/IndexPage';
import FilmsPage from './pages/FilmsPage';
import CustomersPage from './pages/CustomersPage';
import TopActors from './components/TopActors';
import TopMovies from './components/TopMovies';

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

function AppContent() {
    const [selectedStore, setSelectedStore] = useState('1');
    const location = useLocation();
    const navigate = useNavigate();

    const handleSelectStore = (storeId) => {
        setSelectedStore(storeId);
        navigate(`/store/${storeId}`);
    };

    useEffect(() => {
        const isStore2PreviouslySelected = localStorage.getItem('selectedStore') === '2';
        if (!location.pathname.startsWith('/store') && isStore2PreviouslySelected) {
            navigate('/store/2');
        }
    }, [location.pathname, navigate]);

    const handleRedirectToStore1 = () => {
        if (selectedStore === '2') {
            localStorage.setItem('selectedStore', '1');
            setSelectedStore('1');
            navigate('/store/1');
        }
    };

    return (
        <div className="bg-gray">
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to='/'>
                        Sakila Blockbuster
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to='/'>Home</Nav.Link>
                            <Nav.Link as={Link} to='/films'>Films</Nav.Link>
                            <Nav.Link as={Link} to='/customers'>Customers</Nav.Link>
                            <NavDropdown title="Select Store" id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/store/1" onClick={() => handleSelectStore('1')} selected={selectedStore === '1'}>Store 1</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/store/2" onClick={() => handleSelectStore('2')} selected={selectedStore === '2'}>Store 2</NavDropdown.Item>
                                {/* Add more store options as needed */}
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Routes>
                <Route path="/" element={<IndexPage />} />
                <Route path="/store/:storeId" element={
                    <Row>
                        <Col>
                            <TopMovies storeId={selectedStore} />
                        </Col>
                        <Col>
                            <TopActors selectedStore={selectedStore} handleSelectStore={handleSelectStore} />
                        </Col>
                    </Row>
                } />
                <Route path="/films" element={<FilmsPage />} />
                <Route path="/customers" element={<CustomersPage />} />
                {/* Define other routes here */}
            </Routes>
        </div>
    );
}

export default App;
