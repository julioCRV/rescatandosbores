import { Form, Input, Button, message, Typography, Upload, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './FormularioRegistro.css';

const { Title } = Typography;

const { TextArea } = Input;

function MyForm() {
  const [imageUploaded, setImageUploaded] = useState(false);
  const [videoUploaded, setVideoUploaded] = useState(false);
  const [text, setText] = useState('');
  const [text2, setText2] = useState('');
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [videoModalVisible, setVideoModalVisible] = useState(false);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const token=localStorage.getItem('token');

  const showModal = () => {
    setCancelModalVisible(true);
  };
  const cancelOk = () => {
    // aqui viene el redireccionamiento
    setCancelModalVisible(false);
  };

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
  };

  const handleTextChange2 = (e) => {
    const newText2 = e.target.value;
    setText2(newText2);
    if (newText2.length <= 501){
      setText2(newText2);
    }
  };

  const verificarImagen = {
    beforeUpload: (file) => {

      let extension = file.name.split('.');
      extension = extension[extension.length-1].toLowerCase();
      if (extension!='jpg'&&extension!='png') {
      message.error('Solo se permite archivos jpg y png.');
        return true;
      }  else if (file.size > 6000000) {
        message.error('El tamaño de la imagen no puede exceder 6MB');
      } else if (file.size < 100000) {
        message.error('El tamaño de la imagen no puede ser menor a 100 KB');
      } else {
        setImageUploaded(true);
        message.success(`${file.name} subido correctamente.`);
        return false;
      }
      return true;
    },
    onRemove: () => {
      // Lógica para manejar la eliminación de la imagen
      setImageUploaded(false);
      message.warning('Imagen eliminada.');
    },
  };

  const verificarVideo = {
    beforeUpload: (file) => {
      let extension = file.name.split('.');
      extension = extension[extension.length-1].toLowerCase();
      if (extension!='mp4') {
        message.error('Solo permite archivos mp4');
        return true;
      }else if(file.size > 900000000) {
        message.error('El tamaño del video no puede exceder 900MB');
      } else if(file.size < 10000000){
        message.error('El tamaño del video no puede ser menor de 10MB');
      }else{
        setVideoUploaded(true);
        message.success(`${file.name} subido correctamente.`);
        return false;
      }
      return true;
    },
    onRemove: () => {
      // Lógica para manejar la eliminación del video
      setVideoUploaded(false);
      message.warning('Video eliminado.');
    },
  };

  const buttonStyle = {
    width: '150px', // Tamaño en píxeles
    height: '30px', // Tamaño en píxeles
  };

  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`,
    }
  };

const onFinish = async (values) => {
  console.log('Finaliza el formulario');
  console.log(values);
  try {
    const formData = new FormData();
    formData.append('nombre', values.titulo);
    formData.append('descripcion', values.descripcion);

    // Obtén los archivos de imagen y video
    const imagenFile = values.imagen.file;
    const videoFile = values.video.file;

    // Agrega los archivos al FormData con su nombre y tipo
    formData.append('imagen', new Blob([imagenFile], { type: imagenFile.type }), imagenFile.name);
    formData.append('video', new Blob([videoFile], { type: videoFile.type }), videoFile.name);

    console.log('Realizando llamada');
    const response = await axios.post('http://18.116.106.247:3000/registrarPlatillo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `${token}`,
      },
    });
    console.log('Llega la llamada');
    console.log(response);
    if (response.status === 200) {
      message.success('Platillo registrado correctamente');
      
    } else {
      message.error('Error al registrar el platillo');
    }
  } catch (err) {
    message.error('Error con el registro');
    console.log(err);
  }
  setText('');
  setText2('');
  verificarImagen.onRemove();
  verificarVideo.onRemove();
  setImageModalVisible('');
  setVideoModalVisible('');
  setImageUploaded('');
  setVideoUploaded('');
};

  return (
    <div>
    <div className="titulo-formato">Registrar Platillo</div  >
    <div className='formRegistrar'>
    <Form onFinish={onFinish}>

      <Form.Item className='componente-limite'
        label={ 
            <span className='item-txt'>Título:</span>
        }
        name="titulo"
        colon={false}
        rules={[
          { required: true, message: 'Ingresa el título del platillo' },
          { max: 50, message: 'El título no puede tener más de 50 caracteres' },
          { min: 6, message: 'El título debe tener al menos 6 caracteres' },
          { pattern: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]*$/, message: 'Solo son permitidos caracteres alfabeticos en el título' }
        ]}
        labelCol={{ span: 6 }} // Configura el ancho de la etiqueta
        wrapperCol={{ span: 16 }} // Configura el ancho del campo de entrada
      >
        <div style={{ position: 'relative' }}>
          <Input
            placeholder="Ingrese el título del platillo"
            autoComplete="off"
            onChange={handleTextChange}
            value={text}
            maxLength={51}
          />
          <div style={{ position: 'relative', top: 0, right: 0, padding: '8px', color: 'gray' }}>
            {/*Caracteres disponibles: {50-text.length}*/}
            { 50-text.length >= 0 ? (50-text.length < 10 ? "0"+(50-text.length) : 50-text.length)+"/"+50 : "00/"+50}
          </div>
        </div>
      </Form.Item>

      <Form.Item className='componente-limite'
        label={
            <span className='item-txt' onClick={(e)=>{e.preventDefault()}}>Imagen:</span>
        }
        name="imagen"
        colon={false}
        rules={[{ required: true, message: 'No se ha subido ninguna imagen' }]}
        labelCol={{ span: 6 }} // Configura el ancho de la etiqueta
        wrapperCol={{ span: 24 }} // Configura el ancho del campo de entrada
      >
        <Upload {...verificarImagen} maxCount={1} accept='image/*'> 
          <Button style={buttonStyle} icon={<UploadOutlined />} className='sms'>Subir Imagen</Button>
          {imageUploaded }
          {!imageUploaded && <span className='mensaje-transparenteI'> No se ha seleccionado ningún archivo</span>}
        </Upload>
      </Form.Item>

      <Form.Item className='componente-limite'
        label={
          <span className='item-txt'>Descripción:</span>}
        name="descripcion"
        colon={false}
        rules={[
          { required: true, message: 'Ingrese una descripcion' },
          { max: 500, message: 'La descripción no puede tener más de 500 caracteres' },
          { min: 20, message: 'La descripción debe tener al menos 20 caracteres' },
        ]}
        labelCol={{ span: 6 }} // Configura el ancho de la etiqueta
        wrapperCol={{ span: 16 }} // Configura el ancho del campo de entrada
      >
        <div style={{ position: 'relative' }}>
          <Input.TextArea
            placeholder="Ingrese una descripción del platillo"
            autoComplete="off"
            autoSize={{ minRows: 3, maxRows: 6 }}
            onChange={handleTextChange2}
            value={text2}
            maxLength={500} // Limitar a 500 caracteres
          />
          <div style={{ position: 'relative', top: 0, right: 0, padding: '8px', color: 'gray' }}>
           {/*Caracteres disponibles: {500-text2.length}*/}
          {500-text2.length >= 0 ? (500-text2.length > 9 && 500-text2.length < 100? "0"+(500-text2.length) : 500-text2.length >= 0 && 500-text2.length < 10? "00"+(500-text2.length) : 500-text2.length)+"/"+500 : "000"+"/"+500}
      </div>
        </div>
      </Form.Item>
      
      <Form.Item className='componente-limite'
        label={
          <span className='item-txt' onClick={(e)=>{e.preventDefault()}}>Video:</span>}
        name="video"
        colon={false}
        rules={[{ required: true, message: 'No se ha subido ningun video' }]}
        labelCol={{ span: 6 }} // Configura el ancho de la etiqueta
        wrapperCol={{ span: 24 }} // Configura el ancho del campo de entrada
      >
        <Upload {...verificarVideo} maxCount={1} accept='video/mp4' >
          <Button style={buttonStyle} icon={<UploadOutlined /> }className='sms'>Subir Video</Button>
          {videoUploaded}
          {!videoUploaded && <span className='mensaje-transparenteV'>No se ha seleccionado ningún video</span>}
        </Upload>
      </Form.Item>

      <Form.Item className='componente-limite'
        labelCol={{span: 6}}
        wrapperCol={{ span: 21 }} // Offset para mover el botón
      >
        <div className='contBotones'>
        <Button type="primary" htmlType="submit" className='button' style={{backgroundColor: '#7D0633' }}>
          Registrar
        </Button>
        <Button type="primary" htmlType="button" className='button' style={{backgroundColor: '#828282'}} onClick={showModal}>
          Cancelar
        </Button>
        </div>
      </Form.Item>

      <Modal
        title="Excede el límite de tamaño"
        visible={imageModalVisible}
        onCancel={() => setImageModalVisible(false)}
        footer={[
        ]}
      >
        El archivo de imagen excede el límite de tamaño permitido (6MB).
      </Modal>

      <Modal
        title="Excede el límite de tamaño"
        visible={videoModalVisible}
        onCancel={() => setVideoModalVisible(false)}
        footer={[
        ]}
      >
        El archivo de video excede el límite de tamaño permitido (150MB).
      </Modal>
      <Modal
        title="¿Está seguro de eliminar el registro?"
        visible={cancelModalVisible}
        onCancel={() => setCancelModalVisible(false)}
        footer={[
          <Link to='/mostrar-platillo/page/1' key="cancel" onClick={() => setCancelModalVisible(false)}>
            <Button key="ok" className='button-link' onClick={() => setCancelModalVisible(false)}>
          Ok
          </Button>
          </Link>,
          <Button key="ok" className='button-link' onClick={() => setCancelModalVisible(false)}>
          Cancelar
          </Button>,
        ]}
      >
        Al cancelar, se perdera toda la informacion que no se haya registrado.
      </Modal>
    </Form>
    </div>
    </div>
  );
}

export default MyForm;