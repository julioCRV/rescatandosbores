import React, { useState, useEffect } from 'react';

const Prueba = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // Recuperar el token almacenado
      const token = localStorage.getItem('token');

      // URL de la ruta protegida
      
      const rutaProtegidaURL = 'http://18.116.106.247:3000/all';

      // Configuración de la solicitud
      const requestOptions = {
        method: 'GET',  // Método de la solicitud (puedes ajustar según tu API)
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
      };

      try {
        const response = await fetch(rutaProtegidaURL, requestOptions);

        if (response.ok) {
          const responseData = await response.json();
          setData(responseData);
        } else if (response.status === 401) {
          setError('Error de autenticación: Token inválido o expirado');
          // Puedes redirigir al usuario a la página de inicio de sesión u tomar otra acción.
        } else {
          setError(`Error en la solicitud: ${response.statusText}`);
        }
      } catch (error) {
        setError(`Error en la solicitud: ${error.message}`);
      }
    };

    fetchData();
  }, []); // El segundo parámetro [] indica que este efecto se ejecutará solo una vez, equivalente al componentDidMount en una clase.

  return (
    <div>
      {data && (
        <div>
          <h2>Respuesta del servidor:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}

      {error && (
        <div>
          <h2>Error:</h2>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default Prueba;
