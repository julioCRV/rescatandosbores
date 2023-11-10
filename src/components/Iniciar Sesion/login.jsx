import React,{ useState }  from 'react';
import { Button } from 'antd';
import { UserOutlined } from '@ant-design/icons'; 

import { useAuth0 } from '@auth0/auth0-react';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircleUser} from '@fortawesome/free-regular-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core';

const AuthButton = () => {
  const {loginWithRedirect} = useAuth0();
  const [tamañoIcono, setTamañoIcono] = useState(30);


  return (
    <Button  onClick={() => loginWithRedirect()}>Iniciar Sesison</Button>
    
  );
};

export default AuthButton;
