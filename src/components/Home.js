import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";


const HomePage = () => {
    const [accounts, setAccounts] = useState([]); // Para almacenar las cuentas bancarias
    const [error, setError] = useState(null);
    const sessionData = JSON.parse(sessionStorage.getItem("SD"));
    const navigate = useNavigate();


    useEffect(() => {
        if (sessionData) {
            fetchAccounts()
        } else {
            navigate('/')
        }
    }, []);

    const fetchAccounts = async () => {
        const API_URL = `http://localhost:3000/account/${sessionData.userId}`; // Endpoint para obtener las cuentas
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

    return (
        <div className="container mt-5">
            {/* Encabezado del banco */}
            <header className="text-center mb-5">
                <h1 className="display-4 text-primary">EDUA Bank</h1>
                <p className="lead">Tus finanzas, siempre seguras.</p>
                <hr />
            </header>

            {error && <div className="alert alert-danger text-center">{error}</div>}

            {accounts.length === 0 && !error  ? (
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
        </div>
    );
};

export default HomePage;
