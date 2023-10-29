import React from "react";
import './MenuItem.css'
import { Link } from "react-router-dom";
import { useState } from "react";


function MenuItem({ image, name, key, id}) {
<<<<<<< HEAD
  const [hoverTitulo, setHoverTitulo] = useState(false);

  const hoverTrue=()=>{
    setHoverTitulo(true);
  }
  const hoverFalse = () => {
    setHoverTitulo(false);
  }
  
const classImagen = "menuItemImagen " + `${hoverTitulo ? "menuItemTituloHover" :""}`
=======
  console.log({image},id);
>>>>>>> b5d645fe86148912c8635410ce52ca327098d166
  return (
    
    <div className="menuItem">
<<<<<<< HEAD
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
=======
    <Link to={`/mostrar-platillo/page/${id}`}><div className="menuItemImagen"

     style={{ backgroundImage: `url( http://18.116.106.247:3000/media/imagen/${image}` }}> </div> </Link>
    <Link to={`/mostrar-platillo/page/${id}`}><h3 className="menuItemTitulo"> {name} </h3></Link>
>>>>>>> b5d645fe86148912c8635410ce52ca327098d166
  </div>
  );
}

export default MenuItem;