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
  const [totalPlatillos, setTotalPlatillos] = useState(0);
  const token=localStorage.getItem('token');
  
  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`,
    }
  };

 useEffect(() => {
    // Realizar una solicitud al servidor para obtener la cantidad de platillos registrados
    axios.get('http://18.116.106.247:3000/contarPlatillos', axiosConfig)
      .then((response) => {
        setTotalPlatillos(response.data.total_platillos);
      })
      .catch((error) => {
        console.error('Error al obtener la cantidad de platillos:', error);
      });
  }, []);

  //console.log(Number(id))

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  
  return (
    <div className="slider-container">
      {/* Agregar controles de navegación */}
      <div className="slider-controls">
        {id>0 && (
        <Link to={`/mostrar-platillo/page/${Number(id) - 1}`}>
          <Button disabled={Number(id) === 1} type="primary" icon={<LeftOutlined />} size="large" />
        </Link>
        )}
        <span className='espacio'> {id} </span>
  

          <Link to={`/mostrar-platillo/page/${Number(id) + 1}`}>
            <Button
             disabled={Number(id) >= totalPlatillos}
              type="primary"
              icon={<RightOutlined />}
              size="large"
            />
          </Link>
      </div>
    </div>
  );
  
  
  
};

export default SliderComponent;
