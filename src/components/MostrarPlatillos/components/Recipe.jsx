import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router';
import axios from 'axios';
import swal from 'sweetalert';
import './Recipe.css';
import { Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import {ModalConfirmation} from '../../ModalConfirmation/ModalConfirmation';
import Routes from '../../sprint2/NavNavegacion/Routes';
import {Img} from 'react-image';
import { Link } from 'react-router-dom';
import { Content } from 'antd/es/layout/layout';
import '../../sprint2/NavNavegacion/headerNav.css'


const uri = 'http://18.116.106.247:3000/media/';


const Recipe = () => {
    const {id} = useParams();
  const [platilloData, setPlatilloData] = useState({
    nombre: '',
    descripcion: '',
    video: '',
    imagen: '',
    identificador: '',
  });
  const [platillos, setPlatillos] = useState([]);

  useEffect(() => {
    console.log('realizando llamada');
    axios.get(`http://18.116.106.247:3000/mostrarPlatillos/page/${id}`)
      .then((response) => {
        console.log(response.data.respuesta);
        const platillo = response.data.respuesta;
        setPlatilloData({
          nombre: platillo.nombre,
          descripcion: platillo.descripcion,
          imagen: platillo.imagen,
          identificador: platillo.id,
          video: platillo.video,
        });
      })
      .catch((error) => {
        console.log('Algun problema muy malevolo me hicieron:v')
        console.error('Error al obtener el platillo:', error);
      });
  }, [id]);

console.log(platilloData.imagen)
  return (
    
      <div className='reciForma'>
 
        <h2 className="formato-titulo">{platilloData.nombre}</h2>   {/*modificacion cambio de nombre*/}
        <div className="recipe-content">
          <div className='recipe-content-header'>
            <div className="recipe-image">
              <img
                src={uri + 'imagen/' + platilloData.imagen}
                alt="Imagen del Platillo"
              />
            </div>
            <div className="recipe-text">
              <p>{platilloData.descripcion}</p>
            </div>
            <div className="recipe-buttons">
            <div className='buttonn'>
              <Link to={`/editar-platillo/${id}`}>
                <Button type="primary" onClick={() => console.log('Editar')}>
                <EditOutlined />
                </Button>
            </Link>
            </div>
            <ModalConfirmation id={platilloData.identificador} nombre={platilloData.nombre} />
          </div>
          </div>
        <div className='recipe-video'>
            <h1></h1>
            <ReactPlayer  url={uri + 'video/' + platilloData.video} controls={true}  width="300px" height="240px"  playing={true} /> {/*Se modifico el width y borro el width ademas de que se subio los botoenes */}
        </div>
     
      </div>
    </div>

  );
};

export default Recipe; 