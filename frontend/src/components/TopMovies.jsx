import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardBody, Button, Modal, Row, Col } from 'react-bootstrap';

function TopMovies() {
    const [movies, setMovies] = useState([]);
    const [movieDetails, setMovieDetails] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:5000/api/top-movies')
            .then(response => {
                setMovies(response.data);
            })
            .catch(error => {
                console.error('Error fetching top movies:', error);
            });
    }, []);

    const retrieveMovieDetails = (film_id) => {
        axios.get(`http://localhost:5000/api/movie/${film_id}`)
            .then(response => {
                setMovieDetails(response.data);
                setShowModal(true);
            })
            .catch(error => {
                console.error('Error fetching movie ' + film_id + ': ', error);
            });
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setMovieDetails(null);
    };

    return (
        <div className="pt-5">
            <div className="container">
                <Card className="p-4 mb-4">
                    <CardBody>
                        <h1 className="mb-4">Top 5 Rented Films</h1>
                        <Row xs={1} md={2} lg={3} xl={4} className="g-4">
                            {movies.map(movie => (
                                <Col key={movie.film_id}>
                                    <Card className="h-100">
                                        <CardBody>
                                            <h2 style={{ fontSize: `${Math.max(20, 200 / movie.title.length)}px` }}>{movie.title}</h2>
                                            <Button variant="primary"
                                                onClick={() => retrieveMovieDetails(movie.film_id)}>
                                                View Film
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
                    <Modal.Title>Movie Details</Modal.Title>
                </Modal.Header>
                {movieDetails && (
                    <Modal.Body>
                        <h2>{movieDetails.title}</h2>
                        <p><strong>Description:</strong> {movieDetails.description}</p>
                        <p><strong>Release Year:</strong> {movieDetails.release_year}</p>
                        <p><strong>Rental Rate:</strong> {movieDetails.rental_rate}</p>
                        <p><strong>Length:</strong> {movieDetails.length} minutes</p>
                    </Modal.Body>
                )}
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default TopMovies;
