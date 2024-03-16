import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

function ActorDetailsModal({ actorId, show, onClose }) {
    const [actorDetails, setActorDetails] = useState(null);

    useEffect(() => {
        if (actorId && show) {
            axios.get(`http://localhost:5000/api/actor/${actorId}/top-films`)
                .then(response => {
                    setActorDetails(response.data);
                })
                .catch(error => {
                    console.error('Error fetching actor details:', error);
                });
        }
    }, [actorId, show]);

    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Actor Movie Rentals</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {actorDetails ? (
                    <>
                        <h2>{actorDetails.first_name} {actorDetails.last_name}</h2>
                        <ul>
                            {actorDetails.map(film => (
                                <li key={film.film_id}>
                                    <strong>{film.title}</strong> (Rentals: {film.rental_count})
                                </li>
                            ))}
                        </ul>
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ActorDetailsModal;
