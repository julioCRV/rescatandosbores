import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router';
import axios from 'axios';
import './Recipe.css';
import { Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import {ModalConfirmation} from '../../ModalConfirmation/ModalConfirmation';
import { Link } from 'react-router-dom';
import { Content } from 'antd/es/layout/layout';
import '../../NavNavegacion/headerNav.css'
import Icon, { HeartOutlined } from '@ant-design/icons';
import "../../MenuItem/MenuItem"

const uri = 'http://18.116.106.247:3000/media/';


const Recipe = () => {
    const {id} = useParams();
    const [likeClick, setLikeClick] = useState(false)
  const [platilloData, setPlatilloData] = useState({
    nombre: '',
    descripcion: '',
    video: '',
    imagen: '',
    identificador: '',
  });
  const [platillos, setPlatillos] = useState([]);
  const [esAdministrador, setAdministrador] = useState(false)
  const token=localStorage.getItem('token');
  
  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`,
    }
  };
  const like =  async () => {
    try {
      // Realizar la solicitud fetch aquí (reemplaza la URL con tu endpoint)
      const response = await fetch(`http://18.116.106.247:3000/actualizarCalificacion/${platilloData.identificador}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
        method: 'PUT',
    });
      console.log(response)
      if (response.ok) {
        const data = await response.json();
        setLikeClick(!likeClick);
        console.log("se cambio el estado " + data.message)
      } else {
        console.log("error al calificar platillo")
      }
    } catch (error) {
        console.log(error);
    } 
  };

  const HeartSvg = () => (
    <svg width="24px" height="24px" fill="currentColor" viewBox="0 0 1024 1024">
      <path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
    </svg>
  );
  const HeartIcon = (props) => <Icon component={HeartSvg} {...props} />;
  useEffect(() => {
    console.log('realizando llamada');
    axios.get(`http://18.116.106.247:3000/mostrarPlatillos/page/${id}`, axiosConfig)
      .then((response) => {
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
  useEffect(() => {
    async function fetchPlatillos() {
      try {
        const response = await fetch(`http://18.116.106.247:3000/obtenerCalificacion/${platilloData.identificador}`, axiosConfig);
        console.log(response)
        if (response.status=="200") {
          const data = await response.json();
          console.log(data.ok)
          console.log("exito al obtener calificacion")
          data.ok==1 && setLikeClick(true)

        } else {
          setLikeClick(false)
          console.log("1 respuesta")
          console.error('Errores');
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    }
    fetchPlatillos()
  }, []);
  useEffect(() => {
    console.log(token)
    var valoresToken = JSON.parse(atob(token.split('.')[1]));
    valoresToken.rol==='administrador'? setAdministrador(true): setAdministrador(false)
  }, []);

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
            {!likeClick ? <HeartOutlined className="classHeart " onClick={like}/> : <HeartIcon onClick={like} style={{color:"red",}} className="classHeartLike"/>}
            {//cambiar por admistrador para ver usuario final
            }
            {esAdministrador===true &&            <div className='buttonn'>
              <Link to={`/editar-platillo/${id}`}>
                <Button type="primary" onClick={() => console.log('Editar')}>
                <EditOutlined />
                </Button>
            </Link>
            <ModalConfirmation id={platilloData.identificador} nombre={platilloData.nombre} />
            </div>}
 

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