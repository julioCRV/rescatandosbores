import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import Recipe from './Recipe'; 
import './Slider.css' 

const SliderComponent = () => {
  const { id } = useParams();
  const [platilloData, setPlatilloData] = useState(0);
  const [totalPlatillos, setTotalPlatillos] = useState(0);
  
 useEffect(() => {
    // Realizar una solicitud al servidor para obtener la cantidad de platillos registrados
    axios.get('http://18.116.106.247:3000/contarPlatillos')
      .then((response) => {
        setTotalPlatillos(response.data.total_platillos);
      })
      .catch((error) => {
        console.error('Error al obtener la cantidad de platillos:', error);
      });
  }, []);


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
console.log(totalPlatillos)
{/*
const navigateToPage = (pageNumber) => {
  if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPlatillos) {
    // Verificar si pageNumber es un número y está dentro del rango
    window.location.href = `/mostrar-platillo/page/${pageNumber}`;
  } else {
    window.location.href = `/`;
    console.log("Número de página no válido");
  }
};

if (isNaN(id) || id < 1) {
  // Si el id no es un número o es menor que 1, redirige a la página 1
  window.location.href = '/mostrar-platillo/page/1';
  return null; // No renderiza el componente
}
*/}

return (
  <div className="slider-container">
    {totalPlatillos ? ( // Verificar si hay platillos disponibles
      <Slider {...settings}>
        
      </Slider>
    ) : (
      <p></p>
    )}

    {/* Agregar controles de navegación si hay platillos disponibles */}
    {totalPlatillos && (
      <div className="slider-controls">
        <Button
          onClick={() => navigateToPage(Number(id) - 1)}
          disabled={Number(id) === 1}
          type="primary" icon={<LeftOutlined />} size="large"
        ></Button>

        <span className='espacio'> {id} </span>
       
        <Button onClick={() => navigateToPage(Number(id) + 1)}
          disabled={Number(id) === totalPlatillos}
          type="primary" icon={<RightOutlined />} size="large"
        ></Button>
      </div>
    )}
  </div>
);
};

export default SliderComponent;
