import React,{ useState }  from 'react';
import { Button } from 'antd';
import { UserOutlined } from '@ant-design/icons'; 
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircleUser} from '@fortawesome/free-regular-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core';

const ButtonLogout = () => {
//onClick={() => logout()}
  return (
    <Button  >Cerrar Sesión</Button>
  );
};

export default ButtonLogout;
