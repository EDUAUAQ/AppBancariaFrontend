import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from '../global_components/Navbar';
import CreateAccountModal from './modals/CreateAccountModal';
import TransferModal from './modals/TransferModal'; // Importar el nuevo modal de transferencias

const apiUrl = process.env.REACT_APP_API_URL;

const HomePage = () => {
    const [accounts, setAccounts] = useState([]);
    const [error, setError] = useState(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isTransferModalOpen, setIsTransferModalOpen] = useState(false); // Estado para manejar el modal de transferencias
    const [successMessage, setSuccessMessage] = useState("");
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
        const API_URL = `${apiUrl}/account/${sessionData.userId}`;
        try {
            const response = await fetch(API_URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionData.token}`,
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
                fetchAccounts();
                setIsCreateModalOpen(false);
            } else {
                const errorText = await response.text();
                setError(errorText);
            }
        } catch (error) {
            console.error('Error al crear cuenta:', error);
            setError('Error de conexión al servidor.');
        }
    };
    

    const handleTransferSuccess = () => {
        setSuccessMessage("La transferencia se realizó exitosamente.");
        setTimeout(() => {
            setSuccessMessage(""); // Limpiar el mensaje después de 5 segundos
        }, 5000);
    };

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <h2 className="text-center mb-4">Tus Cuentas Bancarias</h2>

                {error && <div className="alert alert-danger text-center">{error}</div>}
                {successMessage && ( // Alert de éxito centrada
                    <div className="alert alert-success text-center" style={successAlertStyle}>
                        {successMessage}
                    </div>
                )}
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
                <button className="btn btn-success me-3" onClick={() => setIsCreateModalOpen(true)}>
                    Crear Nueva Cuenta
                </button>

                {/* Botón para abrir el modal de transferencia */}
                <button className="btn btn-primary" onClick={() => setIsTransferModalOpen(true)}>
                    Realizar Transferencia
                </button>

                {/* Modal para crear nueva cuenta */}
                <CreateAccountModal 
                    isOpen={isCreateModalOpen} 
                    onClose={() => setIsCreateModalOpen(false)} 
                    handleCreateAccount={handleCreateAccount} 
                />

                {/* Modal para realizar transferencia */}
                <TransferModal 
                    isOpen={isTransferModalOpen} 
                    onClose={() => setIsTransferModalOpen(false)} 
                    onTransferSuccess={handleTransferSuccess} // Llama a esta función al completar la transferencia
                />
            </div>
        </>
    );
};

const successAlertStyle = {
    position: 'fixed',
    top: '10%', // Ajusta según sea necesario
    left: '50%',
    transform: 'translate(-50%, 0)',
    zIndex: 1050,
    width: '300px', // Ajustar según sea necesario
    margin: '0 auto', // Centra el alert
};

export default HomePage;
