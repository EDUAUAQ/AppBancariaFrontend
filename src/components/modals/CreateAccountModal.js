import React, { useState } from 'react';

const CreateAccountModal = ({ isOpen, onClose, handleCreateAccount }) => {
    const [newAccountType, setNewAccountType] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        handleCreateAccount(newAccountType);
        setNewAccountType(""); // Limpiar el campo después de enviar el formulario
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal" style={{ display: 'block', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1040 }}>
            <div className="modal-dialog" style={{ margin: 'auto', marginTop: '100px' }}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Crear Nueva Cuenta Bancaria</h5>
                        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="accountType" className="form-label">Tipo de Cuenta</label>
                                <select 
                                    className="form-select" 
                                    id="accountType" 
                                    value={newAccountType} 
                                    onChange={(e) => setNewAccountType(e.target.value)} 
                                    required 
                                >
                                    <option value="">Seleccione un tipo de cuenta</option>
                                    <option value="Crédito">Crédito</option>
                                    <option value="Débito">Débito</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary">Crear Cuenta</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateAccountModal;
