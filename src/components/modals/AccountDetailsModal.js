import React, { useState, useEffect } from 'react';

const AccountDetailsModal = ({ isOpen, onClose, accountId }) => {
    const [transactions, setTransactions] = useState([]);
    const [transfers, setTransfers] = useState([]);
    const [error, setError] = useState(null);
    const sessionData = JSON.parse(sessionStorage.getItem("SD"));

    useEffect(() => {
        if (isOpen) {
            // Reset states when opening the modal
            setTransactions([]);
            setTransfers([]);
            setError(null); // Reset error state

            fetchTransactions();
            fetchTransfers();
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
                                                <td>${transaction.amount}</td>
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
                                                <td>${transfer.amount}</td>
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

export default AccountDetailsModal;
