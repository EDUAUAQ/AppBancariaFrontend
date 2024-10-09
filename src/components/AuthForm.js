import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";


const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true); // Estado para alternar entre login y registro
    const navigate = useNavigate();

    // Alternar entre el formulario de login y registro
    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    // Manejo de envío del formulario
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (isLogin) {
            const user_mail = event.target.email.value;
            const user_password = event.target.password.value;
            try {
                const response = await fetch('http://localhost:3000/user/login/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ user_mail, user_password })
                });
    
                if (response.ok) {
                    const data = await response.json();
                    sessionStorage.setItem("SD", JSON.stringify(data));
                    navigate("/home");
                } else {
                    const errorText = await response.text();  
                    console.log(errorText)
                }
            } catch (error) {
                console.error('Error al iniciar sesión:', error);
            }
        } else {
            const user_mail = event.target.email.value;
            const user_password = event.target.password.value;
            const first_name = event.target.first_name.value;
            const last_name = event.target.last_name.value;
            const user_name = event.target.username.value;
            const confirm_password = event.target.confirm_password.value

            if (user_password !== confirm_password) {
                alert('Las contraseñas no coinciden.');
                return;
            }else{
                try {
                    const response = await fetch('http://localhost:3000/user/signup', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            user_name,
                            user_mail,
                            user_password,
                            first_name,
                            last_name
                        })
                    });
        
                    if (response.ok) {
                        const data = await response.json();
                        alert('Usuario registrado correctamente');
                        toggleForm()
                    } else {
                        const errorText = await response.text();  
                        alert(`Error: ${errorText}`);
                    }
                } catch (error) {
                    console.error('Error al registrar usuario:', error);
                    alert('Error de conexión al servidor.');
                }
            }
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2 className="text-center mb-4">{isLogin ? 'Iniciar Sesión' : 'Registro'}</h2>
                    <form onSubmit={handleSubmit} className="border p-4 rounded shadow">
                        {/* Campo de nombre y apellido solo visible en el registro */}
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Correo Electrónico</label>
                            <input type="email" className="form-control" id="email" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Contraseña</label>
                            <input type="password" className="form-control" id="password" required />
                        </div>
                        {!isLogin && (
                            <>
                                <div className="mb-3">
                                    <label htmlFor="confirm_password" className="form-label">Confirmar Contraseña</label>
                                    <input type="password" className="form-control" id="confirm_password" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="first_name" className="form-label">Nombre</label>
                                    <input type="text" className="form-control" id="first_name" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="last_name" className="form-label">Apellido</label>
                                    <input type="text" className="form-control" id="last_name" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Nombre de Usuario</label>
                                    <input type="text" className="form-control" id="username" required />
                                </div>
                            </>
                        )}
                        <button type="submit" className="btn btn-primary w-100">
                            {isLogin ? 'Iniciar Sesión' : 'Registrar'}
                        </button>
                    </form>
                    <div className="text-center mt-3">
                        <button className="btn btn-link" onClick={toggleForm}>
                            {isLogin ? '¿No tienes una cuenta? Regístrate' : '¿Ya tienes una cuenta? Inicia Sesión'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthForm;
