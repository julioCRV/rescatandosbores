
import React, { useEffect, useState ,useRef } from 'react';
import axios from 'axios';
import { List, Card, Image, Input, Button} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './menuPlatillos.css'
import { Link, useLocation } from 'react-router-dom';
import Routes from '../NavNavegacion/Routes';
import { Content } from 'antd/es/layout/layout';

const { Search } = Input;
const uri = 'http://18.116.106.247:3000/media/';
let currentPage = 1; 
let currentPage2 = 1; 


const MenuPlatillos= () => {
  const [platillos, setPlatillos] = useState([]);
  const [searchedText, setSearchedText] = useState("")
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false) //preview imagenes
    const [isSearchVisible, setSearchVisible] = useState(false);

    const [platilloData, setPlatilloData] = useState({
      nombre: '',
    });
    
    const [totalPages, setTotalPages] = useState(1); 
    const [totalPages2, setTotalPages2] = useState(1); 
    
    
  
//MOSTRAR MENU
let ver=1;  useEffect(() => {
    console.log('realizando llamada de la receta <:v');
    const fetchPlatillos = async () => {
      let totalIds = 0;

      try {
        while (true) {
          const response = await axios.get(`http://18.116.106.247:3000/mostrarPlatillos/page/${currentPage}`);
          const data = response.data;
          if (data.length === 0) {
            break;
          }
          totalIds += data.length;
          currentPage++;
        }
      } catch (error) {
        setTotalPages(currentPage);
        console.error('Error al obtener datos:', error);
        console.log(`Número de la última página existente antes del error: ${currentPage}`);
      }

      try {
        const requests = [];
        for (let i=1; i <= currentPage-2; i++) { // Cambia N al número total de solicitudes que deseas hacer
          requests.push(axios.get(`http://18.116.106.247:3000/mostrarPlatillos/page/${i}`));
        }
        const responses = await Promise.all(requests);
        const platillosData = responses.map((response) => response.data.respuesta);
        setPlatillos(platillosData);
      } catch (error) {
        console.error('Error al obtener los platillos:', error);
      }
    };

    fetchPlatillos();
  }, []); 
  

  //BUSCAR ALGO
  

  useEffect(() => {
    console.log(currentPage);
    console.log('realizando llamada de la receta <:v');
    const fetchPlatillos = async () => {
      let totalIds2 = 0;
      setLoading(true)
      try {
        while (true) {
          const response = await axios.get(`http://18.116.106.247:3000/mostrarPlatillos/page/${currentPage2}`);
          const data = response.data;
          if (data.length === 0) {
            break;
          }
          totalIds2 += data.length;
          currentPage2++;
        }
      } catch (error) {
        setTotalPages2(currentPage2);
        console.error('Error al obtener datos:', error);
        console.log(`Número de la última página existente antes del error: ${currentPage2}`);
      }

      try {
        const requests = [];
        for (let i=1; i <= currentPage2-2; i++) { 
          const response = await axios.get(`http://18.116.106.247:3000/mostrarPlatillos/page/${i}`);
          const platillo = response.data.respuesta;



          console.log(platillo.nombre,'dfiiiiiiiiiiiiiiiiiii',searchedText,i);
          const contienePalabra = (platillo.nombre).includes(searchedText);

          
          if (contienePalabra) {
            console.log('Al menos una letra es igual en ambas palabras.');
            requests.push(axios.get(`http://18.116.106.247:3000/mostrarPlatillos/page/${i}`));
          } else {
            console.log('No hay letras iguales en ambas palabras.');
          }
          
          
        }
        const responses = await Promise.all(requests);
        const platillosData = responses.map((response) => response.data.respuesta);
        setPlatillos(platillosData);
      } catch (error) {
        console.error('Error al obtener los platillos:', error);
      }
    };

    fetchPlatillos();
    }, [searchedText]);



     // Oculta el Input.Search cuando se realiza la búsqueda
     const handleSearch = (value) => {
        setSearchedText(value);
        setSearchVisible(false); 
      };

    //para mostrar el mensaje en mejora
      const noDataMessage = (
        <span>
         <Link to="/error"></Link>
         <Content className='content'>
            <Routes/>
        </Content>
        </span>
    );
  

  return (
    <>
 
    {/*condicional para ocultar la barra de busqueda*/}
        {isSearchVisible && (
                <Search placeholder="" 
            size="large"
            className="estilo-search"
            onSearch={(value) => {
            handleSearch(value);
            }}
            />
         )}

        {/*button que controla si esta visible o no la barra de navegación */}
        <Button
            className="estilo-button"
            onClick={() => {
            setSearchVisible(true); // Muestra el Input.Search al hacer clic en el botón
            }}
            icon={<SearchOutlined />}   
        ></Button>
      <div className="platillos-container">
        <List
          grid={{xs:1,sm:2,md:3,lg:4,xl:4,xxl:4}}// 4 ubicado img
          dataSource={platillos}
          renderItem={(platillo) => (
            <List.Item>
              <Card
                hoverable
                style={{ height: 300, margin: 12}}// Establece el ancho de la tarjeta
                cover={<Image  style={{width: 260, height: 198, margin: 20}} src={uri + 'imagen/' + platillo.imagen} alt={`Imagen de ${platillo.nombre}`} />}
              >
                <Card.Meta style={{textAlign: 'center'}} title={platillo.nombre} />
              </Card>
            </List.Item>
          )}
        />
      </div>
    </>




  );
};

export default MenuPlatillos;








