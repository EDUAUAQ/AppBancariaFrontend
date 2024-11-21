import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from '../global_components/Navbar';
import Footer from '../global_components/Footer';
import CreateAccountModal from './modals/CreateAccountModal';
import TransferModal from './modals/TransferModal';
import AccountDetailsModal from './modals/AccountDetailsModal'; // Importar el modal de detalles
import WithdrawModal from './modals/WithdrawModal'; // Importar el nuevo modal de retiro

const apiUrl = process.env.REACT_APP_API_URL;

const HomePage = () => {

    const [accounts, setAccounts] = useState([]);
    const [error, setError] = useState(null);

    //Modals
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
    const [isAccountDetailsModalOpen, setIsAccountDetailsModalOpen] = useState(false); 
    const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false); 

    
    const [selectedAccountId, setSelectedAccountId] = useState(null); // ID de la cuenta seleccionada
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

    const handleViewDetails = (accountId) => {
        setSelectedAccountId(accountId);
        setIsAccountDetailsModalOpen(true);
    };

    const handleWithdraw = (accountId) => {
        setSelectedAccountId(accountId);
        setIsWithdrawModalOpen(true);
    };

    const handleAccountError = (accountError) => {
        setError(accountError);
    };

    const handleTransferSuccess = () => {
        setSuccessMessage("La transferencia se realizó exitosamente.");
        fetchAccounts();
        setTimeout(() => {
            setSuccessMessage("");
        }, 5000);
    };

    const handleAccountCreateSuccess = () => {
        setSuccessMessage("La cuenta se creó exitosamente.");
        fetchAccounts();
        setTimeout(() => {
            setSuccessMessage("");
        }, 5000);
    };

    const handleWithdrawSuccess = () => {
        setSuccessMessage("El retiro se realizó exitosamente.");
        fetchAccounts();
        setTimeout(() => {
            setSuccessMessage("");
        }, 5000);
    };

    return (
        <>
            <Navbar />
            <div className="d-flex flex-column min-vh-100">
                <div className="container mt-5 mb-4 flex-fill">
                    <div className="row mb-4">
                        <div className="col-12 text-center">
                            <h2 className="display-4">Bienvenido, {sessionData?.userName}</h2>
                            <p className="lead text-muted">Consulta y gestiona tus cuentas bancarias de forma rápida y segura</p>
                        </div>
                    </div>

                    {/* Aquí movemos los botones de Crear Nueva Cuenta y Realizar Transferencia */}
                    <div className="d-flex justify-content-center gap-3 mb-4">
                        <button className="btn btn-success btn-lg" onClick={() => setIsCreateModalOpen(true)}>
                            Crear Nueva Cuenta
                        </button>

                        <button className="btn btn-primary btn-lg" onClick={() => setIsTransferModalOpen(true)}>
                            Realizar Transferencia
                        </button>
                    </div>

                    {error && <div className="alert alert-danger text-center">{error}</div>}
                    {successMessage && (
                        <div className="alert alert-success text-center" style={successAlertStyle}>
                            {successMessage}
                        </div>
                    )}
                    {accounts.length === 0 && !error ? (
                        <div className="text-center">
                            <h3>No tienes cuentas bancarias registradas.</h3>
                            <p>Haz clic en el botón de abajo para crear tu primera cuenta.</p>
                        </div>
                    ) : (
                        <div className="row mb-4">
                            {accounts.map(account => (
                                <div className="col-md-4 mb-4" key={account.account_id}>
                                    <div className="card shadow-lg border-0 rounded">
                                        <div className="card-header bg-primary text-white text-center">
                                            <h5 className="mb-0">{account.account_type}</h5>
                                        </div>
                                        <div className="card-body">
                                            <p className="card-text">Número de cuenta: <strong>{account.account_id}</strong></p>
                                            <p className="card-text">Saldo:   
                                                <strong style={{ color: account.balance >= 0 ? 'green' : 'red' }}>
                                                    {new Intl.NumberFormat('es-MX', {
                                                        style: 'currency',
                                                        currency: 'MXN',
                                                        minimumFractionDigits: 2,  // Asegura que siempre haya 2 decimales
                                                        maximumFractionDigits: 2,  // Limita a 2 decimales
                                                    }).format(account.balance)}
                                                </strong>
                                            </p>
                                            <p className="card-text">
                                                <small className="text-muted">Última actualización: {new Date(account.updated_at).toLocaleDateString()}</small>
                                            </p>
                                        </div>
                                        <div className="card-footer text-center bg-light">
                                            <button className="btn btn-outline-primary btn-sm" onClick={() => handleViewDetails(account.account_id)}>Ver detalles</button>
                                            <button className="btn btn-outline-danger btn-sm ms-1" onClick={() => handleWithdraw(account.account_id)}>Retirar</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <CreateAccountModal 
                        isOpen={isCreateModalOpen} 
                        onClose={() => setIsCreateModalOpen(false)} 
                        handleAccountError={handleAccountError} 
                        handleAccountCreateSuccess={handleAccountCreateSuccess}
                    />

                    <TransferModal 
                        isOpen={isTransferModalOpen} 
                        onClose={() => setIsTransferModalOpen(false)} 
                        onTransferSuccess={handleTransferSuccess}
                    />

                    <AccountDetailsModal 
                        isOpen={isAccountDetailsModalOpen} 
                        onClose={() => setIsAccountDetailsModalOpen(false)} 
                        accountId={selectedAccountId} // Pasar el ID de la cuenta seleccionada
                    />

                    <WithdrawModal 
                        isOpen={isWithdrawModalOpen} 
                        onClose={() => setIsWithdrawModalOpen(false)} 
                        accountId={selectedAccountId}
                        handleWithdrawSuccess = {handleWithdrawSuccess}
                    />
                </div>

                {/* Aquí está el footer */}
                <Footer />
            </div>
        </>
    );
};

const successAlertStyle = {
    position: 'fixed',
    top: '10%',
    left: '50%',
    transform: 'translate(-50%, 0)',
    zIndex: 1050,
    width: '300px',
    margin: '0 auto',
};

export default HomePage;
