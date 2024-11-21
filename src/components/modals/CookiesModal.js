import React from 'react';

const CookiesModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" aria-labelledby="cookiesModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="cookiesModalLabel">Uso de Cookies</h5>
            </div>
            <div className="modal-body">
                <p>Este sitio web utiliza cookies para mejorar la experiencia del usuario. Al continuar navegando, aceptas su uso.</p>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={onClose}>Aceptar</button>
            </div>
            </div>
        </div>
        </div>
    );
};

export default CookiesModal;
