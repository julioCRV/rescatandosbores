import React from 'react';
import './App.css';

import { useState } from 'react';
import { BrowserRouter as Router, Route,Routes, Link, Navigate } from 'react-router-dom';
import Header from './components/MenuNavegacion/header';
import MenuNav from './components/sprint2/NavNavegacion/headerNav';
import Footer from './components/Footer/Footer';
import LogIn from './components/Iniciar Sesion/login'
import VistaInicio from './views/vistaInicio'

import Menu from './components/sprint2/MenuPlatillos/menuPlatillos';
import Home from './components/Home/BannerPresentacion/BannerPresentacion';
import Buscador from './components/Home/Buscador'
import MyForm from './components/RegistroPlatillo/registrarPlatillo';
import MostrarPlatillos from './components/MostrarPlatillos/mostrarPlatillos';
import EditarPlatillos from './components/EditarPlatillo/EditarPlatillo'
import Login from "./components/Iniciar Sesion/Login Alternativa/LOGINV2"

function App() {
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [mostrarHeader, setMostrarHeader] = useState(true);
  const [mostrarMenuNav, setMostrarMenuNav] = useState(true);
  const [mostrarFooter, setMostrarFooter] = useState(true);

  const [esAdministrador, setAdministrador] = useState(false);
  const [esUsuarioSincuenta, setUsuarioSincuenta] = useState(false);
  const [esUsuario, setUsuario] = useState(false);

  const handleClick = (tipo) => {
    if (tipo === 'administrador') {
      setAdministrador(true);
      setUsuarioSincuenta(false);
      setUsuario(false);
    } else if (tipo === 'usuarioSincuenta') {
      setAdministrador(false);
      setUsuarioSincuenta(true);
      setUsuario(false);
    } else if (tipo === 'usuario') {
      setAdministrador(false);
      setUsuarioSincuenta(false);
      setUsuario(true);
    }
  };

  const handleMostrarLogin = () => {
    setMostrarLogin(!mostrarLogin);
    setMostrarHeader(false);
    setMostrarMenuNav(false);
    setMostrarFooter(false);
  };
  const handleMostrarLogin2 = () => {
    setMostrarLogin(false);
    setMostrarHeader(true);
    setMostrarMenuNav(true);
    setMostrarFooter(true);
  };

  return (
    
    <div>
      {esUsuarioSincuenta ? (
        <Router>
          <Routes>
            <Route path="/" element={<VistaInicio />} />
            <Route path="/Iniciar-sesion" element={<Login />} />
          </Routes>
        </Router>
      ) : (
        <div>
          <p>¡No eres un usuario sin cuenta!</p>

        </div>
      )}

      {esUsuario ? (
        <Router>
          <VistaInicio />
          <Routes>
            <Route path="/" element={<VistaInicio />} />
            <Route path="/Iniciar-sesion" element={<Login />} />
          </Routes>
        </Router>
      ) : (
        <div>
          <p>¡No eres un usuario!</p>

        </div>
      )} 
       <div>
        <button onClick={() => handleClick('administrador')} disabled={esAdministrador}>
        Administrador
      </button>
      <button onClick={() => handleClick('usuarioSincuenta')} disabled={esUsuarioSincuenta}>
        Usuario Sin cuenta
      </button>
      <button onClick={() => handleClick('usuario')} disabled={esUsuario}>
        Usuario 
      </button>
      </div>
    </div>
  );
}

export default App;



 {/*
    <Router>
      <div className="App">
        <Header />
        <Login2 />
        <MenuNav />
        <Footer /> 
      </div>
    </Router>
  */}