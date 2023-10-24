import React, { useEffect, useState } from 'react';
import { Button, Modal, message, Space,notification, Tooltip, Popover } from 'antd';
import {DeleteOutlined,  ExclamationCircleOutlined, CheckCircleOutlined, InfoCircleOutlined} from '@ant-design/icons'
import './ModalConfirmacion.css'
import { Link } from 'react-router-dom';

export const ModalConfirmation = ({id, nombre}) => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState(``);
    const [messageApi, contextHolder] = message.useMessage();
    const showModal = () => {
      setOpen(true);
    };
    
    useEffect(() => {
      setModalText(`Esta seguro que desea eliminar ${nombre}`)
    }, [id]);
    const handleOk = async () => {
      setModalText('Eliminando platillo... ');
      setConfirmLoading(true);
      try {
        // Realizar la solicitud fetch aquí (reemplaza la URL con tu endpoint)
        const response = await fetch(`http://18.116.106.247:3000/eliminarPlatillo/${id}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          setOpen(false);
          setConfirmLoading(false);
          mostrarNotificacionExito();
        } else {
          mostrarNotificacionError("Error de conexion");
        }
      } catch (error) {
          mostrarNotificacionError(error);
      } finally {
        setOpen(false);
        setConfirmLoading(false);
        setModalText('¿Esta seguro de eliminar el platillo tradicional?')
      }
    };
  
    const handleCancel = () => {
      console.log('Clicked cancel button');
      setOpen(false);
    };
    const mostrarNotificacionExito = () => {
      notification.success({
        message: 'Eliminación Exitosa',
        description: 'El elemento ha sido eliminado correctamente.',
        icon: <ExclamationCircleOutlined style={{ color: '#52c41a', }} />,
        duration:1,
        style: {
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        },
      });
    };
    const mostrarNotificacionError = (e) => {
      notification.error({
        message: 'Error al eliminar',
        description: `Lo sentimos, esta receta no se pudo eliminar, por ${e}, vuelva a intentarlo`,
        icon: <InfoCircleOutlined style={{ color: 'red', }} />,
        duration:3,
        style: {
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        },

      });
    };
    const content = (<span>Eliminar</span>)
    const overlayStyle = {
      padding: '0px', // Personaliza el espaciado aquí
      margin: '0px'
    };
  return (
    <>

      <Popover  title="Eliminar" trigger="hover" overlayStyle={overlayStyle}>
        <Button type="primary" onClick={showModal} danger>
          <DeleteOutlined />
        </Button>
      </Popover>
      <Modal

        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[
          <Button onClick={handleCancel} style={{height: '45px', width:'225px'}}>Cancelar</Button>,
          <Link to="/mostrar-platillo/page/1"><Button onClick={handleOk} danger type='primary' style={{height:'45px', width:'225px'}}>Eliminar</Button></Link>,
        ]}
      >
        <ExclamationCircleOutlined style={{ color: 'red' }} />
        <p>{modalText}</p>
      </Modal>
    </>
  )
}

