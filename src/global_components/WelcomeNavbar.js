import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de importar Bootstrap

const WelcomeNavbar = () => {
    const navigate = useNavigate();

    const handleAccessClick = () => {
        navigate('/Auth'); // Redirigir a la ruta "/" cuando el botón "Acceso" sea presionado
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-primary text-white shadow-lg">
            <div className="container-fluid">
                <a className="navbar-brand text-white font-weight-bold" href="#">EDUA Bank</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <button
                                onClick={handleAccessClick}
                                className="btn btn-light text-primary px-4 py-2 font-weight-bold rounded-pill"
                            >
                                Acceso
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default WelcomeNavbar;
