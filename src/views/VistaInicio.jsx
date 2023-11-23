
import React from 'react';
import '../App.css';
import Header from '../components/MenuNavegacion/Header';
import MenuNav from '../components/NavNavegacion/HeaderNav';
import Footer from '../components/Footer/Footer';


const VentanaInicio = () => {
  return (
    <div className="App">
      <Header />
      <MenuNav />
      <Footer />
    </div>
  );
}

export default VentanaInicio;