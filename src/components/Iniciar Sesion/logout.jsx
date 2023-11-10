import React,{ useState }  from 'react';
import { Button } from 'antd';
import { UserOutlined } from '@ant-design/icons'; 

import { useAuth0 } from '@auth0/auth0-react';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircleUser} from '@fortawesome/free-regular-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core';

const AuthButton = () => {
  const {logout} = useAuth0();



  return (
    <Button  onClick={() => logout()}>Cerrar Sesión</Button>
    
  );
};

export default AuthButton;
