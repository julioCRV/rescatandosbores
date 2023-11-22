import React, { useState } from 'react';
import { Modal, Button, Result } from 'antd';
import { Link } from 'react-router-dom';
import { LogoutOutlined } from '@ant-design/icons';
import './HeaderNav.css'

const ButtonLogout = () => {
  const [visible, setVisible] = useState(false);

  const removeToken = () => {
    const token = localStorage.getItem('token');
    //console.log("Antes de eliminar:", localStorage.getItem("token"), localStorage.getItem("email"));
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('rol ');
    localStorage.removeItem('email');
    const recordar = localStorage.getItem('recordar');
    if (recordar == 'no') {
      localStorage.removeItem('email');
    }
    console.log("Después de eliminar:", localStorage.getItem("token"), localStorage.getItem("email"));
  };

  const showConfirmationModal = () => {

    Modal.confirm({
      title: '¿Estás seguro que quieres cerrar sesión?',
      okText: 'Salir',
      cancelText: 'Cancelar',

      onOk() {
        showModal();
        removeToken();
      },
      onCancel() {

      },
    });
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
    if (location.pathname === '/') {
      window.location.reload();
    }
    //
  }

  return (
    <div>


      <Button className={`${'menu'}`} style={{ width: '135%', marginLeft: '-20px' }} onClick={showConfirmationModal}><LogoutOutlined />Cerrar Sesión</Button>

      <Modal
        title="Éxito al Cerrar Sesión"
        visible={visible}
        onOk={handleOk}
        onCancel={handleOk}
        footer={[
          <Link to='/'>
            <Button key="ok" type="primary" onClick={handleOk}>
              OK
            </Button>
          </Link>,
        ]}
      >
        <Result
          icon={<LogoutOutlined style={{ fontSize: '50px', color: '#52c41a' }} />}
          title="Cierre de Sesión Exitoso"
          subTitle="Has cerrado sesión correctamente. ¡Hasta luego!"
        />
      </Modal>
    </div>
  );
};


export default ButtonLogout;
