import React from "react";
import './MenuItem.css'
import { Link } from "react-router-dom";
function MenuItem({ image, name, key, id}) {
  return (
    <div className="menuItem">
    <Link to={`/mostrar-platillo/page/${id}`}><div className="menuItemImagen" style={{ backgroundImage: `url( http://18.116.106.247:3000/media/imagen/${image}` }}> </div> </Link>
    <Link to={`/mostrar-platillo/page/${id}`}><h3 className="menuItemTitulo"> {name} </h3></Link>
  </div>
  );
}

export default MenuItem;