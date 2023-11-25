import React from 'react';
import Home from './components/Home';
import SliderComponent from './components/SliderComponent';
import './components/Slider.css';

import './mostrarPlatillos.css';

function MostrarPlatillos() {
  return (
    <div className="App">
      <Home />
      <SliderComponent />
    </div>
  );
  
}


export default MostrarPlatillos;