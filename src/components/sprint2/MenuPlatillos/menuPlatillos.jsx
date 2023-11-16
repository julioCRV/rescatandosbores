
import React, { useEffect, useState ,useRef } from 'react';
import {  Button} from 'antd';
import './menuPlatillos.css'
import { Link, useLocation } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import MenuItemLista from '../MenuItem/MenuItemLista';
import '../MenuItem/MenuItem.css'


const MenuPlatillos= () => {
  const [platillos, setPlatillos] = useState([]);

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
          const response = await fetch(`http://18.116.106.247:3000/all`, axiosConfig);
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
    useEffect(()=>{
      async function fetchObtenerPlatillosCalificados(){
        try {
          const response = await fetch(`http://18.116.106.247:3000/obtenerPlatillosCalificados`, axiosConfig);
          console.log(response)
          if (response.ok) {
            const data =response.json();
            console.log(data)
  
          } else {
            console.error('Error nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn');
          }
        } catch (error) {
          console.error('Error en la solicitud:', error);
        }
      }fetchObtenerPlatillosCalificados
  },[])
    
  return (
    <>
        <div className="menuPlatillo">
      <div className="menuList">
      
        {platillos.map((menuItemLista, key) => {
          return (
            <MenuItemLista
              key={key} 
              image={menuItemLista.imagen_platillo}
              name={menuItemLista.titulo_platillo}
              id={key+1}
              idPlatillo={menuItemLista.id_platillo}
            />
          );
        })}
      </div>
    </div>
   
    </>




  );
};

export default MenuPlatillos;








