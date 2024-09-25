import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthForm from './components/AuthForm'; // Importar el componente AuthForm
import 'bootstrap/dist/css/bootstrap.min.css';




function App() {
    return (
        <Routes>
            <Route path="/" element={<AuthForm />} /> {/* Ruta para el AuthForm */}
        </Routes>
    );
}

export default App;
