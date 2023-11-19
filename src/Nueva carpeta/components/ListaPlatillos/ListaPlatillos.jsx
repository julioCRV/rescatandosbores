import React, { useState, useEffect } from 'react';
import MenuItem from '../MenuItem/MenuItem';
import '../MenuItem/MenuItem.css'
 const ListaPlatillos=()=> {
  const [platillos, setPlatillos] = useState([]);
  const [searchedText, setSearchedText] = useState("")

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
      <div className="menuList">
        {platillos.map((menuItem, key) => {
          console.log(menuItem)
          console.log(menuItem.titulo_platillo)
          console.log(menuItem.imagen_platillo)
          return (
            <MenuItem
              key={key}
              image={menuItem.imagen_platillo}
              name={menuItem.titulo_platillo}
              id={key+1}
            />
          );
        })}
      </div>
    </div>
  );
}
export default ListaPlatillos;