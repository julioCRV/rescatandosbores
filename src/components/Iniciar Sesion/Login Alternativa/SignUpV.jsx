import React, { useState, useEffect } from "react";

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

// Validations

// Email Validation
const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

export default function Login() {
  const [showPassword, setShowPassword] = React.useState(false);

  //Inputs
  const [usernameInput, setUsernameInput] = useState();
  const [emailInput, setEmailInput] = useState();
  const [passwordInput, setPasswordInput] = useState();

  // Inputs Errors
  const [usernameError, setUsernameError] = useState(false);
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

    // IF username error is true
    if (usernameError || !usernameInput) {
      setFormValid(
        "El nombre de usuario se establece entre 5 y 15 caracteres. Por favor vuelva a ingresar"
      );
      return;
    }

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
    setSuccess("Formulario enviado exitosamente");
  };

  //ENVIAR FORMULARIO 
  const [token, setToken] = useState();

  const handleLogin = async () => {
    const url = 'http://18.116.106.247:3000/registro';
    const datos = new FormData();
    datos.append("ident", 25);
    datos.append("usuario", usernameInput);
    datos.append("correo", emailInput);
    datos.append("contrasenia", passwordInput);

    console.log(datos.get("ident"));
    console.log(datos.get("usuario"));
    console.log(datos.get("correo"));
    console.log(datos.get("contrasenia"));
    const credentials = {
      id: datos.get("ident"),
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
      console.log(valoresToken);
      //console.log(valoresToken.email);
      //console.log(valoresToken.rol);
      localStorage.setItem('email', JSON.stringify(valoresToken.email));
      const user = { username: valoresToken.email, role: valoresToken.rol, token: token};
      handleLogin(user);
      if (valoresToken.rol === 'administrador') {
        console.log('Inicio de sesión como Administrador');
      } else if (valoresToken.rol === 'usuario') {
        console.log('Inicio de sesión como Usuario');
      }
    }
  }, [token]);

  const submitYsingup = () => {
    handleSubmit();
    handleLogin();
  };

  return (
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
              setPasswordInput(event.target.value);
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
          style={{ textTransform: 'capitalize',backgroundColor:"#66072c"  }}
        >
          Registrarse
        </Button>
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

    </div>
  );
}