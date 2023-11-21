import React, { useState, useEffect } from "react";
import { Modal, Result } from 'antd';
import { Link } from 'react-router-dom';


import ViewLogin from '../../../views/vistaInicioUsuarioLogin'
import ViewAdmin from '../../../views/vistaInicioAdmin'
import './LoginV.css'

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

// Material UI Icon Imports
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";

// Email Validation
const isEmailGmail = (email) =>
  /^[A-Z0-9._%+-]+@gmail+\.com$/i.test(email);

const isEmail = (email) =>
/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

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
    if (
      !passwordInput ||
      passwordInput.length > 16
    ) {
      setPasswordError(true);
      setPasswordErrorMax(true);
      return;
    }
    setPasswordError(false);
    setPasswordErrorMax(false);
    if (
      !passwordInput ||
      passwordInput.length < 8 
    ) {
      setPasswordError(true);
      setPasswordErrorMin(true);
      return;
    }
    setPasswordError(false);
    setPasswordErrorMin(false);
  };


  //handle Submittion
  const handleSubmit = () => {
    console.log('EMAIL ERROR:    ',emailError)
    console.log('Input email: ',emailInput)
    console.log('PASSWORD ERROR:      ',passwordError)
    console.log('Impurt password: ',passwordInput)

    setSuccess(null);
    //First of all Check for Errors
    // Si existe campos vacios
    if (!emailInput && !passwordInput) {
      setPasswordError(true);
      setEmailError(true);
      setFormValid("Campos obligatorios.Por favor ingrese un correo electrónico y contraseña");
      return;
    }

    // If Email error is true
    if (emailError || !emailInput) {
      
      if(!passwordError && passwordInput && !emailInput){
        setEmailError(true);
        setFormValid("Correo obligatorio. Por favor ingrese un correo electrónico");
        return;
      }else{
        setEmailError(true);
        if(passwordError){
        setPasswordError(true);
        }
        if(isEmail(emailInput)){
          setFormValid("El correo electrónico es inválido. Por favor ingrese solo correos con el dominio de @gmail.com ");
      return;
        }else{
          setFormValid("Formato de correo inválido. Por favor ingrese un correo electrónico válido");
      return;
        }
      }
    }

    if(!passwordInput){
      setPasswordError(true);
      setFormValid(
        "Contraseña obligatoria. Por favor ingrese una contraseña"
      );
      return;
    }
    // If Password error is true
    if (passwordErrorMax || !passwordInput) {
      setPasswordError(true);
      setFormValid(
        "La contraseña debe ser menor o igual a 16 caracteres."
      );
      return;
    }

    if (passwordErrorMin || !passwordInput) {
      setPasswordError(true);
      setFormValid(
        "La contraseña debe ser mayor o igual a 8 caracteres."
      );
      return;
    }

    setFormValid(null);

    //Show Successfull Submittion
    const miToken=localStorage.getItem('token');
    if(miToken!=undefined){
      showConfirmationModal();
      setSuccess("Inicio de sesión realizado exitosamente"); 
    }else{
      setPasswordError(true);
      setFormValid("Contraseña inválida. Por favor intente nuevamente");
    }
   
   };


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
      console.log('acaaaaaaaaaaaaaaa',valoresToken.username)
      //console.log(valoresToken.email);
      console.log(valoresToken.rol);
      localStorage.setItem('email', JSON.stringify(valoresToken.email));
      localStorage.setItem('rol', JSON.stringify(valoresToken.rol));
      localStorage.setItem('username', JSON.stringify(valoresToken.username));
      console.log('USernameeeeeeeeeeeeeee:',valoresToken.username);
      localStorage.setItem('password', passwordInput)
      const user = { username: valoresToken.email, role: valoresToken.rol, token: token};
      console.log('Inicio de sesión como:', valoresToken.rol );
    }
  }, [token]);

  const submitYlogin = () => {
    try {
      handleLogin()
        .then(() => {
          // La función handleSubmit se ejecutará solo después de que handleLogin se haya completado
          handleSubmit();
          if (rememberMe) {
            localStorage.setItem('emailSave', JSON.stringify(emailInput));
          }
          console.log('ESTADO ACTUAL DEL TOKEN', token);
        })
        .catch(error => {
          console.error('Error en submitYlogin:', error);
        });
    } catch (error) {
      console.error('Error en submitYlogin:', error);
    }
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
          InputProps={{}}
          size="small"
         
          onBlur={handleEmail}
          /*onChange={(e) => setUsername(e.target.value)} */
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
            /*onChange={(e) => setPassword(e.target.value)}*/
            onChange={(event) => {
              setPasswordInput(event.target.value)
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

      <div style={{ marginTop: "15px" }}>
      
        <Button
          id="botonLogin"
          variant="contained"
          fullWidth
          startIcon={<LoginIcon />}
          onClick={submitYlogin}
          style={{ textTransform: 'capitalize',backgroundColor:"#66072c"  }}
        >
          Iniciar sesión
        </Button>
      
      </div>

      
      </div>
<div className="intenta">
      {/* Show Form Error if any */}
      {formValid && (
        <Stack sx={{  paddingTop: "10px" }} >
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