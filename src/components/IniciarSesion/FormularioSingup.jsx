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

  //Inputs
  const [usernameInput, setUsernameInput] = useState();
  const [emailInput, setEmailInput] = useState();
  const [passwordInput, setPasswordInput] = useState();
  const [rememberMe, setRememberMe] = useState();

  // Inputs Errors
  const [usernameError, setUsernameError] = useState(false);
  const [usernameErrorSize, setUsernameErrorSize] = useState(false);
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
  const handleUsername = () => {
    if (!usernameInput) {
      setUsernameError(true);
      return;
    }


    setUsernameError(false);
  };

  // Validation for onBlur Email
  const handleEmail = () => {
    console.log(isEmailGmail(emailInput));
    if (!isEmailGmail(emailInput)) {
      setEmailError(true);
      return;
    }
    setEmailError(false);
  };

  // Validation for onBlur Password
  const handlePassword = () => {
    if (!passwordInput || passwordInput.length > 15) {
      setPasswordError(true);
      setPasswordErrorMax(true);
      return;
    }
    setPasswordError(false);
    setPasswordErrorMax(false);
    if (!passwordInput || passwordInput.length < 7) {
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

    // Verificar si cumple con todos los requisito
    
    return tieneMayuscula && tieneCaracterEspecial && tieneNumero;

  }

  //-------------------------------------------------------------------------------------------------
  //handle Submittion
  const handleSubmit = () => {
    // console.log('EMAIL ERROR:    ', emailError)
    // console.log('Input email: ', emailInput)
    // console.log('PASSWORD ERROR:      ', passwordError)
    // console.log('Impurt password: ', passwordInput)

    setSuccess(null);
    //First of all Check for Errors


    // Si existe campos vacios
    if (!emailInput && !passwordInput) {
      if (!usernameInput) {
        setUsernameError(true);
      }
      setPasswordError(true);
      setEmailError(true);
      setFormValid("Por favor, completa todos los campos obligatorios");
      return;
    }
    if (!usernameInput) {
      setUsernameError(true);
      setFormValid("Por favor ingrese un nombre de usuario");
      return;
    }
    if (usernameInput.length < 4 || usernameInput.length > 20) {
      setUsernameErrorSize(true);
      setUsernameError(true);
      setFormValid("El nombre de usuario debe tener entre 4 y 20 caracteres");
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
    } else {
      if (!validarContraseña(passwordInput)) {
        setPasswordError(true);
        setFormValid("La contraseña no cumple con los requisitos de validación");
        return;
      }
    }


    setFormValid(null);
    const esEmailDuplicado = JSON.parse(localStorage.getItem('emailDuplicado'));
    const usernameDuplicado = JSON.parse(localStorage.getItem('usernameDuplicado'));
    console.log(esEmailDuplicado);
    // Show Successfull Submittion

    if (esEmailDuplicado) {
      setEmailError(true);
      setFormValid("El correo electrónico ya esta registrado. Por favor ingrese otro");
    } 
    if (usernameDuplicado) {
      setUsernameError(true);
      setFormValid("El nombre de usuario ya está registrado. Por favor, elige otro.");

    } else {
      localStorage.setItem('emailSave', JSON.stringify(emailInput));
      showConfirmationModal();
      setSuccess("Inicio de sesión realizado exitosamente");

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

        console.log('Usuario registrado correctamente:', data.message);
      } else if (data.message.includes("username ya es")) {
        // Hubo un error en el registro
        console.log('userrrrrrrrrrrrrrrrrrrr')
        localStorage.setItem('usernameDuplicado', true);
        console.error('Error al registrar usuario:', data.message);
      } else {
        localStorage.setItem('emailDuplicado', true);
        console.error('Error al registrar usuario:', data.message);
      }

    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  const submitYsingup = async () => {
    localStorage.setItem('usernameDuplicado', false);
    localStorage.setItem('emailDuplicado', false);
    setFormValid("");
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

  const reset = () => {
    if (isEmailGmail(emailInput)) {
      setEmailError(false);
      setFormValid("");
      return;
    }
  }

  const reset2 = () => {
    if (validarContraseña(passwordInput) && !passwordInput) {
      setPasswordError(false);
      setFormValid("");
      return;
    }
    setPasswordError(true);
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
            onBlur={handleUsername}
            InputProps={{}}
            onChange={(event) => {
              setUsernameInput(event.target.value.trim());
              handleSubmit();
            }}
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
            onKeyDown={reset}
            onBlur={() => {
              handleEmail();
              handleSubmit();
            }}
            onChange={(event) => {
              setEmailInput(event.target.value);
              handleSubmit();
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
              onBlur={() => {
                handlePassword();
                handleSubmit();
              }}
              id="standard-adornment-password"
              type={showPassword ? "text" : "password"}
              onKeyDown={reset2}
              onChange={(event) => {
                setPasswordInput(event.target.value.trim());
                handleSubmit();
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

        <div style={{ fontSize: "10px" }}>
          <Checkbox
            {...label}
            size="small"
            onChange={handleCheckboxChange}
          />
          Recordar
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