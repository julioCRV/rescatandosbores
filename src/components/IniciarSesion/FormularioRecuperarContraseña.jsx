import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import { Modal, Result } from 'antd';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import {
  TextField,
  Button,
  Alert,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Input,
  Stack,
} from "@mui/material";
import { faCompassDrafting } from "@fortawesome/free-solid-svg-icons";


const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

const uri = 'http://18.116.106.247:3000/';

export default function PasswordRecovery() {
  const {tokenCodificado} = useParams();
  const token = atob(tokenCodificado);
  const [formError, setFormError] = useState('');
  const [formErrorSecond, setFormErrorSecond] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [formValid, setFormValid] = useState();
  const [success, setSuccess] = useState();

  const [showPassword, setShowPassword] = React.useState(false);
  const [passwordInput, setPasswordInput] = useState();
  const [visible, setVisible] = useState(false);

  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMax, setPasswordErrorMax] = useState(false);
  const [passwordErrorMin, setPasswordErrorMin] = useState(false); 

  const [passwordErrorSecond, setPasswordErrorSecond] = useState(false);
  const [showPasswordSecond, setShowPasswordSecond] = React.useState(false);
  const [passwordInputSecond, setPasswordInputSecond] = useState();
  const [passwordErrorMaxSecond, setPasswordErrorMaxSecond] = useState(false);
  const [passwordErrorMinSecond, setPasswordErrorMinSecond] = useState(false); 

  function validarContraseña(contraseña) {
   
    handlePassword();
    console.log('acaaaaaaaaaaa', passwordError, passwordErrorMax, passwordErrorMin)
    // Verificar si contiene al menos una letra mayúscula
    const tieneMayuscula = /[A-Z]/.test(contraseña);

    // Verificar si contiene al menos un carácter especial
    const tieneCaracterEspecial = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(contraseña);

    // Verificar si contiene al menos un número
    const tieneNumero = /\d/.test(contraseña);

    // Verificar si cumple con todos los requisitos
    // console.log(passwordError, 'max: ', passwordErrorMax, 'min: ', passwordErrorMin)
    if (passwordError || passwordErrorMax || passwordErrorMin) {
      return false;
    } else {
      return tieneMayuscula && tieneCaracterEspecial && tieneNumero;
    }
  }

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


  const handlePasswordSecond = () => {
    if (
      !passwordInputSecond ||
      passwordInputSecond.length > 16
    ) {
      setPasswordErrorSecond(true);
      setPasswordErrorMaxSecond(true);
      return;
    }
    setPasswordErrorSecond(false);
    setPasswordErrorMaxSecond(false);
    if (
      !passwordInputSecond ||
      passwordInputSecond.length < 8 
    ) {
      setPasswordErrorSecond(true);
      setPasswordErrorMinSecond(true);
      return;
    }
    setPasswordErrorSecond(false);
    setPasswordErrorMinSecond(false);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPasswordSecond = () => setShowPasswordSecond((show) => !show);
  const handleMouseDownPasswordSecond = (event) => {
    event.preventDefault();
  };

  const handleEmailChange = (event) => {
    const newEmail = event.target.value.trim();
    setEmail(newEmail);
    setEmailError(!isEmail(newEmail));
    setFormError('');
    setSuccessMessage('');
};

  const handleSubmit = async () => {
    if(!passwordInput){
      setPasswordError(true);
      setFormError(
        "Contraseña obligatoria. Por favor ingrese una contraseña"
      );
      return;
    }

     if (passwordErrorMax || !passwordInput) {
      setPasswordError(true);
      setFormError(
        "La contraseña debe ser menor o igual a 16 caracteres."
      );
      return;
    }
  
    if (passwordErrorMin || !passwordInput) {
      setPasswordError(true);
      setFormError(
        "La contraseña debe ser mayor o igual a 8 caracteres."
      );
      return;
    }

    if(!passwordInputSecond){
        setPasswordErrorSecond(true);
        setFormErrorSecond(
          "Confirmar contraseña obligatoria. Por favor ingrese confirmar contraseña"
        );
        return;
      }
  
       if (passwordErrorMaxSecond || !passwordInputSecond) {
        setPasswordError(true);
        setFormErrorSecond(
          "Confirmar contraseña debe ser menor o igual a 16 caracteres."
        );
        return;
      }
    
      if (passwordErrorMinSecond|| !passwordInputSecond) {
        setPasswordErrorSecond(true);
        setFormErrorSecond(
          "Confirmar contraseña debe ser mayor o igual a 8 caracteres."
        );
          return;
        }

        if (passwordInput!==passwordInputSecond) {
          setPasswordError(true);
          setFormError(
            "Las contraseñas no coinciden."
          );
          return;
        }   
    
    // VALIDADOR FINAL;
       if (!validarContraseña(passwordInput)) {
       	setPasswordError(true); 
       	setFormError(
       	 "La contrasenia debe tener al menos 1 mayuscula, 1 caracter especial y 1 numero"
       	 );
    	   return
    }
        

    

    console.log(token);
    console.log(passwordInput);
    try {
      const response = await fetch(uri+'cambiarContra', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
        body: JSON.stringify({ password: passwordInput }),
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }

    const miToken = localStorage.getItem('token'); 
    console.log(miToken)
    if (token != undefined) {
      showConfirmationModal();
      setSuccess("Cambio de contraseña exitosamente");
    } else {
      setPasswordError(true);
      setFormValid("Contraseña inválida. Por favor intente nuevamente");
    } 

      setPasswordError(false);
      setFormError('');

      setPasswordInput('');
      setPasswordInputSecond('');
      setSuccessMessage('Contraseña actualizada correctamente');
      
      
     
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setFormError("Hubo un error al procesar la solicitud. Por favor, inténtelo de nuevo.");
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
  }

  return (
    <div className='contenedor-Div'>
      <div>
        <Paper elevation={3} style={{ backgroundColor: "#cfb5aa", boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.6)" }} className='contenedorLogin' >
          <div align="center">
            <div>
              <img class="imgA" src="/src/assets/logo.png" alt="logo" />
            </div>
            <h3>Reestablecer contraseña</h3>
            <div style={{marginTop:"5px"}}>
              <FormControl sx={{width:"100%"}} variant="standard" >
                  <InputLabel
                    error={passwordError}
                    htmlFor="standard-adornment-password"
                  >
                    Contraseña
                  </InputLabel>
                  <Input
                    error={passwordError}
                    onBlur={handlePassword}
                    id = "standard-adornment-password"
                    type={showPassword ? "text": "password"}
                    onChange={(event)=>{
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
                            {showPassword? <VisibilityOff/>:<Visibility/>}
                         </IconButton>
                         </InputAdornment>
              }
              />
              </FormControl>
            </div>
            {/* input confirmar contraseña */}
            <div style={{marginTop:"5px"}}>
              <FormControl sx={{width:"100%"}} variant="standard" >
                  <InputLabel
                    error={passwordErrorSecond}
                    htmlFor="standard-adornment-password"
                  >
                    Confirmar Contraseña
                  </InputLabel>
                  <Input
                    error={passwordErrorSecond}
                    onBlur={handlePasswordSecond}
                    id = "standard-adornment-password"
                    type={showPasswordSecond ? "text": "password"}
                    onChange={(event)=>{
                      setPasswordInputSecond(event.target.value)
                    }}
                    value={passwordInputSecond}
                    endAdornment={
                         <InputAdornment position="end">
                         <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPasswordSecond}
                              onMouseDown={handleMouseDownPasswordSecond}
                         >
                            {showPasswordSecond? <VisibilityOff/>:<Visibility/>}
                         </IconButton>
                         </InputAdornment>
              }
              />
              </FormControl>
            </div>
          </div>

          <div style={{ marginTop: "30px" }}>
            <Button
              variant="contained"
              fullWidth
              onClick={handleSubmit}
              style={{ textTransform: 'capitalize', backgroundColor: "#66072c" ,marginTop:"15px"}}
            >
              Reestablecer Contraseña
            </Button>
          </div>
            
        

          <div className="intenta">
        {/* Show Form Error if any */}
        {formValid && (
          <Stack sx={{ paddingTop: "10px" }} >
            <Alert severity="error" size="small">
              {formValid}
            </Alert>
          </Stack>
        )}</div>
          

          {(formError || successMessage) && (
            <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
              {formError && (
                <Alert severity="error" size="small">
                  {formError}
                </Alert>
              )}
              {successMessage && (
                <Alert severity="success" size="small">
                  {successMessage}
                </Alert>
              )}
            </Stack>
          )}

        {(formErrorSecond || successMessage) && (
            <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
              {formErrorSecond && (
                <Alert severity="error" size="small">
                  {formErrorSecond}
                </Alert>
              )}
              {successMessage && (
                <Alert severity="success" size="small">
                  {successMessage}
                </Alert>
              )}
            </Stack>
          )}

         {success && (
        <Modal
          visible={visible}
          closable={false}
          onOk={handleOk}
          onCancel={handleOk}
          width={400}
          style={{ top: '50%', transform: 'translateY(-50%)' }} 
          footer={[
            <Link to='/Iniciar-sesion' key="ok">
              <Button type="primary" onClick={handleOk}>
                OK
              </Button>
            </Link>,
          ]}
        >
          <Result
            status="success"
            title={<div style={{ fontSize: '20px' }}>Cambio de contraseña  exitosamente</div>}
          />
        </Modal>
      )}
        </Paper>
      </div>
    </div>
  );
}