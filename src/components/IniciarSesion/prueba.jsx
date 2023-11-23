import React, { useState, useEffect } from "react";
import { Modal, Result } from 'antd';
import { Link } from 'react-router-dom';
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
import './FormularioSingup.css'
// Material UI Icon Imports
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";

// Validations

// Email Validation
const isEmailGmail = (email) =>
  /^[A-Z0-9._%+-]+@gmail+\.com$/i.test(email);

const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

export default function Login() {
  const [visible, setVisible] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [token, setToken] = useState();

  //Inputs
  const [usernameInput, setUsernameInput] = useState();
  const [emailInput, setEmailInput] = useState();
  const [passwordInput, setPasswordInput] = useState();

  // Inputs Errors
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMax, setPasswordErrorMax] = useState(false);
  const [passwordErrorMin, setPasswordErrorMin] = useState(false);

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

  // Validation for onBlur Username
  const handleUsername = async () => {
    if (!usernameInput) {
      setUsernameError(true);
      setFormValid("Por favor, ingrese un nombre de usuario");
      return;
    }

    if (usernameInput.length < 4) {
      setUsernameError(true);
      setFormValid("El nombre de usuario debe tener al menos 4 caracteres");
      return;
    }
  
    if (usernameInput.length > 20) {
      setUsernameError(true);
      setFormValid("El nombre de usuario no debe tener más de 20 caracteres");
      return;
    }

    // Verificar si el nombre de usuario tiene espacios entre caracteres
    if (/^\s/.test(usernameInput) || /\s$/.test(usernameInput)) {
      setUsernameError(true);
      setFormValid("El nombre de usuario no debe tener espacios entre caracteres");
      return;
    }

    // Verificar si el nombre de usuario contiene caracteres no permitidos
    if (!/^[a-zA-Z0-9-_]+$/.test(usernameInput)) {
      setUsernameError(true);
      setFormValid("Caracteres no válidos en el nombre de usuario. Solo se permiten letras, números, guiones y guiones bajos.");
      return;
    }

    
    // Verificar si el nombre de usuario ya está registrado en el backend
    try {
      const url = 'http://18.116.106.247:3000/registro';
      const credentials = {
        username: usernameInput,
        email: emailInput,
        password: passwordInput,
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.message && data.message.includes("El username ya está registrado")) {
          setUsernameError(true);
          setFormValid("El nombre de usuario ya está registrado. Por favor, elige otro.");
        } else {
          setUsernameError(false);
          setFormValid(null);
        }
      } else {
        console.error('Error en el registro:', data.message);
        setFormValid("Error en el registro");
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setFormValid("Error en la solicitud");
    }

  };
  

  // Validation for onBlur Email
  const handleEmail = async () => {
    if (!emailInput) {
      setEmailError(true);
      setFormValid("Por favor, ingrese un correo electrónico");
      return;
    }

    if (!isEmailGmail(emailInput)) {
      setEmailError(true);
      setFormValid("Por favor, ingrese un correo electrónico con el dominio @gmail.com");
      return;
    }
  
    // Verificar si el correo electrónico ya está registrado en el backend
    try {
      const url = 'http://18.116.106.247:3000/registro';
      const credentials = {
        username: usernameInput, 
        email: emailInput,
        password: passwordInput,
      };
  
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        if (data.message && data.message.includes("correo electrónico ya está registrado")) {
          setEmailError(true);
          setFormValid("El correo electrónico ya está registrado. Por favor, ingrese otro.");
        } else {
          setEmailError(false);
          setFormValid(null);
        }
      } else {
        console.error('Error en el registro:', data.message);
        setFormValid("Error en el registro");
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setFormValid("Error en la solicitud");
    }
  };

  // Validation for onBlur Password
  const handlePassword = () => {
    if (!passwordInput || passwordInput.length > 16) {
      setPasswordError(true);
      setPasswordErrorMax(true);
      return;
    }
    setPasswordError(false);
    setPasswordErrorMax(false);
    if (!passwordInput || passwordInput.length < 8) {
      setPasswordError(true);
      setPasswordErrorMin(true);
      return;
    }
    setPasswordError(false);
    setPasswordErrorMin(false);
  };

  function validarContraseña(contraseña) {
    handlePassword();

    // Verificar si contiene al menos una letra mayúscula
    const tieneMayuscula = /[A-Z]/.test(contraseña);

    // Verificar si contiene al menos un carácter especial
    const tieneCaracterEspecial = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(contraseña);

    // Verificar si contiene al menos un número
    const tieneNumero = /\d/.test(contraseña);

    // Verificar si no contiene espacios en blanco
    const noTieneEspacios = !/\s/.test(contraseña);

    // Verificar si cumple con todos los requisitos
    console.log(passwordError, 'max: ', passwordErrorMax, 'min: ', passwordErrorMin)
    if (passwordError || passwordErrorMax || passwordErrorMin || !noTieneEspacios) {
      return false;
    } else {
      return tieneMayuscula && tieneCaracterEspecial && tieneNumero;
    }
  }

  //-------------------------------------------------------------------------------------------------
  //handle Submittion
  const handleSubmit = async () => {
    console.log('USERNAME ERROR:    ', usernameError)
    console.log('Input username:    ', usernameInput)
    console.log('EMAIL ERROR:    ', emailError)
    console.log('Input email: ', emailInput)
    console.log('PASSWORD ERROR:      ', passwordError)
    console.log('Input password: ', passwordInput)

    setSuccess(null);
    //First of all Check for Errors
    // Si existe campos vacios
    if (!usernameInput || !emailInput || !passwordInput) {
      setUsernameError(!usernameInput);
      setEmailError(!emailInput);
      setPasswordError(!passwordInput);
      setFormValid("Por favor, completa todos los campos obligatorios");
      return;
    }

    // Verificar si existe un nombre de usuario duplicado
    try {
      const url = 'http://18.116.106.247:3000/registro';
      const credentials = {
        username: usernameInput,
        email: emailInput,
        password: passwordInput,
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.message && data.message.includes("username ya está registrado")) {
          setUsernameError(true);
          setFormValid("El nombre de usuario ya está registrado. Por favor, elige otro.");
          return;
        }
      } else {
        console.error('Error en el registro:', data.message);
        setFormValid("Error en el registro");
        return;
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setFormValid("Error en la solicitud");
      return;
    }

    // If Email error is true
    if (emailError || !emailInput) {

      if (!passwordError && passwordInput && !emailInput) {
        setEmailError(true);
        setFormValid("Correo obligatorio. Por favor ingrese un correo electrónico");
        return;
      } else {
        setEmailError(true);
        if (passwordError) {
          setPasswordError(true);
        }
        if (isEmail(emailInput)) {
          if (isEmailGmail(emailInput)) {
            setFormValid("El correo electrónico ya esta registrado. Por favor ingrese otro");
            return;
          } else {
            setFormValid("El correo electrónico es inválido. Por favor ingrese solo correos con el dominio de @gmail.com ");
            return;
          }
        } else {
          setFormValid("Formato de correo inválido. Por favor ingrese un correo electrónico válido");
          return;
        }
      }
    }

    // If Password error is true
    if (passwordErrorMax) {
      setPasswordError(true);
      setFormValid("La contraseña debe ser menor o igual a 16 caracteres.");
      return;
    }

    if (passwordErrorMin) {
      setPasswordError(true);
      setFormValid("La contraseña debe ser mayor o igual a 8 caracteres.");
      return;
    }
    if (!passwordInput) {
      setPasswordError(true);
      setFormValid("Contraseña obligatoria. Por favor ingrese una contraseña");
      return;
    } 

    setFormValid(null);
    const esEmailDuplicado = JSON.parse(localStorage.getItem('emailDuplicado'));
    console.log(esEmailDuplicado);
    // Show Successfull Submittion
    if (!esEmailDuplicado) {
      showConfirmationModal();
      setSuccess("Inicio de sesión realizado exitosamente");
    } else {
      setEmailError(true);
      setFormValid("El correo electrónico ya esta registrado. Por favor ingrese otro");
    }
  };
  //-------------------------------------------------------------------------------------------------

  //ENVIAR FORMULARIO 
  const handleLogin = async () => {
    const url = 'http://18.116.106.247:3000/registro';
    const datos = new FormData();
    datos.append("usuario", usernameInput);
    datos.append("correo", emailInput);
    datos.append("contrasenia", passwordInput);

    console.log(datos.get("usuario"));
    console.log(datos.get("correo"));
    console.log(datos.get("contrasenia"));
    const credentials = {
      username: datos.get("usuario"),
      email: datos.get("correo"),
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

      const data = await response.json();
      if (response.ok) {
        // El registro fue exitoso
        localStorage.setItem('emailDuplicado', false);
        console.log('Usuario registrado correctamente:', data.message);
      } else {
        // Hubo un error en el registro
        localStorage.setItem('emailDuplicado', true);
        console.error('Error al registrar usuario:', data.message);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  const submitYsingup = async () => {
    console.log('esta contra: ', passwordInput)
    if (validarContraseña(passwordInput)) {
      try {
        await handleLogin();
        handleSubmit();
      } catch (error) {
        // Manejar errores si es necesario
        console.error('Error al manejar el inicio de sesión:', error);
      }
    } else {
      handleSubmit();
    }
  };

  const showConfirmationModal = () => {
    showModal();
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
    window.location.reload();
    //
  }

  return (
    <>
      <div>
        <div style={{ marginTop: "10px" }}>
          <TextField
            error={usernameError}
            label="Nombre de usuario"
            id="standard-basic"
            variant="standard"
            sx={{ width: "100%" }}
            size="small"
            value={usernameInput}
            InputProps={{}}
            onChange={(event) => {
              setUsernameInput(event.target.value);
            }}
            onBlur={handleUsername}
          />
        </div>

        <div style={{ marginTop: "5px" }}>
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
            onChange={(event) => {
              setEmailInput(event.target.value);
            }}
          />
        </div>
        <div style={{ marginTop: "5px" }}>
          <FormControl sx={{ width: "100%" }} variant="standard">
            <InputLabel
              error={passwordError}
              htmlFor="standard-adornment-password"
            >
              Contraseña
            </InputLabel>
            <Input
              error={passwordError}
              onBlur={handlePassword}
              id="standard-adornment-password"
              type={showPassword ? "text" : "password"}
              onChange={(event) => {
                setPasswordInput(event.target.value.trim());
              }}
              value={passwordInput}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>

        <div style={{ marginTop: "10px" }}>
          <Button
            variant="contained"
            fullWidth
            startIcon={<LoginIcon />}
            onClick={submitYsingup}
            style={{ textTransform: 'capitalize', backgroundColor: "#66072c" }}
          >
            Registrarse
          </Button>
        </div>
      </div>
      {/* Show Form Error if any */}
      <div className="intenta">
        {formValid && (
          <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
            <Alert severity="error" size="small">
              {formValid}
            </Alert>
          </Stack>
        )}

        {/* Show Success if no issues */}
        {success && (
          <Modal
            visible={visible}
            closable={false}
            onOk={handleOk}
            onCancel={handleOk}
            width={400}
            style={{ top: '50%', transform: 'translateY(-50%)' }} // Centra verticalmente
            footer={[
              <Link to='/iniciar-sesion' key="ok">
              <Button type="primary" onClick={handleOk}>
                OK
              </Button>
              </Link>
            ]}
          >
            <Result
              status="success"
              title={<div style={{ fontSize: '20px' }}>Usuario registrado correctamente</div>}
            />
          </Modal>
        )}
      </div>
    </>
  );
}