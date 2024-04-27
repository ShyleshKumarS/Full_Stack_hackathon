import React from 'react';
import { Route, Router } from 'react-router-dom';

function Navbar() {
    const handleLoginClick = () => {
        // Redirect to the login page
        window.location.href = '/login';
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <a className="navbar-brand" href="#">News report</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">News</a>
                        </li>
                    </ul>
                    <button className="btn btn-outline-light" type="button" onClick={handleLoginClick}>Login</button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
