import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    const handleLogoutClick = () => {
        localStorage.removeItem('accessToken'); 
        window.location.href = '/';
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">News Report</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/news">News</Link>
                        </li>
                    </ul>
                    <button className="btn btn-outline-light" onClick={handleLogoutClick}>Logout</button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
