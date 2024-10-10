import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from '../global_components/Navbar';

const apiUrl = process.env.REACT_APP_API_URL;

const HomePage = () => {
    const [accounts, setAccounts] = useState([]); // Para almacenar las cuentas bancarias
    const [error, setError] = useState(null);
    const [newAccountType, setNewAccountType] = useState(""); // Para almacenar el tipo de cuenta
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para manejar el modal
    const sessionData = JSON.parse(sessionStorage.getItem("SD"));
    const navigate = useNavigate();

    useEffect(() => {
        if (sessionData) {
            fetchAccounts();
        } else {
            navigate('/');
        }
    }, []);

    const fetchAccounts = async () => {
        const API_URL = `${apiUrl}/account/${sessionData.userId}`; // Endpoint para obtener las cuentas
        try {
            const response = await fetch(API_URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionData.token}`, // Autenticación con JWT
                }
            });

            if (response.ok) {
                const responseAPI = await response.json();
                setAccounts(responseAPI.data); 
            } else {
                const errorText = await response.text();
                setError(errorText);
            }
        } catch (error) {
            console.error('Error al obtener cuentas:', error);
            setError('Error de conexión al servidor.');
        }
    };

    const handleCreateAccount = async (e) => {
        e.preventDefault();
        const API_URL = `${apiUrl}/account/create`; // Endpoint para crear cuentas
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
                // Recargar cuentas después de crear una nueva
                fetchAccounts();
                setNewAccountType(""); // Limpiar el campo
                setIsModalOpen(false); // Cerrar el modal
            } else {
                const errorText = await response.text();
                setError(errorText);
            }
        } catch (error) {
            console.error('Error al crear cuenta:', error);
            setError('Error de conexión al servidor.');
        }
    };

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <h2 className="text-center mb-4">Tus Cuentas Bancarias</h2>

                {error && <div className="alert alert-danger text-center">{error}</div>}

                {accounts.length === 0 && !error ? (
                    <div className="text-center">
                        <h3>No tienes cuentas bancarias registradas.</h3>
                    </div>
                ) : (
                    <div className="row">
                        {accounts.map(account => (
                            <div className="col-md-4 mb-4" key={account.account_id}>
                                <div className="card shadow-lg border-0">
                                    <div className="card-header bg-primary text-white text-center">
                                        <h5 className="mb-0">{account.account_type}</h5>
                                    </div>
                                    <div className="card-body">
                                        <p className="card-text">Número de cuenta: <strong>{account.account_id}</strong></p>
                                        <p className="card-text">Saldo: <strong>${account.balance} MXN</strong></p>
                                        <p className="card-text">
                                            <small className="text-muted">Última actualización: {new Date(account.updated_at).toLocaleDateString()}</small>
                                        </p>
                                    </div>
                                    <div className="card-footer text-center bg-light">
                                        <button className="btn btn-outline-primary btn-sm">Ver detalles</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Botón para abrir el modal de crear cuenta */}
                <button className="btn btn-success" onClick={() => setIsModalOpen(true)}>
                    Crear Nueva Cuenta
                </button>

                {/* Modal para crear nueva cuenta */}
                {isModalOpen && (
                    <div className="modal" style={{ display: 'block', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1040 }}>
                        <div className="modal-dialog" style={{ margin: 'auto', marginTop: '100px' }}>
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Crear Nueva Cuenta Bancaria</h5>
                                    <button type="button" className="btn-close" onClick={() => setIsModalOpen(false)} aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={handleCreateAccount}>
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
                )}
            </div>
        </>
    );
};

export default HomePage;
