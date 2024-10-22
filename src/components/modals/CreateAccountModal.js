import React, { useState } from 'react';

const apiUrl = process.env.REACT_APP_API_URL;

const CreateAccountModal = ({ isOpen, onClose, handleAccountError, handleAccountCreateSuccess}) => {
    const [newAccountType, setNewAccountType] = useState("");
    const [error, setError] = useState(null);
    const sessionData = JSON.parse(sessionStorage.getItem("SD"));

    const handleCreateAccount = async (newAccountType) => {
        const API_URL = `${apiUrl}/account/create`;
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionData.token}`,
                },
                body: JSON.stringify({ account_type: newAccountType, user_id: sessionData.userId, balance: 0 }),
            });

            if (response.ok) {
                handleAccountCreateSuccess()
                onClose()
            } else {
                const errorText = await response.text();
                handleAccountError(errorText)
                onClose()
            }
        } catch (error) {
            console.error('Error al crear cuenta:', error);
            setError('Error de conexión al servidor.');
        }
    };

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
                            {error && <div className="alert alert-danger text-center">{error}</div>}
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
