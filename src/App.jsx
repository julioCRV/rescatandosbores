import React from 'react';
import './App.css';

import { useState } from 'react';
import { BrowserRouter as Router, Route,Routes, Link, Navigate } from 'react-router-dom';

import ViewNologin from './views/vistaInicioUsuarioNoLogIn'
import ViewLogin from './views/vistaInicioUsuarioLogin'
import ViewAdmin from './views/vistaInicioAdmin'
import Pr from './components/Iniciar Sesion/prueba'

function App() {
  const [mostrarLogin, setMostrarLogin] = useState(false);


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



  const token=localStorage.getItem('token');

  const mostrarToken = () => {
    console.log('AQUI EL TOKEN',token);
    // Recuperar la constante de localStorage y convertirla de nuevo a su formato original
const miConstanteRecuperada = JSON.parse(localStorage.getItem('email'));

console.log('AAAAAAAAAAAAAAAAAAAA',miConstanteRecuperada); // Mostrará el objeto original

  }

   const [enPaginaIniciarSesion, setEnPaginaIniciarSesion] = useState(false);

  return (
    
    <div>
      {esUsuarioSincuenta ? (
        <Router>
        <div className="App">
        <ViewNologin /> 
        <Pr/>
      </div>
      </Router>
      ) : (
        <div>
        </div>
      )}

      {esUsuario ? (
        <Router>
       <div className="App">
        <ViewLogin /> 
      </div>
        </Router>
      ) : (
        <div>
        </div>
      )} 

{esAdministrador ? (
        <Router>
          <div className="App">
        <ViewAdmin /> 
      </div>
        </Router>
      ) : (
        <div>
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
      <button >VER TOKEN</button>
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