import React from 'react';

import { useState } from "react";

import Chip from "@mui/material/Chip";
import FaceIcon from "@mui/icons-material/Face";
import Paper from "@mui/material/Paper";
import LockIcon from "@mui/icons-material/Lock";

import Switch from "@mui/material/Switch";

import Login from "./LoginV";
import Signup from "./SignUpV";
import './LoginV2.css'


function vistaLogin() {
  const [checked, setChecked] = useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };


  return (
    <div className='contenedor-Div'>
    <div >
    <Paper elevation={3} style={{backgroundColor:"#FBDCC4", boxShadow:"0px 4px 8px 0px rgba(0, 0, 0, 0.6)"}} className='contenedorLogin' >
        <div align="center">
          {checked ? (
            <Chip
            className='DivIniSesion'
              icon={<LockIcon />}
              label="Iniciar sesión"
              variant="outlined"
              color="info"
            />
          ) : (
            <Chip
            className='DivIniSesion'
              icon={<FaceIcon />}
              label="Registrarse"
              variant="outlined"
              color="info"
            />
          )}
          <br />

          <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
        </div>

        {checked ? <Login /> : <Signup />}
      </Paper>
      </div>
      </div>
  );
}

export default vistaLogin;