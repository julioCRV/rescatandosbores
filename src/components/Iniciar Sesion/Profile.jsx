import React,{ useState }  from 'react';
import { Button } from 'antd';
import { UserOutlined } from '@ant-design/icons'; 

import { useAuth0 } from '@auth0/auth0-react';


const AuthButton = () => {

  const {user, isAuthenticated, isLoading} = useAuth0();

  return (
    <div>
    {isLoading && (
        <div>Loading...</div>)}
    
    {isAuthenticated && (
        <div>
            <img src={user.picture} alt={user.name} />
            <h2>{user.name}</h2>
            <p>Email: {user.email}</p>
        </div>)   }  
    </div>
  );
};

export default AuthButton;
