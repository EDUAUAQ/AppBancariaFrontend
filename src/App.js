import React from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

//Components
import AuthForm from './components/AuthForm'; 
import HomePage from './components/Home';
import WelcomePage from './components/WelcomePage';




function App() {
    return (
        <Routes>
            <Route path="/" element={<WelcomePage/>} />
            <Route path='/Auth' element={<AuthForm/>}/>
            <Route path='/home' element={<HomePage/>}/>
        </Routes>
    );
}

export default App;
