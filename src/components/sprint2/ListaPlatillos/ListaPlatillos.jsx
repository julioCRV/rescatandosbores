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


  
  console.log(searchedText);
  useEffect(() => {
    async function fetchPlatillos() {
      try {
        const response = await fetch(`http://18.116.106.247:3000/buscarPlatillo?titulo=${searchedText}`);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setPlatillos(data.result);
        } else {
          console.error('Error al obtener platillos');
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    }

    fetchPlatillos();
  }, [searchedText]);

  return (
    <div className="menuPlatillo">
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
export default ListaPlatillos;