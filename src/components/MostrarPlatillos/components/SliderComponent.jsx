
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import Recipe from './Recipe'; 
import './Slider.css' 

const SliderComponent = () => {
  {/*const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };*/}
  const { id } = useParams();
//  const [platilloData, setPlatilloData] = useState({
//    nombre: '',
//    descripcion: '',
//    video: '',
//    imagen: '',
//    identificador: '',
//  });
//
//  useEffect(() => {
//    // Realiza una solicitud HTTP para obtener los platillos desde tu servidor
//    // Asegúrate de que la ruta y el método de solicitud sean los correctos
//    axios.get(`http://18.116.106.247:3000/mostrarPlatillos/page/1`)
//      .then((response) => {
//        console.log("Respuesta ", response.data.respuesta);
//        const platillo = response.data.respuesta;
//        setPlatilloData({
//          nombre: platillo.nombre,
//          descripcion: platillo.descripcion,
//          imagen: platillo.imagen,
//          identificador: platillo.id,
//          // TODO Recuperamos el URL del video simplemente, ya que es una cadena
//          video: platillo.video
//        });
//      })
//      .catch((error) => {
//        console.error('Error al obtener el platillo:', error);
//      });
//  }, [id]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const navigateToPage = (pageNumber) => {
    window.location.href = `http://localhost:5173/mostrar-platillo/page/${pageNumber}`;
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
       {
        /*platillo={platilloData} 
        */
        /*<Recipe />*/
        }
      </Slider>

      {/* Agregar controles de navegación */}
      <div className="slider-controls">
        <Button
          onClick={() => navigateToPage(Number(id) - 1)}
          disabled={Number(id) === 1}
          type="primary" icon={<LeftOutlined />} size="large"
        ></Button>

        <span className='espacio'> {id} </span>
       
        <Button onClick={() => navigateToPage(Number(id) + 1)}
        type="primary" icon={<RightOutlined />} size="large"
        ></Button>
      </div>
    </div>
  );
};

export default SliderComponent;