// RegistroPlatillo.js
import React, { useState } from 'react';
import { Input, Button, Form } from 'antd';

function RegistroPlatillo() {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar los datos del platillo a un servidor o realizar alguna acción con ellos
    console.log('Datos del platillo:', { nombre, descripcion });
  };

  return (
    <div>
      <h2>Registrar Platillo</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Item label="Nombre del Platillo">
          <Input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre del platillo"
          />
        </Form.Item>
        <Form.Item label="Descripción">
          <Input.TextArea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Descripción del platillo"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Registrar Platillo
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default RegistroPlatillo;
