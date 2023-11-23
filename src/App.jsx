import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import View from './views/VistaInicio'

function App() {
  const token = localStorage.getItem('token');
  const mostrarToken = () => {
    console.log('AQUI EL TOKEN', token);
    // Recuperar la constante de localStorage y convertirla de nuevo a su formato original
    const miConstanteRecuperada = JSON.parse(localStorage.getItem('email'));
    console.log('CORREOOOOOO', miConstanteRecuperada); // Mostrará el objeto original
  }
  return (
    <Router>
      <div className="App">
        <View /> 
      </div>
    </Router>
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