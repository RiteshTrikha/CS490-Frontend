import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import MovieDetailsModal from '../components/MovieDetailsModal';

function TopMoviesPage({ storeId }) {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

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

    const handleMovieSelect = (movie) => {
        setSelectedMovie(movie);
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
                                            <h4 className={`card-title ${movie.title.length > 10 ? 'h5' : 'h4'}`}>
                                                {movie.title}
                                            </h4>
                                            <p>Rentals: {movie.rentals}</p>
                                            <Button variant="primary" onClick={() => handleMovieSelect(movie)}>
                                                View Film
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </Card.Body>
                </Card>
                <MovieDetailsModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
            </div>
        </div>
    );
}

export default TopMoviesPage;
