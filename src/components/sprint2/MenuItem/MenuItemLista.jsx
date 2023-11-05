import React from "react";
import './MenuItem.css'
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';


function MenuItem({ image, name, id}) {
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
      <Link to={`/mostrar-platillo/page/${id}`} className='ItemContenedorImagen'>
        <div className={classImagen}
        style={{ backgroundImage: `url(${urlImagen})` }}> 
        </div>
      </Link>
      <Link to={`/mostrar-platillo/page/${id}`} className="ItemContenedorTitulo">
        <h3 className="menuItemTitulo"
        onMouseEnter={hoverTrue}
        onMouseLeave={hoverFalse}> {name} </h3>
      </Link>
  </div>
  );
}

export default MenuItem;