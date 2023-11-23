import React from "react";
import './MenuItem.css'
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';


function MenuItem({ image, name, pagina, id}) {
  const [pagid, setPagid] = useState(null); // Inicializa platillos como null o 0, según lo que sea más apropiado para tu caso
  const token=localStorage.getItem('token');
  const PARAGIT ='';
  useEffect(() => {
    async function fetchPlatillos() {
      try {
        const response = await fetch(`http://18.116.106.247:3000/obtener_pagina/${pagina}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPagid(data.posicion);
        } else {
          console.error('Error al obtener platillos');
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    }

    fetchPlatillos();
  }, []);
   
 
  const [hoverTitulo, setHoverTitulo] = useState(false);

  const hoverTrue=()=>{
    setHoverTitulo(true);
  }
  const hoverFalse = () => {
    setHoverTitulo(false);
  }
  
const classImagen = "menuItemImagen " + `${hoverTitulo ? "menuItemTituloHover" :""}`
const urlImagen = 'http://18.116.106.247:3000/media/imagen/' + image.replace(/ /g, "%20")
  return (
    <div className="menuItem">
      <Link to={`/mostrar-platillo/page/${pagid}`} className='ItemContenedorImagen'>
        <div className={classImagen}
        style={{ backgroundImage: `url(${urlImagen})` }}> 
        </div>
      </Link>
      <Link to={`/mostrar-platillo/page/${pagid}`} className="ItemContenedorTitulo">
        <h3 className="menuItemTitulo"
        onMouseEnter={hoverTrue}
        onMouseLeave={hoverFalse}> {name} </h3>
      </Link>
  </div>
  );
}

export default MenuItem;