import React from 'react';
import PropTypes from 'prop-types';

const DescriptionModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal" style={{
            display: 'block', position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.6)', zIndex: '1050', overflow: 'auto'
        }}>
            <div className="modal-dialog" style={{
                maxWidth: '700px', margin: '10% auto', borderRadius: '10px', overflow: 'hidden'
            }}>
                <div className="modal-content" style={{ borderRadius: '10px', backgroundColor: '#fff' }}>
                    <div className="modal-header" style={{
                        borderBottom: '1px solid #dee2e6', padding: '1.5rem', textAlign: 'center',
                        backgroundColor: '#003366', color: '#fff'
                    }}>
                        <h5 className="modal-title" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Descripción de EDUA Bank</h5>
                    </div>
                    <div className="modal-body" style={{ padding: '2rem', color: '#555' }}>
                        <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                            En EDUA Bank, nos dedicamos a brindarte servicios bancarios de alta calidad, accesibles desde cualquier lugar.
                            Nuestro objetivo es ofrecerte una experiencia fácil, segura y rápida. Con nosotros, puedes gestionar tus cuentas,
                            realizar transferencias al instante y mantener tus finanzas al alcance de tu mano.
                        </p>
                        <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                            Con tecnologías avanzadas en seguridad, puedes estar tranquilo sabiendo que tu dinero y tus datos están protegidos.
                            Además, nuestra plataforma está disponible en cualquier dispositivo, para que puedas acceder a tus servicios en cualquier momento.
                        </p>
                    </div>
                    <div className="modal-footer" style={{ borderTop: '1px solid #dee2e6', padding: '1.5rem', textAlign: 'center' }}>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onClose}
                            style={{
                                padding: '0.6rem 1.8rem', fontSize: '1rem', borderRadius: '5px',
                                backgroundColor: '#003366', color: '#fff', border: 'none', fontWeight: 'bold'
                            }}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

DescriptionModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default DescriptionModal;
