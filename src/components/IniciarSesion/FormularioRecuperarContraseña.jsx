import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import { Modal, Result } from 'antd';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

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


const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

const uri = 'http://18.116.106.247:3000/';

export default function PasswordRecovery() {
  const [formError, setFormError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [formValid, setFormValid] = useState();

  const [showPassword, setShowPassword] = React.useState(false);
  const [passwordInput, setPasswordInput] = useState();

  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMax, setPasswordErrorMax] = useState(false);
  const [passwordErrorMin, setPasswordErrorMin] = useState(false); 

  const [passwordErrorSecond, setPasswordErrorSecond] = useState(false);
  const [showPasswordSecond, setShowPasswordSecond] = React.useState(false);
  const [passwordInputSecond, setPasswordInputSecond] = useState();
  const [passwordErrorMaxSecond, setPasswordErrorMaxSecond] = useState(false);
  const [passwordErrorMinSecond, setPasswordErrorMinSecond] = useState(false); 

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
      setFormValid(
        "Contraseña obligatoria. Por favor ingrese una contraseña"
      );
      return;
    }

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
  };

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
        </Paper>
      </div>
    </div>
  );
}