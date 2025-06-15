import React from 'react';
import { Link } from 'react-router-dom';
import { GiBanknote } from 'react-icons/gi';

export default function Header() {
    return (
        <header>
            <div className="container">
                <nav className="navbar navbar-expand-md navbar-light bg-light">
                    <Link to="/" className="navbar-brand text-dark d-flex align-items-center mx-2">
                        <GiBanknote className="display-4" />
                        <span className="fw-bold">Fakturační App</span>
                    </Link>

                    {/* Toggler for small screens */}
                    <button
                        className="navbar-toggler mx-2"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Collapsible nav links */}
                    <div className="collapse navbar-collapse justify-content-end mx-2" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/persons" className="nav-link">Osoby</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/persons/statistics" className="nav-link">Statistiky osob</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/invoices" className="nav-link">Faktury</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/invoices/statistics" className="nav-link">Statistiky faktur</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
    );
}
