import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardBody, Button, Modal, Row, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

function TopActors() {
    const [topActors, setTopActors] = useState([]);
    const [actorDetails, setActorDetails] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const location = useLocation();
    const selectedStore = location.pathname.split('/').pop(); // Extract store number from URL

    useEffect(() => {
        fetchTopActors();
    }, [selectedStore]); // Fetch top actors whenever selectedStore changes

    const fetchTopActors = () => {
        let url = selectedStore ? `http://localhost:5000/api/store/${selectedStore}/top-actors` : `http://localhost:5000/api/top-actors`;

        axios.get(url)
            .then(response => {
                setTopActors(response.data);
            })
            .catch(error => {
                console.error('Error fetching top actors:', error);
            });
    };

    const retrieveActorDetails = (actorId) => {
        axios.get(`http://localhost:5000/api/actor/${actorId}/top-films`)
            .then(response => {
                setActorDetails(response.data);
                setShowModal(true);
            })
            .catch(error => {
                console.error('Error fetching actor details:', error);
            });
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setActorDetails(null);
    };

    const storeTitle = selectedStore ? ` - Store ${selectedStore}` : '';

    return (
        <div className="pt-5">
            <div className="container">
                <Card className="p-4 mb-4">
                    <CardBody>
                        <h2 className="mb-4">Top 5 Actors{storeTitle}</h2>
                        <Row xs={1} md={2} lg={3} xl={4} className="g-4">
                            {topActors.map(actor => (
                                <Col key={actor.actor_id}>
                                    <Card className="h-100">
                                        <CardBody>
                                            <h4>{actor.first_name} {actor.last_name}</h4>
                                            <h5>Total Films Rented: {actor.film_count}</h5>
                                            <Button variant="primary" onClick={() => retrieveActorDetails(actor.actor_id)}>
                                                View Actor
                                            </Button>
                                        </CardBody>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </CardBody>
                </Card>
            </div>
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Actor Movie Rentals</Modal.Title>
                </Modal.Header>
                {actorDetails && (
                    <Modal.Body>
                        <h2>{actorDetails.first_name} {actorDetails.last_name}</h2>
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                            {actorDetails.map(film => (
                                <li key={film.film_id} style={{ marginBottom: '8px' }}>
                                    <strong>{film.title}</strong> (Rentals: {film.rental_count})
                                </li>
                            ))}
                        </ul>
                    </Modal.Body>
                )}
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default TopActors;
