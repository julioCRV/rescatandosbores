import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Paper from "@mui/material/Paper";
import {
  TextField,
  Button,
  Alert,
  Stack,
} from "@mui/material";

const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

const uri = 'http://18.116.106.247:3000/';

export default function PasswordRecovery() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [formError, setFormError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleEmailChange = (event) => {
    const newEmail = event.target.value.trim();
    setEmail(newEmail);
    setEmailError(!isEmail(newEmail));
    setFormError('');
    setSuccessMessage('');
};

  const handleSubmit = async () => {
    if (!isEmail(email)) {
      setFormError("Por favor, ingrese un correo electrónico válido.");
      return;
    }

    // Lógica para enviar la solicitud de recuperación de contraseña al servidor
    try {
      const response = await fetch(uri+'recuperarContra', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }

      // Limpiar el formulario y mostrar el mensaje de éxito
      setEmail('');
      setSuccessMessage("Correo enviado con éxito a: " + email);
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setFormError("Hubo un error al procesar la solicitud. Por favor, inténtelo de nuevo.");
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
            <h3>¿Olvidaste tu contraseña?</h3>
            <h3>Introduzca su dirección de correo electrónico y le enviaremos un correo electrónico con instrucciones para restablecer su contraseña.</h3>
            <TextField
              label="Correo electrónico"
              fullWidth
              error={emailError}
              variant="standard"
              sx={{ width: "100%" }}
              value={email}
              onChange={handleEmailChange}
            />
          </div>

          <div style={{ marginTop: "30px" }}>
            <Button
              variant="contained"
              fullWidth
              onClick={handleSubmit}
              style={{ textTransform: 'capitalize', backgroundColor: "#66072c" }}
            >
              Enviar correo electrónico
            </Button>
            <div align="center" style={{ marginTop: "15px" }}>
              <Link to='/iniciar-sesion'>
                Volver a Inicio de Sesión
              </Link>
            </div>
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