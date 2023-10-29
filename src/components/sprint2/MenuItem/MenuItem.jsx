import React from "react";
import './MenuItem.css'
import { Link } from "react-router-dom";
import { useState } from "react";


function MenuItem({ image, name, key, id}) {
  const [hoverTitulo, setHoverTitulo] = useState(false);

  const hoverTrue=()=>{
    setHoverTitulo(true);
  }
  const hoverFalse = () => {
    setHoverTitulo(false);
  }
  
const classImagen = "menuItemImagen " + `${hoverTitulo ? "menuItemTituloHover" :""}`
  return (
    <div className="menuItem">
      <Link to={`/mostrar-platillo/page/${id}`} className='ItemContenedorImagen'>
        <div className={classImagen}
        style={{ backgroundImage: `url( http://18.116.106.247:3000/media/imagen/${image}` }}> 
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