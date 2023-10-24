import React, { useState, useEffect } from 'react';
import MenuItem from '../MenuItem/MenuItem';
import '../MenuItem/MenuItem.css'

export const ListaPlatillos=()=> {
  const [platillos, setPlatillos] = useState([]);

  useEffect(() => {
    async function fetchPlatillos() {
      try {
        const response = await fetch(`http://18.116.106.247:3000/all`);
        if (response.ok) {
          const data = await response.json();
          setPlatillos(data.result);
        } else {
          console.error('Error al obtener platillos');
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    }

    fetchPlatillos();
  }, []);

  return (
    <div className="menuPlatillo">
      <h1 className="menuTitle">Platillos Tradicionales</h1>
      <div className="menuList">
        {platillos.map((menuItem, key) => {
          return (
            <MenuItem
              key={key}
              image={menuItem.IMAGEN_PLATILLO}
              name={menuItem.TITULO_PLATILLO}
              id={key+1}
            />
          );
        })}
      </div>
    </div>
  );
}