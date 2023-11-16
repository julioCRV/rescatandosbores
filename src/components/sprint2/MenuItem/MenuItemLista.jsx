import React from "react";
import './MenuItem.css'
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import  Icon, {HeartOutlined} from "@ant-design/icons";
import { async } from "rxjs";

function MenuItem({ image, name, id, idPlatillo}) {
  const [hoverTitulo, setHoverTitulo] = useState(false);
  const [likeClick, setLikeClick] = useState(false)
  const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJjbGllbnRlQGV4YW1wbGUuY29tIiwicm9sIjoiY2xpZW50ZSIsImlhdCI6MTcwMDE0NDMzNywiZXhwIjoxNzAwMTQ1MjM3fQ.Xmtk7FbWCB8lh4ZDIKKzieb4oRpJtUPpadsC-_ul0IA";
  
  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`,
    }
  };
  useEffect(() => {
    async function fetchPlatillos() {
      try {
        const response = await fetch(`http://18.116.106.247:3000/obtenerCalificacion/${idPlatillo}`, axiosConfig);
        console.log(response)
        if (response.ok) {
          const data = await response.json();
          console.log(data)
          data.ok===1 && setLikeClick(true)
          console.log("1 respuesta")

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
  }, [likeClick]);
  const hoverTrue=()=>{
    setHoverTitulo(true);
  }
  const hoverFalse = () => {
    setHoverTitulo(false);
  }
  const like =  async () => {
    try {
      // Realizar la solicitud fetch aquí (reemplaza la URL con tu endpoint)
      const response = await fetch(`http://18.116.106.247:3000/actualizarCalificacion/${idPlatillo}`, {
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
        mostrarNotificacionError(error);
    } 
  };
 
  
  const HeartSvg = () => (
    <svg width="24px" height="24px" fill="currentColor" viewBox="0 0 1024 1024">
      <path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
    </svg>
  );
  const HeartIcon = (props) => <Icon component={HeartSvg} {...props} />;
  
const classImagen = "menuItemImagen " + `${hoverTitulo ? "menuItemTituloHover" :""}`

const urlImagen = 'http://18.116.106.247:3000/media/imagen/' + image.replace(/ /g, "%20")
  return (
    <div className="menuItem">
      <Link to={`/mostrar-platillo/page/${id}`} className='ItemContenedorImagen'>
        <div className={classImagen}
        style={{ backgroundImage: `url(${urlImagen})` }}> 
        </div>
      </Link>
     <div className="contenedorTitulo">
      <Link to={`/mostrar-platillo/page/${id}`} className="ItemContenedorTitulo" state={{likeClick, setLikeClick, like}}>
          <h3 className="menuItemTitulo"
          onMouseEnter={hoverTrue}
          onMouseLeave={hoverFalse}> {name} </h3>
          
        </Link>
      
      {likeClick===false ? <HeartOutlined className="classHeart " onClick={like}/> : <HeartIcon onClick={like} style={{color:"red",}} className="classHeartLike"/>}
     </div>
  </div>
  );
}

export default MenuItem;