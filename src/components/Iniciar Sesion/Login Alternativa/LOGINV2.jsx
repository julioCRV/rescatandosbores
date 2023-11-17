import React from 'react';

import { useState } from "react";
import Chip from "@mui/material/Chip";
import FaceIcon from "@mui/icons-material/Face";
import Paper from "@mui/material/Paper";
import LockIcon from "@mui/icons-material/Lock";

import Switch from "@mui/material/Switch";

import Login from "./LoginV";
import Signup from "./SignUpV";
import './LOGINV2.css'
import { Box } from '@mui/material';


function vistaLogin() {
  const [checked, setChecked] = useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    
    <div className='contenedor-Div'>
    <div className='contenedor-Login'>
        <Paper elevation={3} style={{ boxShadow: '0 0 15px rgba(0,0,0,0.8)', backgroundColor:"#cfb5aa",padding: "10px", paddingBottom: "20px" }}>
        <div align="center">
        <div>
        <img class="imgA" src="/src/assets/logo.png" alt="logo" />
        </div>
          <h3>Rescantando Sabores</h3>
          {checked ? (
            <Chip
              icon={<LockIcon style={{color:"#b07961"}}/>}
              label="Iniciar sesión"
              variant="outlined"
              color="info"
              style={{ color: '#b07961', borderColor:"#b07961" }}
            />
          ) : (
            <Chip
              icon={<FaceIcon style={{color:"#b07961"}} /> }
              label="Registrarse"
              variant="outlined"
              color="info"
              style={{ color: '#b07961', borderColor:"#b07961"}}
            />
          )}
          <br />
          <Box
          sx={{
            '& .MuiSwitch-switchBase.Mui-checked': {
              color: '#b07961',
            },
            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
              backgroundColor: '#b07961',
            },
          }}
          >
          {<Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}

          />}
          </Box>
          
        </div>

        {checked ? <Login /> : <Signup />}
      </Paper>
      </div>
      </div>
  );
}

export default vistaLogin;