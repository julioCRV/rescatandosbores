import { Form, Input, Button, message, Typography, Upload, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './EditarPlatillo.css';
import { useParams } from 'react-router-dom';
const { Title } = Typography;

const { TextArea } = Input;

export const EditarPlatillo = () =>{
  const [imageUploaded, setImageUploaded] = useState(false);
  const [videoUploaded, setVideoUploaded] = useState(false);
  const [text, setText] = useState('');
  const [text2, setText2] = useState('');
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [videoModalVisible, setVideoModalVisible] = useState(false);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);

  const {id} = useParams();
  const [platilloData, setPlatilloData] = useState({
    nombre: '',
    descripcion: '',
    video: '',
    imagen: '',
    identificador: '',
  });

  useEffect(() => {
    console.log('realizando llamada');
    axios.get(`http://18.116.106.247:3000/mostrarPlatillos/page/${id}`)
      .then((response) => {
        console.log(response.data.respuesta);
        const platillo = response.data.respuesta;
        setText(platillo.nombre)
        setText2(platillo.descripcion)
        setPlatilloData({
          nombre: platillo.nombre,
          descripcion: platillo.descripcion,
          imagen: platillo.imagen,
          identificador: platillo.id,
          video: platillo.video,
        });

      })
      .catch((error) => {
        console.error('Error al obtener el platillo:', error);
      });
  }, [id]);
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
  };

  const verificarImagen = {
    beforeUpload: (file) => {

      let extension = file.name.split('.');
      extension = extension[extension.length-1].toLowerCase();
      if (extension!='jpeg'&&extension!='jpg'&&extension!='png') {
        message.error('Solo se permite archivos jpg y png.');
        return true;
      } 
      const tam = 6*1024*1024; 
      if (file.size>tam) {
        setImageModalVisible(true);
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
      }
      const tam = 150*1024*1024; 
      if(file.size>tam) {
        setVideoModalVisible(true);
      } else {
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
};


  return (
    <Form onFinish={onFinish}>
    <div className="titulo-formato">Editar Platillo</div  >

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
          { pattern: /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s]*$/, message: 'Solo caracteres alfanuméricos son permitidos en el título' },
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
          />
          <div style={{ position: 'absolute', top: 0, right: 0, padding: '8px', color: 'gray' }}>
            {text.length} / 50
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
        <Upload {...verificarImagen} maxCount={1}>
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
            //maxLength={500} // Limitar a 500 caracteres
          />
          <div style={{ position: 'absolute', top: 0, right: 0, padding: '8px', color: 'gray' }}>
            {text2.length} / 500
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
        <Upload {...verificarVideo} maxCount={1}>
          <Button style={buttonStyle} icon={<UploadOutlined /> }className='sms'>Subir Video</Button>
          {videoUploaded}
          {!videoUploaded && <span className='mensaje-transparenteV'>No se ha seleccionado ningún video</span>}
        </Upload>
      </Form.Item>

      <Form.Item className='componente-limite'
        label={<span></span>}
        labelCol={{span: 6}}
        wrapperCol={{ span: 20 }} // Offset para mover el botón
      >
        <Button type="primary" htmlType="submit" className='button' style={{ marginRight: '20%', backgroundColor: '#7D0633' }}>
          Editar 
        </Button>
        <Button type="primary" htmlType="button" className='button' style={{backgroundColor: '#828282'}} onClick={showModal}>
          Cancelar
        </Button>
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
          <Link to='/mostrar-platillo/page/1' key="cancel" className='button-link' onClick={() => setCancelModalVisible(false)}>
           OK
          </Link>,
          <Button key="ok" className='button-link' onClick={() => setCancelModalVisible(false)}>
          Cancelar
          </Button>,
        ]}
      >
        Al cancelar, se perdera toda la informacion que no se haya registrado.
      </Modal>
    </Form>
    
  );
}
export default EditarPlatillo;
