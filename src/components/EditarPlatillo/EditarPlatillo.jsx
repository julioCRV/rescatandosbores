
import { Form, Input, Button, message, Typography, Upload, Modal, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Link} from 'react-router-dom';
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
  //Implementados por mi
  const [bandTitulo, setBandTitulo] = useState(false);
  const [bandDescripcion, setBandDescripcion] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {id} = useParams(); //Obtengo el id con el useParams

  const [platilloData, setPlatilloData] = useState({
    nombre: '',
    descripcion: '',
    video: '',
    imagen: '',
    identificador: '',
  });


  //El useEffect se ejecuta cuando ni bien la pagina carga
  useEffect(() => {
    setBandTitulo(false); //Bandera que me ayudan a evitar que me pidan de entrada titulo cuando este ya esta definido por default
    setBandDescripcion(false); //Bandera que me ayudan a evitar que me pidan de entrada descripcion cuando este ya esta definido por default
    //Obtengo el platillo con el id indicado
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
    setBandTitulo(true);
    const newText = e.target.value;
    setText(newText);
  };

  const handleTextChange2 = (e) => {
    setBandDescripcion(true);
    const newText2 = e.target.value;
    setText2(newText2);
  };

  const verificarImagen = {
    beforeUpload: (file) => {

      let extension = file.name.split('.');
      extension = extension[extension.length-1].toLowerCase();
      if (extension!='jpg' && extension!='png') {
        message.error('Formato de imágen no válido');
        return true;
      }else if (file.size > 6000000) {
        message.error('El tamaño de la imagen no puede exceder 6MB');
      }else if(file.size < 100000){
        message.error('El tamaño de la imagen no puede ser menor a 100 KB');
      }else {
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
      if (extension != 'mp4') {
        message.error('Solo permite archivos mp4');
        return true;
      }
      else if(file.size > 900000000) {
        message.error('El tamaño del video no puede exceder 900MB');
      } else if(file.size < 5000000){
        message.error('El tamaño del video no puede ser menor de 10MB');
      }else {
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


  //Se ejecuta cuando se da a actualizar
const onFinish = async (values) => {
  setIsLoading(true); //Activa la interfaz de carga
  try {
    //Cargo los datos de los inputs para poder subirlo a la bd
    const formData = new FormData();
    formData.append('nombre', values.titulo ?? text);
    formData.append('descripcion', values.descripcion ?? text2);
    formData.append('id', platilloData.identificador);
    const imagenFile = values.imagen.file;
    const videoFile = values.video.file;
    formData.append('imagen', new Blob([imagenFile], { type: imagenFile.type }), imagenFile.name);
    formData.append('video', new Blob([videoFile], { type: videoFile.type }), videoFile.name);
    console.log(formData);
    console.log('Realizando llamada');
    const response = await axios.put(`http://18.116.106.247:3000/modificarPlatillo/${platilloData.identificador}`,formData,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Llega la llamada');
    console.log(response);
    if (response.status === 200) {
      message.success('Platillo actualizado correctamente');
    } else {
      message.error('Error al actualizar el platillo');
    }
  } catch (err) {
    message.error('Error con la actualizacion');
    console.log(err);
  } finally{
    setIsLoading(false); //Desactiva la interfaz de carga
    
  }
};


  return (
    <div className='form-contenedor'>
    <Form onFinish={onFinish}>
    
    <div className="titulo-formato">Editar Platillo</div  >
    {isLoading  &&  <Spin size='large' className='ant-spin'/>}

{/*       {isLoading && <Spin size="large" style={{ position: 'absolute', top: '50%', left: '50%' }} /> } */} {/* Interfaz de carga */}

      <Form.Item className='componente-limite'
        label={ 
            <span className='item-txt'>Título:</span>
        }
        name="titulo"
        colon={false}
        
        rules = {[
          { required: bandTitulo, message: 'Ingresa el título del platillo'},
          { max: 50, message: 'El título no puede tener más de 50 caracteres'},
          { min: 6, message: 'El título debe tener al menos 6 caracteres' },
          { pattern: /^[A-Z][a-zA-Z ]*$/, message: 'compruebe que el titulo no comience con minusculas o verifique que no contenga caracteres numericos ó extraños'},
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
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 24 }}
      >
        <Upload {...verificarImagen} maxCount={1} >
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
          { required: bandDescripcion, message: 'Debe añadirse una descripción al platillo' },
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
        labelCol={{ span: 6 }} 
        wrapperCol={{ span: 24 }} 
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
        wrapperCol={{ span: 20 }}
      >
        <Button type="primary" htmlType="submit" className='button' style={{ marginRight: '20%', backgroundColor: '#7D0633' }}>
          Actualizar
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
        title="¿Está seguro que desea cancelar?"
        visible={cancelModalVisible}
        onCancel={() => setCancelModalVisible(false)}
        footer={[
          <Link to={`/mostrar-platillo/page/${id}`} key="cancel" className='button-link' onClick={() => setCancelModalVisible(false)}>
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
    </div>
  );
}

export default EditarPlatillo;
 