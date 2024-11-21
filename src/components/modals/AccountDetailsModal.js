import React, { useState, useEffect } from 'react';

const AccountDetailsModal = ({ isOpen, onClose, accountId }) => {
    const [transactions, setTransactions] = useState([]);
    const [transfers, setTransfers] = useState([]);
    const [accountDetails, setAccountDetails] = useState(null); // Nuevo estado para los detalles de la cuenta
    const [error, setError] = useState(null);
    const sessionData = JSON.parse(sessionStorage.getItem("SD"));

    useEffect(() => {
        if (isOpen) {
            // Reset states when opening the modal
            setTransactions([]);
            setTransfers([]);
            setAccountDetails(null); // Reset account details
            setError(null); // Reset error state

            fetchTransactions();
            fetchTransfers();
            fetchAccountDetails();
        }
    }, [isOpen, accountId]);

    const fetchTransactions = async () => {
        const API_URL = `${process.env.REACT_APP_API_URL}/transaction/${accountId}`;
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
                setTransactions(data.data);
                setError(null); // Reset error if the fetch is successful
            } else {
                const errorText = await response.text();
                setError(errorText);
            }
        } catch (error) {
            console.error('Error al obtener transacciones:', error);
            setError('Error de conexión al servidor.');
        }
    };

    const fetchTransfers = async () => {
        const API_URL = `${process.env.REACT_APP_API_URL}/transfer/${accountId}`;
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
                setTransfers(data.data);
                setError(null); // Reset error if the fetch is successful
            } else {
                const errorText = await response.text();
                setError(errorText);
            }
        } catch (error) {
            console.error('Error al obtener transferencias:', error);
            setError('Error de conexión al servidor.');
        }
    };

    // Nueva función para obtener los detalles de la cuenta
    const fetchAccountDetails = async () => {
        const API_URL = `${process.env.REACT_APP_API_URL}/account/details/${accountId}`;
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
                setAccountDetails(data.data); // Guardamos los detalles de la cuenta
                setError(null); // Reset error if the fetch is successful
            } else {
                const errorText = await response.text();
                setError(errorText);
            }
        } catch (error) {
            console.error('Error al obtener detalles de la cuenta:', error);
            setError('Error de conexión al servidor.');
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal" style={{ display: 'block', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1040 }}>
            <div className="modal-dialog modal-lg" style={{ margin: 'auto', marginTop: '100px' }}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Detalles de la Cuenta</h5>
                        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {error && <div className="alert alert-danger">{error}</div>}

                        {/* Mostrar los detalles de la cuenta como tarjeta bancaria */}
                        {accountDetails && (
                            <div className="bank-card mb-4" style={cardStyle}>
                                <div className="card-content">
                                    <div className="card-number">
                                        <h4 className="text-white">**** **** **** {accountDetails.account_id.toString().slice(-4)}</h4>
                                    </div>
                                    <div className="card-details">
                                        <p className="text-white"><strong>Saldo: </strong> 
                                                {new Intl.NumberFormat('es-MX', {
                                                    style: 'currency',
                                                    currency: 'MXN',
                                                    minimumFractionDigits: 2,  // Asegura que siempre haya 2 decimales
                                                    maximumFractionDigits: 2,  // Limita a 2 decimales
                                                }).format(accountDetails.balance)}
                                                </p>
                                        <p className="text-white"><strong>Tipo: </strong> {accountDetails.account_type}</p>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <p className="text-white"><strong>Creada el: </strong>{new Date(accountDetails.created_at).toLocaleDateString()}</p>
                                    <p className="text-white"><strong>Válida hasta: </strong> {new Date(accountDetails.updated_at).toLocaleDateString()}</p>
                                </div>
                            </div>
                        )}

                        <h6>Transacciones</h6>
                        <div className="table-responsive mb-3">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Tipo</th>
                                        <th>Monto</th>
                                        <th>Descripción</th>
                                        <th>Fecha</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="text-center">No hay transacciones disponibles.</td>
                                        </tr>
                                    ) : (
                                        transactions.map(transaction => (
                                            <tr key={transaction.transaction_id}>
                                                <td>{transaction.transaction_id}</td>
                                                <td>{transaction.transaction_type}</td>
                                                <td>{new Intl.NumberFormat('es-MX', {
                                                    style: 'currency',
                                                    currency: 'MXN',
                                                    minimumFractionDigits: 2,  // Asegura que siempre haya 2 decimales
                                                    maximumFractionDigits: 2,  // Limita a 2 decimales
                                                }).format(transaction.amount)}</td>
                                                <td>{transaction.description}</td>
                                                <td>{new Date(transaction.transaction_date).toLocaleDateString()}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <h6>Transferencias</h6>
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Cuenta Remitente</th>
                                        <th>Cuenta Destinataria</th>
                                        <th>Monto</th>
                                        <th>Fecha</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transfers.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="text-center">No hay transferencias disponibles.</td>
                                        </tr>
                                    ) : (
                                        transfers.map(transfer => (
                                            <tr key={transfer.transfer_id}>
                                                <td>{transfer.transfer_id}</td>
                                                <td>{transfer.from_account_id}</td>
                                                <td>{transfer.to_account_id}</td>
                                                <td>{new Intl.NumberFormat('es-MX', {
                                                    style: 'currency',
                                                    currency: 'MXN',
                                                    minimumFractionDigits: 2,  // Asegura que siempre haya 2 decimales
                                                    maximumFractionDigits: 2,  // Limita a 2 decimales
                                                }).format(transfer.amount)}</td>
                                                <td>{new Date(transfer.transfer_date).toLocaleDateString()}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Estilos en línea para simular una tarjeta bancaria
const cardStyle = {
    background: 'linear-gradient(to right, #0066cc, #3399ff)',
    padding: '20px',
    borderRadius: '10px',
    color: 'white',
    width: '100%',
    maxWidth: '400px',
    margin: '0 auto',
    boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
};

export default AccountDetailsModal;
