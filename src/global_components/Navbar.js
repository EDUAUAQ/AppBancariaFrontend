import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de importar Bootstrap

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Eliminar el sessionStorage llamado 'SD'
        sessionStorage.removeItem('SD');

        // Mostrar alerta de sesión cerrada
        alert('Sesión cerrada con éxito');

        // Navegar a la página de inicio
        navigate('/Auth');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-primary text-white shadow-sm">
            <div className="container-fluid">
                <NavLink
                    to="/home"
                    className="navbar-brand text-white"
                    style={{
                        fontFamily: 'Arial', // Fuente moderna y limpia
                        fontWeight: 'bold', // Mantén el texto en negrita pero sin exagerar
                        fontSize: '2rem', // Tamaño adecuado para resaltar sin ser demasiado grande
                        letterSpacing: '0.5px' // Ligero espaciado entre letras para claridad
                    }}
                >
                    EDUA Bank
                </NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <button
                                onClick={handleLogout}
                                className="btn btn-light text-primary px-4 py-2 font-weight-bold rounded-pill"
                            >
                                Cerrar Sesión
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
