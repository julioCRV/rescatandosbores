import React from 'react';
import './App.css'
import { useState } from 'react';
import { BrowserRouter as Router, Route,Routes, Link, Navigate } from 'react-router-dom';
import ViewAdmin from './views/vistaInicioAdmin' 

function App() {
  const [esAdministrador, setAdministrador] = useState(true);
  const token=localStorage.getItem('token');

  const mostrarToken = () => {
    console.log('AQUI EL TOKEN',token);
    // Recuperar la constante de localStorage y convertirla de nuevo a su formato original
const miConstanteRecuperada = JSON.parse(localStorage.getItem('email'));

console.log('CORREOOOOOO',miConstanteRecuperada); // Mostrará el objeto original

  }


  return (
    
    <div>
      {/*{esUsuarioSincuenta ? (
        <Router>
        <div className="App">
        <ViewNologin /> 
        <Pr/>
      </div>
      </Router>
      ) : (
        <div>
        </div>
      )}*/}

  

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