// MovieDetailsModal.jsx

import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

function MovieDetailsModal({ movie, onClose }) {
    const [movieDetails, setMovieDetails] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (movie) {
            setLoading(true);
            axios.get(`http://localhost:5000/api/movie/${movie.film_id}`)
                .then(response => {
                    setMovieDetails(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching movie details:', error);
                    setLoading(false);
                });
        }
    }, [movie]);

    const handleRentMovie = () => {
        // Redirect to rental page with film ID in the URL
        window.location.href = `/rental/${movie.film_id}`;
    };

    return (
        <Modal show={!!movie} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Movie Details</Modal.Title>
            </Modal.Header>
            {loading ? (
                <Modal.Body>Loading...</Modal.Body>
            ) : (
                <>
                    {movieDetails && (
                        <Modal.Body>
                            <h2>{movieDetails.title}</h2>
                            <p><strong>Description:</strong> {movieDetails.description}</p>
                            <p><strong>Release Year:</strong> {movieDetails.release_year}</p>
                            <p><strong>Rental Rate:</strong> {movieDetails.rental_rate}</p>
                            <p><strong>Length:</strong> {movieDetails.length} minutes</p>

                            <Form.Group controlId="formCustomerId">
                                <Form.Label>Customer ID:</Form.Label>
                                <Form.Control type="text" placeholder="Enter customer ID" />
                            </Form.Group>

                            <Button variant="primary" onClick={handleRentMovie}>
                                Rent Movie
                            </Button>
                        </Modal.Body>
                    )}
                </>
            )}
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default MovieDetailsModal;
