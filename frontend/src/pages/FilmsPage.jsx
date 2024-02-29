import React, {useState, useEffect} from 'react';
import {Button, Modal, Table, Form, Container, Card} from 'react-bootstrap';

function FilmsPage() {
    const [showModal, setShowModal] = useState(false);
    const [filmDetails, setFilmDetails] = useState(null);
    const [filmsList, setFilmsList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [tableVisible, setTableVisible] = useState(false);
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        searchFilms();
    }, [pageSize, currentPage, searchQuery]);

    const searchFilms = () => {
        fetch(`http://localhost:5000/api/search-films?query=${encodeURIComponent(searchQuery)}&limit=${pageSize}&offset=${(currentPage - 1) * pageSize}`)
            .then(response => response.json())
            .then(data => {
                setFilmsList(data.films.map(film => ({
                    ...film,
                    title: highlightMatch(film.title)
                })));
                setTableVisible(true);
                setTotalPages(Math.ceil(data.total_count / pageSize));
            })
            .catch(error => console.error('Error fetching films:', error));
    };

    const highlightMatch = (text) => {
        if (!searchQuery.trim()) return text;
        const regex = new RegExp(`(${searchQuery})`, 'gi');
        return text.replace(regex, '<span class="highlight">$1</span>');
    };

    const viewFilmDetails = (filmId) => {
        fetch(`http://localhost:5000/api/film/${filmId}`)
            .then(response => response.json())
            .then(film => {
                setFilmDetails(film);
                setShowModal(true);
            })
            .catch(error => console.error('Error fetching film details:', error));
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setFilmDetails(null);
    };

    const clearSearch = () => {
        setSearchQuery('');
        setTableVisible(false);
        setFilmsList([]);
        setCurrentPage(1); // Reset to first page when clearing search
    };

    const handleFormSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        setCurrentPage(1); // Reset to first page when performing new search
        searchFilms();
    };

    const handlePageSizeChange = (size) => {
        setPageSize(size);
        setCurrentPage(1); // Reset to first page when changing page size
    };

    const handleFirstPage = () => {
        setCurrentPage(1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleLastPage = () => {
        setCurrentPage(totalPages);
    };

    return (
        <Container className="mt-5">
            <Card>
                <Card.Body>
                    <h2 className="mb-4">Search Films</h2>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Control type="text" placeholder="Search by film name, actor, or genre"
                                          value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                        </Form.Group>
                        <Button className="me-2" variant="secondary" type="submit">Search</Button>
                        <Button variant="secondary" onClick={clearSearch}>Clear</Button>
                    </Form>

                    {tableVisible && (
                        <>
                            <Table striped bordered hover className="mt-4">
                                <thead>
                                <tr>
                                    <th>Film ID</th>
                                    <th>Title</th>
                                    <th>Genre</th>
                                    <th>Actors</th>
                                    {/* Add Actors column */}
                                    <th>View</th>
                                </tr>
                                </thead>
                                <tbody>
                                {filmsList.map(film => (
                                    <tr key={film.film_id}>
                                        <td>{film.film_id}</td>
                                        <td dangerouslySetInnerHTML={{__html: film.title}}></td>
                                        <td>{film.genre}</td>
                                        <td>{film.actors}</td>
                                        {/* Display actors for the film */}
                                        <td>
                                            <Button variant="primary"
                                                    onClick={() => viewFilmDetails(film.film_id)}>Details</Button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>


                            <div className="d-flex justify-content-between align-items-center mt-4">
                                <div>
                                    <select className="form-select"
                                            onChange={(e) => handlePageSizeChange(e.target.value)} value={pageSize}>
                                        <option value={10}>10</option>
                                        <option value={25}>25</option>
                                        <option value={50}>50</option>
                                        <option value={100}>100</option>
                                    </select>
                                </div>
                                <div>
                                    <Button
                                        className={`me-1 ${currentPage === 1 ? 'disabled' : ''}`}
                                        variant="primary"
                                        onClick={handleFirstPage}
                                        disabled={currentPage === 1}
                                    >
                                        &lt;&lt;
                                    </Button>
                                    <Button
                                        className={`me-1 ${currentPage === 1 ? 'disabled' : ''}`}
                                        variant="primary"
                                        onClick={handlePrevPage}
                                        disabled={currentPage === 1}
                                    >
                                        &lt;
                                    </Button>
                                    <span>{currentPage}/{totalPages}</span>
                                    <Button
                                        className={`ms-1 ${currentPage === totalPages ? 'disabled' : ''}`}
                                        variant="primary"
                                        onClick={handleNextPage}
                                        disabled={currentPage === totalPages}
                                    >
                                        &gt;
                                    </Button>
                                    <Button
                                        className={`ms-1 ${currentPage === totalPages ? 'disabled' : ''}`}
                                        variant="primary"
                                        onClick={handleLastPage}
                                        disabled={currentPage === totalPages}
                                    >
                                        &gt;&gt;
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}

                    <Modal show={showModal} onHide={handleCloseModal} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Film Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {filmDetails && (
                                <div>
                                    <p><strong>Title:</strong> {filmDetails.title}</p>
                                    <p><strong>Description:</strong> {filmDetails.description}</p>
                                    <p><strong>Release Year:</strong> {filmDetails.release_year}</p>
                                    <p><strong>Rental Duration:</strong> {filmDetails.rental_duration} days</p>
                                    <p><strong>Rental Rate:</strong> ${filmDetails.rental_rate}</p>
                                    <p><strong>Length:</strong> {filmDetails.length} minutes</p>
                                    {filmDetails.genre && <p><strong>Genre:</strong> {filmDetails.genre}</p>}
                                    {filmDetails.actors && <p><strong>Actors:</strong> {filmDetails.actors}</p>}
                                </div>
                            )}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default FilmsPage;
