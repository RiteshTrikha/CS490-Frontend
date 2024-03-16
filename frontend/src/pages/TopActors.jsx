import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardBody, Button, Row, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import ActorDetailsModal from '../components/ActorDetailsModal';

function TopActorsPage() {
    const [topActors, setTopActors] = useState([]);
    const [selectedActorId, setSelectedActorId] = useState(null);
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

    const handleActorDetails = (actorId) => {
        setSelectedActorId(actorId);
        setShowModal(true);
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
                                            <h5>{actor.first_name} {actor.last_name}</h5>
                                            <p>Total Films Rented: {actor.film_count}</p>
                                            <Button variant="primary" onClick={() => handleActorDetails(actor.actor_id)}>
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
            <ActorDetailsModal actorId={selectedActorId} show={showModal} onClose={() => setShowModal(false)} />
        </div>
    );
}

export default TopActorsPage;
