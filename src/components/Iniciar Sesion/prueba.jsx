import React, { useState } from 'react';
import { Modal, Button, Result } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

const LogoutSuccessModal = () => {
  const [isVisible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
    // Aquí puedes agregar lógica adicional después de cerrar el modal, como redirigir a otra página, etc.
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Cerrar Sesión
      </Button>
      <Modal
        title="Éxito al Cerrar Sesión"
        visible={isVisible}
        onOk={handleOk}
        onCancel={handleOk}
        footer={[
          <Button key="ok" type="primary" onClick={handleOk}>
            OK
          </Button>,
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

export default LogoutSuccessModal;
