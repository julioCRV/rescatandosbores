import React,{ useState }  from 'react';
import { BrowserRouter as Router,Link } from 'react-router-dom';
import { Button } from 'antd';
import { UserOutlined } from '@ant-design/icons'; 

import { useAuth0 } from '@auth0/auth0-react';
import {LoginOutlined} from '@ant-design/icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircleUser} from '@fortawesome/free-regular-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core';



const AuthButton = ({ handleMostrarLogin }) => {
  const {loginWithRedirect} = useAuth0();
  const [tamañoIcono, setTamañoIcono] = useState(30);

  return (
    <Link  to="/Iniciar-sesion">
    <Button  icon={<LoginOutlined />} onClick={handleMostrarLogin}>Iniciar Sesison</Button>
    </Link>
  );
};

export default AuthButton;
