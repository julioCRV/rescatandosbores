import React, { useState } from 'react';

const BotonConContador = () => {
  const [intentos, setIntentos] = useState(0);
  const [bloqueado, setBloqueado] = useState(false);

  const handleClick = () => {
    if (!bloqueado) {
      // Incrementa el número de intentos
      setIntentos((prevIntentos) => prevIntentos + 1);

      if (intentos === 2) {
        // Si se han realizado tres intentos, bloquea el botón
        setBloqueado(true);
      }

      // Aquí puedes agregar tu lógica para el clic del botón
      // Puedes realizar la lógica de validación aquí

      // Ejemplo simple de mensaje en la consola
      console.log('Haciendo algo en el clic del botón');
    }
  };

  return (
    <div>
      <button onClick={handleClick} disabled={bloqueado}>
        {bloqueado ? 'Botón Bloqueado' : 'Hacer algo'}
      </button>
    </div>
  );
};

export default BotonConContador;
