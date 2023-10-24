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
  const [platilloData, setPlatilloData] = useState(null);

  useEffect(() => {
    axios.get(`http://18.116.106.247:3000/mostrarPlatillos/page/${id}`)
      .then((response) => {
        setPlatilloData(response.data.respuesta);
      })
      .catch((error) => {
        console.error('Error al obtener el platillo:', error);
      });
  }, [id]);

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
        <Link to={`/mostrar-platillos/page/${Number(id) - 1}`}>
          <Button disabled={Number(id) === 1} type="primary" icon={<LeftOutlined />} size="large" />
        </Link>

        <span className='espacio'> {id} </span>
       
        <Link to={`/mostrar-platillo/page/${Number(id) + 1}`}>
          <Button type="primary" icon={<RightOutlined />} size="large" />
        </Link>
      </div>
    </div>
  );
};

export default SliderComponent;
