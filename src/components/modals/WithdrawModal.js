import React, { useEffect, useState } from 'react';

const apiUrl = process.env.REACT_APP_API_URL;

const WithdrawModal = ({ isOpen, onClose, handleWithdrawSuccess, accountId }) => {
    const [withdrawAmount, setWithdrawAmount] = useState("");
    const [error, setError] = useState(null);
    const sessionData = JSON.parse(sessionStorage.getItem("SD"));

    useEffect(() => {
        if (isOpen) {
            setError(null);  // Limpiar error cuando se abre el modal
        }
    }, [isOpen]);

    
    const handleWithdraw = async (withdrawAmount) => {
        const API_URL = `${apiUrl}/transaction/create`;  // Suponiendo que el endpoint es '/transaction'
        const account_id = accountId;  // Supongamos que el account_id está en sessionStorage
        const transaction_type = "Retiro";  // Tipo de transacción
        const description = "Retiro de fondos";  // Descripción del retiro
    
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionData.token}`,
                },
                body: JSON.stringify({
                    account_id, 
                    transaction_type, 
                    amount: withdrawAmount, 
                    description
                }),
            });
    
            const responseData = await response.json();  // Convertir la respuesta en formato JSON
    
            if (response.ok) {
                // Transacción exitosa
                handleWithdrawSuccess(responseData.message);
                onClose();
            } else {
                console.error('Error al realizar el retiro:', error);
                setError('Error al realizar el retiro');
            }
        } catch (error) {
            console.error('Error al realizar el retiro:', error);
            setError('Error de conexión al servidor.');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleWithdraw(withdrawAmount);
        setWithdrawAmount(""); // Limpiar el campo después de enviar el formulario
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal" style={{ display: 'block', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1040 }}>
            <div className="modal-dialog" style={{ margin: 'auto', marginTop: '100px' }}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Realizar Retiro</h5>
                        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            {error && <div className="alert alert-danger text-center">{error}</div>}
                            <div className="mb-3">
                                <label htmlFor="withdrawAmount" className="form-label">Monto a Retirar</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="withdrawAmount"
                                    value={withdrawAmount}
                                    onChange={(e) => setWithdrawAmount(e.target.value)}
                                    min="0"
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Retirar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WithdrawModal;
