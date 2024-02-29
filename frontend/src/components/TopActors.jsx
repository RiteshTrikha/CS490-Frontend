import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Card, CardBody, Row, Button, Modal} from 'react-bootstrap';

function TopActors() {
    const [topActors, setTopActors] = useState([]);
    const [actorDetails, setActorDetails] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:5000/api/top-actors')
            .then(response => {
                setTopActors(response.data);
            })
            .catch(error => {
                console.error('Error fetching top actors:', error);
            });
    }, []);

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
        setActorDetails(null); // Reset top films state when closing modal
    };

    return (
        <div className="d-flex justify-content-right align-items-center pt-5">
            <div className="container">
                <div className="col-md-auto">
                    <Card className="p-4 mb-4">
                        <CardBody>
                            <h2 className="mb-4">Top 5 Actors</h2>
                            <Row>
                                {topActors.map(actor => (
                                    <Card key={actor.id} className="m-2">
                                        <CardBody>
                                            <h4>{actor.first_name} {actor.last_name}</h4>
                                            <h5>Total Films: {actor.film_count}</h5>
                                            <Button variant="primary"
                                                    onClick={() => retrieveActorDetails(actor.actor_id)}>
                                                View Actor
                                            </Button>
                                        </CardBody>
                                    </Card>
                                ))}
                            </Row>
                        </CardBody>
                    </Card>
                </div>
            </div>
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Actor Details</Modal.Title>
                </Modal.Header>
                {actorDetails && (
                    <Modal.Body>
                        <h2>{actorDetails.first_name} {actorDetails.last_name}</h2>
                        <h3>Top Films:</h3>
                        <ul style={{listStyleType: 'none', padding: 0}}>
                            {actorDetails.map(film => (
                                <li key={film.id} style={{marginBottom: '8px'}}>
                                    <strong>{film.title}</strong> (Rentals: {film.rental_count})</li>
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
