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
  const token=localStorage.getItem('token');
  const [imageUploaded, setImageUploaded] = useState(false);
  const [videoUploaded, setVideoUploaded] = useState(false);
  const [text, setText] = useState('');
  const [text2, setText2] = useState('');
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [videoModalVisible, setVideoModalVisible] = useState(false);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [irModalEditar, setModalEditar] = useState(false);
  //Implementados por mi
  const [bandTitulo, setBandTitulo] = useState(false);
  const [bandDescripcion, setBandDescripcion] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rutaImagen,setRutaImagen] = useState("");
  const [rutaVideo,setRutaVideo] = useState("");
  const [nombreImagen,setNombreImagen] = useState("");
  const [datoImagen,setDatoImagen] = useState(null);
  const [nombreVideo,setNombreVideo] = useState("");
  const [idPlatillo,setIdPlatillo] = useState("");
  const {id} = useParams(); //Obtengo el id con el useParams
  const [keyImagen,setKeyImagen] = useState(false);
  const [keyVideo,setKeyVideo] = useState(false);
  const [platilloData, setPlatilloData] = useState({
    nombre: '',
    descripcion: '',
    video: '',
    imagen: '',
    identificador: '',
  });

  //El useEffect se ejecuta cuando ni bien la pagina carga
  useEffect(() => {
    setKeyImagen(false);
    setKeyVideo(false);
    setBandTitulo(false); //Bandera que me ayudan a evitar que me pidan de entrada titulo cuando este ya esta definido por default
    setBandDescripcion(false); //Bandera que me ayudan a evitar que me pidan de entrada descripcion cuando este ya esta definido por default
    //Obtengo el platillo con el id indicado

    axios.get(`http://18.116.106.247:3000/mostrarPlatillos/page/${id}`)
      .then((response) => {
        console.log(response.data.respuesta);
        const platillo = response.data.respuesta;
        setText(platillo.nombre);
        setText2(platillo.descripcion);
        setNombreImagen(platillo.imagen);
        setNombreVideo(platillo.video);
        setIdPlatillo(platillo.id);
        setPlatilloData({
          nombre: platillo.nombre,
          descripcion: platillo.descripcion,
          imagen: platillo.imagen,
          identificador: platillo.id,
          video: platillo.video,
        });
        setRutaImagen('http://18.116.106.247:3000/media/imagen/' + platillo.imagen);
        setRutaVideo('http://18.116.106.247:3000/media/video/' + platillo.video);
      })
      .catch((error) => {
        console.error('Error al obtener el platillo:', error);
      });

      axios.get('http://18.116.106.247:3000/media/imagen/' + nombreImagen)
      .then((response) => {
        setDatoImagen(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener el platillo:', error);
      });      

  }, [id]);
  
  const showModal = () => {
    setCancelModalVisible(true);
  };

  const showModalEditar = () => {
    setModalEditar(true);
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
    if (newText2.length <= 501){
      setText2(newText2);
    }
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
        setKeyImagen(true);
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
      }else if(file.size > 900000000) {
        message.error('El tamaño del video no puede exceder 900MB');
      } else if(file.size < 10000000){
        message.error('El tamaño del video no puede ser menor de 10MB');
      }else {
        setVideoUploaded(true);
        setKeyVideo(true);
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
    setIsLoading(true);
    try {
      //Cargo los datos de los inputs para poder subirlo a la bd
      const formData = new FormData();
      formData.append('nombre', values.titulo ?? text);
      formData.append('descripcion', values.descripcion ?? text2);
      formData.append('id', platilloData.identificador);
      
      if(values.imagen === undefined){
        formData.append('imagen',null);
      }else{
        const imagenFile = values.imagen.file;
        formData.append('imagen', new Blob([imagenFile], { type: imagenFile.type }), imagenFile.name);
      }

      if(values.video === undefined){
        formData.append('video',null);
      }else{
        const videoFile = values.video.file;
        formData.append('video', new Blob([videoFile], { type: videoFile.type }), videoFile.name);
      }
            
      console.log('Realizando llamada');

      const response = await axios.put(`http://18.116.106.247:3000/modificarPlatillo/${platilloData.identificador}`,formData,{
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `${token}`,
        },
      });

      console.log('Llega la llamada');
      console.log(response);
      if (response.status === 200) {
        /* message.success('Platillo actualizado correctamente'); */
      } else {
        message.error('Error al actualizar el platillo');
      }
    } catch (err) {
      message.error('Error con la actualizacion');
      console.log(err);
    }finally{
      setIsLoading(false); //Desactiva la interfaz de carga
      showModalEditar();
    }
  
};

  return (
    <div>
    <div className="titulo-formato" style={{ marginBottom: '30px' }}>Editar Platillo</div  >
    <div className='form-contenedor'>
    {isLoading  &&  <Spin size='large' className='antspin'/>}
    <Form onFinish={onFinish}>

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
          { pattern: /^[A-Za-zÑñ][a-zA-ZÑñ ]*$/, message: 'verifique que no contenga caracteres numericos ó extraños'},
        ]}

        labelCol={{ span: 6 }} // Configura el ancho de la etiqueta

        wrapperCol={{ span: 16 }} // Configura el ancho del campo de entrada
      >
        <div style={{ position: 'relative' }}>
          <Input
            placeholder="Ingrese el título del platillo"
            className="input-limited"
            autoComplete="off"
            onChange={handleTextChange}
            value={text}
            maxLength={51}
          />
          <div style={{color: 'gray' }}>
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
        rules={[{ required: false, message: 'No se ha subido ninguna imagen' }]}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 24 }}
      >
        <Upload {...verificarImagen} maxCount={1} accept='image/*'>
          <Button style={buttonStyle} icon={<UploadOutlined />} className='sms'>Subir Imagen</Button>
          {imageUploaded }
          {!imageUploaded && <span className='mensaje-transparenteI'>{nombreImagen}</span>}
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
            
          />
          <div style={{color: 'gray' }}>
          {500-text2.length >= 0 ? (500-text2.length > 9 && 500-text2.length < 100? "0"+(500-text2.length) : 500-text2.length >= 0 && 500-text2.length < 10? "00"+(500-text2.length) : 500-text2.length)+"/"+500 : "000"+"/"+500}
          </div>
        </div>
      </Form.Item>



      <Form.Item className='componente-limite'
        label={<span className='item-txt' onClick={(e)=>{e.preventDefault()}}>Video:</span>}
        name="video"
        colon={false}
        rules={[{ required: false, message: 'No se ha subido ningun video' }]}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 24 }}
      >
        <Upload {...verificarVideo} maxCount={1} accept='video/mp4'>
          <Button style={buttonStyle} icon={<UploadOutlined /> }className='sms'>Subir Video</Button>
          {videoUploaded}
          {!videoUploaded && <span className='mensaje-transparenteV'>{nombreVideo}</span>}
        </Upload>
      </Form.Item>



      <Form.Item className='componente-limite' 
        labelCol={{span: 6}}
        wrapperCol={{ span: 20 }}
      >
        <div className='contenedorBotones'> 
        <div className='botonAC'>
        <Button type="primary" htmlType="submit" className='button' style={{ backgroundColor: '#7D0633'}}>
          Actualizar
        </Button> 

        <Button type="primary" htmlType="button" className='button' style={{backgroundColor: '#828282'}} onClick={showModal}>
          Cancelar
        </Button>
        </div>
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
        title="Se actualizo correctamente,¿Desea ver los cambios?"
        visible={irModalEditar}
        closable={false}
        onCancel={() => setCancelModalVisible(false)} 
        footer={[
          <Link to={`/mostrar-platillo/page/${id}`} key="cancel" onClick={() => setModalEditar(false)}>
            <Button key="ok" className='button-link' onClick={() => setCancelModalVisible(false)}>
            Si
          </Button>,
          </Link>,
          <Button key="ok" className='button-link' onClick={() => setModalEditar(false)}>
          No
          </Button>,
        ]}
      > </Modal>


      <Modal
        title="¿Está seguro que desea cancelar?"
        visible={cancelModalVisible}
        onCancel={() => setCancelModalVisible(false)}
        footer={[
          <Link to={`/mostrar-platillo/page/${id}`} key="cancel" onClick={() => setCancelModalVisible(false)}>
           <Button key="ok" className='button-link' onClick={() => setCancelModalVisible(false)}>
          Ok
          </Button>,
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

export default EditarPlatillo;