
import React from 'react';
import '../App.css';
import Header from '../components/Header/Header';
import MenuNav from '../components/BarraNavegación/BarraNavegación';
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