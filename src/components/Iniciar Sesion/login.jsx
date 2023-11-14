import React,{ useState }  from 'react';
import { BrowserRouter as Router,Link } from 'react-router-dom';
import { Button } from 'antd';
import { UserOutlined } from '@ant-design/icons'; 

import {LoginOutlined} from '@ant-design/icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircleUser} from '@fortawesome/free-regular-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core';



const ButtonLogin = ({ handleMostrarLogin }) => {
  const [tamañoIcono, setTamañoIcono] = useState(30);

  return (
    <Link  to="/Iniciar-sesion">
    <Button  icon={<LoginOutlined />} onClick={handleMostrarLogin}>Iniciar Sesison</Button>
    </Link>
  );
};

export default ButtonLogin;
