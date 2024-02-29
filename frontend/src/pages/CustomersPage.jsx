import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardBody, Row, Button, Modal } from 'react-bootstrap';

function CustomersPage() {
    const [customers, setCustomers] = useState([]);
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [customerDetails, setCustomerDetails] = useState(null);

    useEffect(() => {
        fetchCustomers();
    }, [pageSize, currentPage]); // Fetch customers when pageSize or currentPage changes

    const fetchCustomers = () => {
        const offset = (currentPage - 1) * pageSize;
        axios.get(`http://localhost:5000/api/customers?limit=${pageSize}&offset=${offset}`)
            .then(response => {
                const { customers, totalPages } = response.data;
                setCustomers(customers);
                setTotalPages(totalPages);
            })
            .catch(error => {
                console.error('Error fetching customers:', error);
            });
    };

    const handlePageSizeChange = (size) => {
        setPageSize(size);
        setCurrentPage(1); // Reset to the first page when changing page size
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

    const handleCloseModal = () => {
        setShowModal(false);
        setCustomerDetails(null);
    };

    const viewCustomerDetails = (customer) => {
        setCustomerDetails(customer);
        setShowModal(true);
    };

    return (
        <div className="d-flex justify-content-left align-items-center pt-5">
            <div className="container">
                <div className="col-md-auto">
                    <Card className="p-4 mb-4">
                        <CardBody>
                            <h1 className="mb-4">Customers</h1>
                            <Row>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Email</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {customers.map(customer => (
                                            <tr key={customer.customer_id}>
                                                <td>{customer.customer_id}</td>
                                                <td>{customer.first_name}</td>
                                                <td>{customer.last_name}</td>
                                                <td>{customer.email}</td>
                                                <td>
                                                    <Button variant="primary" onClick={() => viewCustomerDetails(customer)}>
                                                        View
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </Row>
                            <div className="d-flex justify-content-between align-items-center mt-4">
                                <div>
                                    <select className="form-select" onChange={(e) => handlePageSizeChange(e.target.value)} value={pageSize}>
                                        <option value={10}>10</option>
                                        <option value={25}>25</option>
                                        <option value={50}>50</option>
                                        <option value={100}>100</option>
                                    </select>
                                </div>
                                <div>
                                    <button
                                        className={`btn ${currentPage === 1 ? 'btn-outline-primary' : 'btn-primary'}`}
                                        onClick={handleFirstPage} disabled={currentPage === 1}>&lt;&lt;</button>
                                    <button
                                        className={`btn ${currentPage === 1 ? 'btn-outline-primary' : 'btn-primary'}`}
                                        onClick={handlePrevPage} disabled={currentPage === 1}>&lt;</button>
                                    <span>{currentPage}/{totalPages}</span>
                                    <button
                                        className={`btn ${currentPage === totalPages ? 'btn-outline-primary' : 'btn-primary'}`}
                                        onClick={handleNextPage} disabled={currentPage === totalPages}>&gt;</button>
                                    <button
                                        className={`btn ${currentPage === totalPages ? 'btn-outline-primary' : 'btn-primary'}`}
                                        onClick={handleLastPage} disabled={currentPage === totalPages}>&gt;&gt;</button>
                                </div>

                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Customer Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {customerDetails && (
                        <>
                            <h2>{customerDetails.first_name} {customerDetails.last_name}</h2>
                            <p><strong>Email:</strong> {customerDetails.email}</p>
                            <p><strong>Address:</strong> {customerDetails.address}</p>
                            <p><strong>Postal Code:</strong> {customerDetails.postal_code}</p>
                            <p><strong>District:</strong> {customerDetails.district}</p>
                            <p><strong>City:</strong> {customerDetails.city}</p>
                            <p><strong>Country:</strong> {customerDetails.country}</p>
                            {/* Add more details here if needed */}
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default CustomersPage;
