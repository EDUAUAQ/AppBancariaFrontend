import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Eliminar el sessionStorage llamado 'SD'
        sessionStorage.removeItem('SD');

        // Mostrar alerta de sesión cerrada
        alert('Sesión cerrada con éxito');

        // Navegar a la página de inicio
        navigate('/');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <NavLink 
                    to="/home" 
                    className={"navbar-brand"}>
                    EDUA
                </NavLink>
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNavAltMarkup" 
                    aria-controls="navbarNavAltMarkup" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav ms-auto">
                        <NavLink 
                            to="/account" 
                            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                            Cuenta
                        </NavLink>
                        <button 
                            onClick={handleLogout} 
                            className="nav-link btn" 
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}>
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
