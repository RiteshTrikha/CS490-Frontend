// RentalPage.jsx

import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import axios from 'axios';

function RentalPage({ filmId }) {
    const [filmDetails, setFilmDetails] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (filmId) {
            setLoading(true);
            axios.get(`http://localhost:5000/api/movie/${filmId}`)
                .then(response => {
                    setFilmDetails(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching movie details:', error);
                    setLoading(false);
                });
        }
    }, [filmId]);

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <Card>
                    <Card.Body>
                        <Card.Title>{filmDetails.title}</Card.Title>
                        <Card.Text>
                            <strong>Description:</strong> {filmDetails.description}<br />
                            <strong>Release Year:</strong> {filmDetails.release_year}<br />
                            <strong>Rental Rate:</strong> {filmDetails.rental_rate}<br />
                            <strong>Length:</strong> {filmDetails.length} minutes
                        </Card.Text>
                    </Card.Body>
                </Card>
            )}
        </div>
    );
}

export default RentalPage;
