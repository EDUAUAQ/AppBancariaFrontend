import React, { useState, useEffect } from 'react';

const TransferModal = ({ isOpen, onClose, onTransferSuccess }) => {
    const [fromAccountId, setFromAccountId] = useState("");
    const [toAccountId, setToAccountId] = useState("");
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [accounts, setAccounts] = useState([]);
    const [error, setError] = useState(null);
    const sessionData = JSON.parse(sessionStorage.getItem("SD"));

    useEffect(() => {
        if (isOpen) {
            fetchAccounts();
        }
    }, [isOpen]);

    const fetchAccounts = async () => {
        const API_URL = `${process.env.REACT_APP_API_URL}/account/${sessionData.userId}`;
        try {
            const response = await fetch(API_URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionData.token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setAccounts(data.data);
            } else {
                const errorText = await response.text();
                setError(errorText);
            }
        } catch (error) {
            console.error('Error al obtener cuentas:', error);
            setError('Error de conexión al servidor.');
        }
    };

    const handleTransfer = async (fromAccountId, toAccountId, amount, description) => {
        const API_URL = `${process.env.REACT_APP_API_URL}/transfer/create`;
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionData.token}`,
                },
                body: JSON.stringify({ from_account_id: fromAccountId, to_account_id: toAccountId, amount, description }),
            });

            if (response.ok) {
                fetchAccounts(); // Recargar las cuentas después de la transferencia
                onTransferSuccess(); // Llamar a la función de éxito desde el componente padre
                onClose(); // Cerrar el modal
            } else {
                const errorText = await response.text();
                setError(errorText);
            }
        } catch (error) {
            console.error('Error al realizar la transferencia:', error);
            setError('Error de conexión al servidor.');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleTransfer(fromAccountId, toAccountId, amount, description);
        setFromAccountId("");
        setToAccountId("");
        setAmount("");
        setDescription("");
        setError(null); // Limpiar el error
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal" style={{ display: 'block', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1040 }}>
            <div className="modal-dialog" style={{ margin: 'auto', marginTop: '100px' }}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Realizar Transferencia Bancaria</h5>
                        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {error && <div className="alert alert-danger">{error}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="fromAccountId" className="form-label">Cuenta Remitente</label>
                                <select 
                                    className="form-select" 
                                    id="fromAccountId" 
                                    value={fromAccountId} 
                                    onChange={(e) => setFromAccountId(e.target.value)} 
                                    required
                                >
                                    <option value="">Selecciona una cuenta</option>
                                    {accounts.map((account) => (
                                        <option key={account.account_id} value={account.account_id}>
                                            {account.account_type} - {account.account_id} (Saldo: ${account.balance})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="toAccountId" className="form-label">Cuenta Destinataria</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="toAccountId" 
                                    value={toAccountId} 
                                    onChange={(e) => setToAccountId(e.target.value)} 
                                    required 
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="amount" className="form-label">Monto</label>
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    id="amount" 
                                    value={amount} 
                                    onChange={(e) => setAmount(e.target.value)} 
                                    required 
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Descripción</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="description" 
                                    value={description} 
                                    onChange={(e) => setDescription(e.target.value)} 
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Realizar Transferencia</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransferModal;
