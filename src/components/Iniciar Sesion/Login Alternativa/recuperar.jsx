import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Paper from "@mui/material/Paper";

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


// Email Validation
const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

export default function Login() {
  const dataEmail = JSON.parse(localStorage.getItem('emailSave'));
  const [token, setToken] = useState();

  //Inputs
  const [emailInput, setEmailInput] = useState(dataEmail || ''); 
  const [rememberMe, setRememberMe] = useState();

  // Inputs Errors
  const [emailError, setEmailError] = useState(false);

  // Overall Form Validity
  const [formValid, setFormValid] = useState();
  const [success, setSuccess] = useState();

  // Validation for onBlur Email
  const handleEmail = () => {
    console.log(isEmail(emailInput));
    if (!isEmail(emailInput)) {
      setEmailError(true);
      return;
    }

    setEmailError(false);
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
    setFormValid(null);
   
  };


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

  return (
    <div className='contenedor-Div'>
        <div>
        <Paper elevation={3} style={{backgroundColor:"#cfb5aa", boxShadow:"0px 4px 8px 0px rgba(0, 0, 0, 0.6)"}} className='contenedorLogin' >
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