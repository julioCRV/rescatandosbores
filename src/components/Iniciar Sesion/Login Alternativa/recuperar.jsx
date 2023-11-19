import React, { useState, useEffect } from "react";
import axios from 'axios';
import Routes from '../../NavNavegacion/Routes';
import { Link } from 'react-router-dom';
import Paper from "@mui/material/Paper";

import ViewLogin from '../../../views/vistaInicioUsuarioLogin'
import ViewAdmin from '../../../views/vistaInicioAdmin'
import "./LOGINV2.css"
// Material UI Imports
import {
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  IconButton,
  Button,
  Input,
  Checkbox,
  Alert,
  Stack,
} from "@mui/material";
import './LoginV2.css'

// Material UI Icon Imports
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";

// Email Validation
const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

export default function Login() {
  const dataEmail = JSON.parse(localStorage.getItem('emailSave'));
  const recordar = localStorage.getItem('recordar');
  const [token, setToken] = useState();
  const [showPassword, setShowPassword] = React.useState(false);

  //Inputs
  const [emailInput, setEmailInput] = useState(dataEmail || ''); 
  const [passwordInput, setPasswordInput] = useState();
  const [rememberMe, setRememberMe] = useState();

  // Inputs Errors
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // Overall Form Validity
  const [formValid, setFormValid] = useState();
  const [success, setSuccess] = useState();

  // Handles Display and Hide Password
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Label for Checkbox
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  // Validation for onBlur Email
  const handleEmail = () => {
    console.log(isEmail(emailInput));
    if (!isEmail(emailInput)) {
      setEmailError(true);
      return;
    }

    setEmailError(false);
  };

  // Validation for onBlur Password
  const handlePassword = () => {
    if (
      !passwordInput ||
      passwordInput.length < 5 ||
      passwordInput.length > 20
    ) {
      setPasswordError(true);
      return;
    }

    setPasswordError(false);
  };


  //handle Submittion
  const handleSubmit = () => {
    setSuccess(null);
    //First of all Check for Errors

    // If Email error is true
    if (emailError || !emailInput) {
      setFormValid("El correo electrónico es invalido. Por favor vuelva a ingresar");
      return;
    }

    // If Password error is true
    if (passwordError || !passwordInput) {
      setFormValid(
        "La contraseña se establece entre 5 y 20 caracteres. Por favor vuelva a ingresar"
      );
      return;
    }
    setFormValid(null);

    //Show Successfull Submittion
    const miToken=localStorage.getItem('token');
    if(miToken!=undefined){
      setSuccess("Inicio de sesión realizado exitosamente"); 
    }else{
      setFormValid("Datos de usuario incorrectos");
    }
   
  };


  const handleLogin = async () => {
    const url = 'http://18.116.106.247:3000/login';
    const datos = new FormData();
    datos.append("usuario", emailInput);
    datos.append("contrasenia", passwordInput);

    console.log(datos.get("usuario"));
    console.log(datos.get("contrasenia"));
    const credentials = {
      email: datos.get("usuario"),
      password: datos.get("contrasenia"),
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data = await response.json();
        setToken(data.token);
        // Almacenamiento del token después del inicio de sesión
        localStorage.setItem('token', data.token);
        //console.log('Token recibido:', data.token);
        // Puedes hacer algo con el token, como almacenarlo en el estado o en localStorage
      } else {
        const errorData = await response.json();
        console.error('Error al iniciar sesión:', errorData.message);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  useEffect(() => {
    if (token) {
      //console.log(token);
      var valoresToken = JSON.parse(atob(token.split('.')[1]));
      //console.log(valoresToken);
      //console.log(passwordInput)
      //console.log(valoresToken.email);
      console.log(valoresToken.rol);
      localStorage.setItem('email', JSON.stringify(valoresToken.email));
      localStorage.setItem('rol', JSON.stringify(valoresToken.rol));
      localStorage.setItem('password', passwordInput)
      const user = { username: valoresToken.email, role: valoresToken.rol, token: token};
      console.log('Inicio de sesión como:', valoresToken.rol );
    }
  }, [token]);

  const submitYlogin = async () => {
    try {
      await handleLogin();
      // La función handleSubmit se ejecutará solo después de que handleLogin se haya completado
    } catch (error) {
      console.error('Error en submitYlogin:', error);
    }
    handleSubmit();
    if(rememberMe){
      localStorage.setItem('emailSave', JSON.stringify(emailInput));
    }
    console.log('solo estado checkbox:', rememberMe);
  };

  function bloquearBoton() {
    // Deshabilitar el botón después de hacer clic
    document.getElementById("botonLogin").disabled = true;
  }

  //Recordar datos
  const handleCheckboxChange = (event) => {
    setRememberMe(event.target.checked);

    // Guardar información cuando el checkbox está marcado
    if (event.target.checked) {
      localStorage.setItem('recordar', 'si');
    } else {
      localStorage.setItem('recordar', 'no');
    }
  };
  const miToken=localStorage.getItem('token');
  return (
    <div className='contenedor-Div'>
        <div>
        <Paper elevation={3} style={{backgroundColor:"#FBDCC4", boxShadow:"0px 4px 8px 0px rgba(0, 0, 0, 0.6)"}} className='contenedorLogin' >
      <div align="center">
          <div >
                  <img  class="imgA" src="/src/assets/logo.png" alt="logo" />
          </div>
          <h3>¿Olvidaste tu contraseña?</h3>
          <h3>Introduzca su direccion de correo electronico y le enviaremos un correo electronico con instrucciones para restablecer su contraseña.</h3>
        <TextField
          label="Correo electrónico"
          fullWidth
          error={emailError}
          id="standard-basic"
          variant="standard"
          sx={{ width: "100%" }}
          value={emailInput}
          InputProps={{}}
          size="small"
         
          onBlur={handleEmail}
          /*onChange={(e) => setUsername(e.target.value)} */
          onChange={(event) => {
            setEmailInput(event.target.value);
          }}
        />
      </div>

      <div style={{ marginTop: "30px" }}>
      <Link to={token !== undefined ? '/' : '/Iniciar-sesion'}>
        <Button
          id="botonLogin"
          variant="contained"
          fullWidth
          startIcon={<LoginIcon />}
          onClick={submitYlogin}
          style={{ textTransform: 'capitalize',backgroundColor:"#66072c"  }}
        >
          enviar correo electrónico
        </Button>
        </Link>
        <div align="center" style={{ marginTop: "15px" }}>
          <Link to='/iniciar-sesion'>
                Volver a Inicio de Sesion
          </Link>
      </div>
      </div>

      {/* Show Form Error if any */}
      {formValid && (
        <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
          <Alert severity="error" size="small">
            {formValid}
          </Alert>
        </Stack>
      )}

      {/* Show Success if no issues */}
      {success && (
        <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
          <Alert severity="success" size="small">
            {success}
          </Alert>
        </Stack>
      )}
      </Paper>
      </div>
    </div>
  );
}