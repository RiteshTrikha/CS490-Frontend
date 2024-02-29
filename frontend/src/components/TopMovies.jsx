// TopMovies.jsx
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Card, CardBody, Row, Button, Modal} from 'react-bootstrap';

function TopMovies() {
    const [movies, setMovies] = useState([]);
    const [moviedetails, setMovieDetails] = useState(null);
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
        <div className="d-flex justify-content-left align-items-center pt-5">
            <div className="container">
                <div className="col-md-auto">
                    <Card className="p-4 mb-4">
                        <CardBody>
                            <h1 className="mb-4">Top 5 Rented Films</h1>
                            <Row>
                                {movies.map(movie => (
                                    <Card key={movie.film_id} className="m-2">
                                        <CardBody>
                                            <h2>{movie.title}</h2>
                                            <Button variant="primary"
                                                    onClick={() => retrieveMovieDetails(movie.film_id)}>
                                                View Film
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
                    <Modal.Title>Movie Details</Modal.Title>
                </Modal.Header>
                {moviedetails && (
                    <Modal.Body>
                        <h2>{moviedetails.title}</h2>
                        <p><strong>Description:</strong> {moviedetails.description}</p>
                        <p><strong>Release Year:</strong> {moviedetails.release_year}</p>
                        <p><strong>Rental Rate:</strong> {moviedetails.rental_rate}</p>
                        <p><strong>Length:</strong> {moviedetails.length} minutes</p>
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
