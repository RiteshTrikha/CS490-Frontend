import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Modal } from 'react-bootstrap';

function TopMovies({ storeId }) {
    const [movies, setMovies] = useState([]);
    const [moviedetails, setMovieDetails] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        let url = 'http://localhost:5000/api/top-movies';
        if (storeId) {
            url = `http://localhost:5000/api/store/${storeId}/top-movies`;
        }

        axios.get(url)
            .then(response => {
                setMovies(response.data);
            })
            .catch(error => {
                console.error('Error fetching top movies:', error);
            });
    }, [storeId]);

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

    const calculateFontSize = (title) => {
        return title.length > 10 ? 'h5' : 'h4';
    };

    return (
        <div className="pt-5">
            <div className="container">
                <Card className="p-4 mb-4">
                    <Card.Body>
                        <h2 className="mb-4">Top 5 Movies {storeId ? `- Store ${storeId}` : ''}</h2>
                        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
                            {movies.map(movie => (
                                <div key={movie.film_id} className="col">
                                    <Card className="h-100">
                                        <Card.Body>
                                            <h4 className={`card-title ${calculateFontSize(movie.title)}`} style={{ whiteSpace: 'normal' }}>
                                                {movie.title}
                                            </h4>
                                            <Button variant="primary" onClick={() => retrieveMovieDetails(movie.film_id)}>
                                                View Film
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </Card.Body>
                </Card>
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
