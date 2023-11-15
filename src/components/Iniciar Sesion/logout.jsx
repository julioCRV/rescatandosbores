import React,{ useState }  from 'react';
import { Button } from 'antd';
import { UserOutlined } from '@ant-design/icons'; 
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircleUser} from '@fortawesome/free-regular-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core';

const ButtonLogout = () => {
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    var value = localStorage.getItem(key);
  
    console.log(key + ": " + value);
  
  
    };

  const token=localStorage.getItem('token');
  const removeToken = () => {
    console.log("Antes de eliminar:", token,localStorage.getItem("token"));
    localStorage.removeItem('token');
    console.log("Después de eliminar:", localStorage.getItem("token"));

    // Recupera todos los elementos almacenados en localStorage
for (var i = 0; i < localStorage.length; i++) {
  var key = localStorage.key(i);
  var value = localStorage.getItem(key);

  console.log(key + ": " + value);
}

  };



  return (
    <Button onClick={removeToken}>Cerrar Sesión</Button>
  );
};


export default ButtonLogout;
