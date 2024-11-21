import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WelcomeNavbar from '../global_components/WelcomeNavbar';
import Footer from '../global_components/Footer';
import CookiesModal from './modals/CookiesModal'; // Importamos el modal

const WelcomePage = () => {
    const [isCookiesModalOpen, setIsCookiesModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Verificar si el usuario ya ha aceptado las cookies
        const cookiesAccepted = sessionStorage.getItem('cookiesAccepted');
        if (!cookiesAccepted) {
        setIsCookiesModalOpen(true); // Abrir el modal si las cookies no han sido aceptadas
        }
    }, []);

    const handleAcceptCookies = () => {
        // Guardar la aceptación de cookies en localStorage
        sessionStorage.setItem('cookiesAccepted', 'true');
        setIsCookiesModalOpen(false); // Cerrar el modal
    };

    const handleAccessClick = () => {
        navigate('/Auth');
    };

    const handleJoinClick = () => {
        navigate('/Auth');
    };

    return (
        <>
        <WelcomeNavbar />
        <div className="container-fluid p-0">
            {/* Sección principal con texto de bienvenida */}
            <div className="row bg-light py-5 px-4 px-md-5" style={{ backgroundColor: '#f7f7f7' }}>
            <div className="col-12 text-center">
                <h1 className="display-3 font-weight-bold text-dark mb-4" style={{ fontSize: '2.5rem', lineHeight: '1.2' }}>
                Bienvenido a EDUA Bank
                </h1>
                <p className="lead mb-4" style={{ fontSize: '1.25rem', color: '#555' }}>
                Tu banco al alcance de tu mano, gestionando tus cuentas de manera fácil, rápida y segura.
                </p>
                <p style={{ fontSize: '1.1rem', color: '#777', maxWidth: '900px', margin: '0 auto' }}>
                Accede a tus cuentas en cualquier momento, realiza transferencias al instante y disfruta de una plataforma totalmente segura y confiable.
                </p>
                <button className="btn btn-primary btn-lg mt-4 px-5 py-3 font-weight-bold rounded-pill">
                Conoce más
                </button>
            </div>
            </div>

            {/* Sección de características */}
            <div className="row py-5 text-center" style={{ backgroundColor: '#e9ecef' }}>
            <div className="col-md-4 mb-4 d-flex justify-content-center">
                <div className="card shadow-lg border-light rounded-lg" style={{ minHeight: '250px', maxWidth: '320px', margin: '0 15px' }}>
                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                    <h3 className="card-title font-weight-bold text-primary mb-3">Accesibilidad</h3>
                    <p className="card-text" style={{ color: '#555' }}>Consulta tu saldo y movimientos en cualquier lugar, de manera rápida y sencilla.</p>
                </div>
                </div>
            </div>
            <div className="col-md-4 mb-4 d-flex justify-content-center">
                <div className="card shadow-lg border-light rounded-lg" style={{ minHeight: '250px', maxWidth: '320px', margin: '0 15px' }}>
                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                    <h3 className="card-title font-weight-bold text-primary mb-3">Seguridad</h3>
                    <p className="card-text" style={{ color: '#555' }}>Protección avanzada en cada transacción, mantén tus datos seguros con tecnología de última generación.</p>
                </div>
                </div>
            </div>
            <div className="col-md-4 mb-4 d-flex justify-content-center">
                <div className="card shadow-lg border-light rounded-lg" style={{ minHeight: '250px', maxWidth: '320px', margin: '0 15px' }}>
                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                    <h3 className="card-title font-weight-bold text-primary mb-3">Transferencias Rápidas</h3>
                    <p className="card-text" style={{ color: '#555' }}>Realiza transferencias instantáneas entre cuentas sin complicaciones, de forma fácil y segura.</p>
                </div>
                </div>
            </div>
            </div>

            {/* Sección de llamada a la acción */}
            <div className="row py-5 text-center" style={{ backgroundColor: '#003366', color: 'white' }}>
            <div className="col-12">
                <h2 className="display-4 font-weight-bold mb-3">Haz crecer tu dinero con EDUA Bank</h2>
                <p className="lead mb-4" style={{ fontSize: '1.2rem' }}>
                Disfruta de los beneficios de una plataforma bancaria moderna, segura y 100% digital.
                </p>
                <button
                onClick={handleJoinClick}
                className="btn btn-light btn-lg px-5 py-3 font-weight-bold rounded-pill"
                >
                Únete ahora
                </button>
            </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>

        {/* Modal de Cookies */}
        <CookiesModal isOpen={isCookiesModalOpen} onClose={handleAcceptCookies} />
        </>
    );
};

export default WelcomePage;
