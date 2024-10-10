import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
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
                <NavLink 
                to="/logout" 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Cerrar Sesión
                </NavLink>
            </div>
            </div>
        </div>
        </nav>
);
};

export default Navbar;

