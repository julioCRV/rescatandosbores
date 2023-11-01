
import React, { useEffect, useState ,useRef } from 'react';
import {  Button} from 'antd';
import './menuPlatillos.css'
import { Link, useLocation } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import MenuItem from '../MenuItem/MenuItem';
import '../MenuItem/MenuItem.css'


const MenuPlatillos= () => {
  const [platillos, setPlatillos] = useState([]);


  

    useEffect(() => {
      async function fetchPlatillos() {
        try {
          const response = await fetch(`http://18.116.106.247:3000/all`);
          if (response.ok) {
            const data = await response.json();
            setPlatillos(data.result);
            console.log(platillos);
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
    <>
       <Link to="/buscador">
        <Button
            className='estilo-buttonMenu'
            icon={<SearchOutlined />}   
        >
        </Button>
        </Link> 
        
        <div className="menuPlatillo">
      <div className="menuList">
      
        {platillos.map((menuItem, key) => {
          console.log(key);
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
   
    </>




  );
};

export default MenuPlatillos;








