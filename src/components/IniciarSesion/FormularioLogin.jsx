import React, { useState, useEffect } from "react";
import { Modal, Result } from 'antd';
import { Link } from 'react-router-dom';
import './FormularioLogin.css'

// Material UI Imports
import {
  TextField, InputAdornment, FormControl, InputLabel,
  IconButton, Button, Input, Checkbox, Alert, Stack, Typography
} from "@mui/material";

// Material UI Icon Imports
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";



export default function Login() {
  const [visible, setVisible] = useState(false);
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
  const [emailErrorGmail, setEmailErrorGmail] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMax, setPasswordErrorMax] = useState(false);
  const [passwordErrorMin, setPasswordErrorMin] = useState(false);
  const [passwordErrorMayusculas, setPasswordErrorMayusculas] = useState(false);
  const [passwordErrorNumero, setPasswordErrorNumero] = useState(false);
  const [passwordErrorCaracter, setPasswordErrorCaracter] = useState(false);

  // Overall Form Validity
  const [formValidEmail, setFormValidEmail] = useState();
  const [formValidPassword, setFormValidPassword] = useState();
  const [formValidPasswordMayusculas, setFormValidPasswordMayusculas] = useState();
  const [formValidPasswordNumero, setFormValidPasswordNumero] = useState();
  const [formValidPasswordCaracter, setFormValidPasswordCaracter] = useState();
  const [formValid, setFormValid] = useState();
  const [success, setSuccess] = useState();

  // Handles Display and Hide Password
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Label for Checkbox
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  //-------------------------------------------------------------------------------------------------
  const isEmailGmail = (email) =>
    /^[A-Z0-9._%+-]+@gmail+\.com$/i.test(email);

  const isEmail = (email) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

  const validarEmail = () => {
    // console.log(emailInput);
    // console.log(isEmailGmail(emailInput));
    // Email Validation
    if (isEmailGmail(emailInput)) {
      setEmailError(false);
      setFormValidEmail("");
      return;
    }
    if (isEmail(emailInput)) {
      setEmailError(true);
      setFormValidEmail("El correo electrónico es inválido. Por favor ingrese solo correos con el dominio de @gmail.com ");
      return;
    } else {
      setEmailError(true);
      setFormValidEmail("Formato de correo inválido. Por favor ingrese un correo electrónico válido");
      return;
    }
  }

  useEffect(() => {
    validarEmail();
  }, [emailInput]);

  // Validación de inputs de contraseña
  const validarPasswordTamañoMensajes = () => {
    // console.log(passwordInput);
    // console.log(isEmailGmail(emailInput));

    if (passwordErrorMax) {
      setPasswordError(true);
      setFormValidPassword("La contraseña debe ser menor o igual a 16 caracteres.");
      return;
    }

    if (passwordErrorMin) {
      setPasswordError(true);
      setFormValidPassword("La contraseña debe ser mayor o igual a 8 caracteres.");
      return;
    }
    setPasswordErrorMax(false);
    setPasswordErrorMin(false);
  }

  const validarPasswordRestricciones = (input) => {
    const tieneMayuscula = /[A-Z]/.test(input);
    const tieneCaracterEspecial = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(input);
    const tieneNumero = /\d/.test(input);

    // Actualizar estados según las restricciones
    if (!tieneMayuscula) {
      setFormValidPasswordMayusculas("No tiene mayusculas");
      setPasswordErrorMayusculas(true);
    } else {
      setPasswordErrorMayusculas(false);
    }
    if (!tieneNumero) {
      setFormValidPasswordNumero("No tiene Numero");
      setPasswordErrorNumero(true);
    } else {
      setPasswordErrorNumero(false);
    }
    if (!tieneCaracterEspecial) {
      setFormValidPasswordCaracter("No tiene caracter");
      setPasswordErrorCaracter(true);
    } else {
      setPasswordErrorCaracter(false);
    }

    // Devolver si cumple con todos los requisitos
    return tieneMayuscula && tieneCaracterEspecial && tieneNumero;
  };

  const validarPasswordTamaño = () => {
    if (passwordInput.length > 16) {
      setPasswordError(true);
      setPasswordErrorMax(true);
      setPasswordErrorMin(false);
      return;
    }
    if (passwordInput.length < 7) {
      setPasswordErrorMax(false);
      setPasswordError(true);
      setPasswordErrorMin(true);
      return;
    }
    setPasswordErrorMax(false);
    setPasswordError(false);
    setPasswordErrorMin(false);
  }

  //handle Submittion
  const handleSubmit = () => {
    setSuccess(null);
    //First of all Check for Errors

    // Si existe campos vacios email o password
    if (!emailInput && !passwordInput) {
      setPasswordError(true);
      setEmailError(true);
      setFormValid("Campos obligatorios.Por favor ingrese un correo electrónico y contraseña");
      return;
    }

    if(emailError || passwordError){
      setFormValid("")
      return;
    }

    setFormValid(null);

    //Show Successfull Submittion
    const miToken = localStorage.getItem('token');
    if (miToken != undefined) {
      showConfirmationModal();
      setSuccess("Inicio de sesión realizado exitosamente");
      reset();
    } else {
      setPasswordError(true);
      setFormValid("Contraseña inválida. Por favor intente nuevamente");
    }
  };
  //-------------------------------------------------------------------------------------------------

  const handleLogin = () => {
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

    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then(errorData => {
            throw new Error(`Error al iniciar sesión: ${errorData.message}`);
          });
        }
      })
      .then(data => {
        setToken(data.token);
        console.log(data.token.username);
        localStorage.setItem('token', data.token);
        // Puedes hacer algo con el token, como almacenarlo en el estado o en localStorage
      })
      .catch(error => {
        console.error('Error en la solicitud:', error);
      });
  };


  useEffect(() => {
    if (token) {
      //console.log(token);
      var valoresToken = JSON.parse(atob(token.split('.')[1]));
      console.log(valoresToken);
      console.log('acaaaaaaaaaaaaaaa', valoresToken.username)
      //console.log(valoresToken.email);
      console.log(valoresToken.rol);
      localStorage.setItem('email', JSON.stringify(valoresToken.email));
      localStorage.setItem('rol', JSON.stringify(valoresToken.rol));
      localStorage.setItem('username', JSON.stringify(valoresToken.username));
      console.log('USernameeeeeeeeeeeeeee:', valoresToken.username);
      localStorage.setItem('password', passwordInput)
      const user = { username: valoresToken.email, role: valoresToken.rol, token: token };
      console.log('Inicio de sesión como:', valoresToken.rol);
    }
  }, [token]);

  const submitYlogin = () => {
    //console.log('esta contra: ', passwordInput)
    if (loginExitoso()) {
      try {
        handleLogin()
          .then(() => {
            // La función handleSubmit se ejecutará solo después de que handleLogin se haya completado
            handleSubmit();
            if (rememberMe) {
              localStorage.setItem('emailSave', JSON.stringify(emailInput));
            }

          })
          .catch(error => {
            console.error('Error en submitYlogin:', error);
          });
      } catch (error) {
        console.error('Error en submitYlogin:', error);
      }
    }else{
      handleSubmit();
    }
  };

  const loginExitoso = () => {
    return !emailError && !passwordError && !passwordErrorMayusculas && !passwordErrorNumero && !passwordErrorCaracter && !passwordErrorMax && !passwordErrorMin;
  };
  

  const reset2 = () => {
    if (validarContraseña(passwordInput) && !passwordInput) {
      setPasswordError(false);
      setFormValid("");
      return;
    }
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

  const showConfirmationModal = () => {
    showModal();
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
    //
  }

  const validarPassword = () => {
    console.log(passwordInput);
    if (passwordInput) {
      // setFormValidPassword("La contraseña debe ser mayor o igual a 8 caracteres.");
      validarPasswordTamaño();
      validarPasswordTamañoMensajes();
      validarPasswordRestricciones(passwordInput);
    } else {
      setFormValidPassword("Ingrese una contraseña");
      setPasswordErrorMayusculas(false);
      setPasswordErrorNumero(false);
      setPasswordErrorCaracter(false);
    }
  };

  useEffect(() => {
    validarPassword();
    setPasswordError(!passwordInput || passwordInput.length < 8 || passwordInput.length > 16);
  }, [passwordInput, passwordErrorMayusculas, passwordErrorNumero, passwordErrorCaracter]);



  return (
    <>
      <div>
        <div style={{ marginTop: "5px" }}>
          <TextField
            label="Correo electrónico"
            fullWidth
            error={emailError}
            id="standard-basic"
            variant="standard"
            //sx={{ width: "100%" }}
            value={emailInput}
            // InputProps={{
            //   onBlur: () => {
            //   console.log('Email desde ONBLUR: ',emailInput)},
            //   onFocus: () => {
            //   console.log('Email desde ONFOCUS: ',emailInput)
            //   }
            // }}

            size="small"
            onChange={(event) => {
              setEmailInput(event.target.value);
              validarEmail();
            }}
          // onKeyDown={validarEmail}
          />
          {emailError && (
            <Typography variant="caption" color="error" style={{ marginTop: "5px" }}>
              {formValidEmail}
            </Typography>
          )}
        </div>

        <div style={{ marginTop: "10px" }}>
          <FormControl sx={{ width: "100%" }} variant="standard">
            <InputLabel
              error={passwordError}
              htmlFor="standard-adornment-password"
            >
              Contraseña
            </InputLabel>
            <Input
              error={passwordError}
              // onBlur={handlePassword}
              // onKeyDown={handleSubmit}
              //onFocus={handleSubmit}
              value={passwordInput}
              id="standard-adornment-password"
              type={showPassword ? "text" : "password"}
              /*onChange={(e) => setPassword(e.target.value)}*/
              onChange={(event) => {
                setPasswordInput(event.target.value.trim());
                validarPassword();
              }}

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
            <>
              {passwordError && (
                <Typography variant="caption" color="error" style={{ marginTop: "5px" }}>
                  {formValidPassword}
                </Typography>
              )}
              {passwordErrorMayusculas && (
                <Typography variant="caption" color="error" style={{ marginTop: "5px" }}>
                  - {formValidPasswordMayusculas}
                </Typography>
              )}
              {passwordErrorNumero && (
                <Typography variant="caption" color="error" style={{ marginTop: "5px" }}>
                  - {formValidPasswordNumero}
                </Typography>
              )}
              {passwordErrorCaracter && (
                <Typography variant="caption" color="error" style={{ marginTop: "5px" }}>
                  - {formValidPasswordCaracter}
                </Typography>
              )}
            </>

          </FormControl>
        </div>

        <div style={{ marginTop: "15px" }}>
          <div style={{ fontSize: "15px" }}>
            <Checkbox
              {...label}
              size="small"
              onChange={handleCheckboxChange}
            />
            Recordar
          </div>
        </div>

        <div style={{ marginTop: "15px" }}>
          <Button
            id="botonLogin"
            variant="contained"
            fullWidth
            startIcon={<LoginIcon />}
            onClick={submitYlogin}
            style={{ textTransform: 'capitalize', backgroundColor: "#66072c" }}
          >
            Iniciar sesión
          </Button>
        </div>

        <div align="center" style={{ marginTop: "15px" }}>
          <Link to='/recuperar'>
            Olvido su contraseña?
          </Link>
        </div>
      </div>

      <div className="intenta">
        {/* Show Form Error if any */}
        {formValid && (
          <Stack sx={{ paddingTop: "10px" }} >
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
              <Link to='/' key="ok">
                <Button type="primary" onClick={handleOk}>
                  OK
                </Button>
              </Link>,
            ]}
          >
            <Result
              status="success"
              title={<div style={{ fontSize: '20px' }}>Inicio de Sesión Realizado Exitosamente</div>}
            />
          </Modal>
        )}

      </div>
    </>
  );
}