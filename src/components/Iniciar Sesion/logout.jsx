import React,{ useState }  from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

const ButtonLogout = () => {

  const removeToken = () => {
    const token=localStorage.getItem('token');
    //console.log("Antes de eliminar:", localStorage.getItem("token"), localStorage.getItem("email"));
    localStorage.removeItem('token');
    const recordar = localStorage.getItem('recordar');
    if(recordar=='no'){
      localStorage.removeItem('email');
    }
    console.log("Después de eliminar:", localStorage.getItem("token"), localStorage.getItem("email"));
};

  const handleLogout = () => {
    // Realizar acciones necesarias al cerrar sesión, como remover el token
    removeToken();

   if (location.pathname === '/') {
      window.location.reload();
    } 
  };


  return (
    <Link to="/">
    <Button onClick={handleLogout}>Cerrar Sesión</Button>
    </Link>
  );
};


export default ButtonLogout;
