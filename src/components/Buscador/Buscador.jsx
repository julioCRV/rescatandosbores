
import React, { useEffect, useState ,useRef } from 'react';
import axios from 'axios';
import { Input, Button, AutoComplete, Space} from 'antd';
import './Home.css'
import MenuItem from '../MenuItem/MenuItem'
import '../MenuItem/MenuItem.css'
import { HistoryOutlined, SearchOutlined, CloseOutlined} from '@ant-design/icons';
import './Buscador.css'

const Buscador  = ({ onSearch }) => {
  const [platillos, setPlatillos] = useState([]);
  const [searchedText, setSearchedText] = useState("")
    const [isSearchVisible, setSearchVisible] = useState(false);
    const [isAlgoEscrito, setAlgoEscrito] = useState(false);
    const [isMensajeNadaEncontrado, setMensajeNadaEncontrado] = useState(false);
    const [searches, setSearches] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [searchValue, setSearchValue] = useState(""); 
    const [autoCompleteValue, setAutoCompleteValue] = useState("");
    const [cantPlatillos, setCantPlatillos] = useState("");
    const [errorMessage, setErrorMessage] = useState('');
    const token=localStorage.getItem('token');

    useEffect(() => {

      async function fetchPlatillos2() {
        try {
          const response = await fetch(`http://18.116.106.247:3000/buscarPlatillo?titulo=${searchedText}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${token}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            setPlatillos(data.result);
            setCantPlatillos(data.result.length);
            
          } else {
            console.error('Error al obtener platillos');
          }
        } catch (error) {
          console.error('Error en la solicitud:', error);
        }
      }
      if (searchedText.trim() === "") {
        setPlatillos([]);
      } else {
        fetchPlatillos2();
        if(cantPlatillos==0){
          setPlatillos([]);
          fetchPlatillos2();
        }
      }
    }, [searchedText]);

     // Oculta el Input.Search cuando se realiza la búsqueda
     const handleSearch = (value) => {
        setCantPlatillos(0);
        setSearchedText(value);
      };


    //para mostrar el mensaje en mejora
      const noDataMessage = (
        <span>
      <div className='div-center' >
        <h1 className='texto'>Oops!</h1>
        <h2>No se ha encontrado ningún platillo</h2>
      </div>
        </span>
    );
  
    const homeMessage = (
      <span>
    <div className='div-center' >
    <h1>Bienvenido al Buscador de Platillos</h1>
      <p>Encuentra tus platillos favoritos fácilmente.</p>
    </div>
      </span>
  );
  
    const handleSearch2 = () => {
      if (autoCompleteValue.trim() !== '') {
        setSearches([autoCompleteValue, ...searches]);
        setInputValue('');
      }
    };
  
    const options = searches.map(search => ({
      value: search,
      label: (
        <Space>
          <HistoryOutlined />
          {search}
        </Space>
      ),
    }));
  
    
    const tit="Resultados de la búsqueda para:";

  
    const handleAutoCompleteChange = (value) => {
      const maxLength = 50;
      const regex = /^[A-Za-záéíóúÁÉÍÓÚñ\s]+$/;
      console.log(value);
     if (value.length <= maxLength && (regex.test(value) || value === '')) {
  
        setAutoCompleteValue(value);
        setErrorMessage('');
      } else if (value.length > maxLength) {
        setErrorMessage('¡La búsqueda no puede exceder los 50 caracteres!');
      } else {
        setErrorMessage('¡Por favor, intenta nuevamente con solo letras y espacios!');
      }
  
    };
    
    const [scroll, setScroll] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 100) { // Ajusta este valor según tu necesidad de desplazamiento
          setScroll(true);
        } else {
          setScroll(false);
        }
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []); 

    return (
      <>
      {/*condicional para ocultar la barra de busqueda*/}
      <div className={`buscador-contenedor ${scroll ? 'buscador-fijo' : ''}`}>
          <AutoComplete
            className={`estilo-autocompletable ${errorMessage ? 'invalid' : ''} `}
            options={options}
            value={autoCompleteValue}
            onChange={(value) => handleAutoCompleteChange(value)}
          >
            <Input
              type="text"
              placeholder={errorMessage || 'Realiza una búsqueda'}
              size="large"
              onPressEnter={() => {
                
                if (!errorMessage) {
                  setAlgoEscrito(true);
                  setSearchValue(autoCompleteValue);
                  if(autoCompleteValue!=""){
                    setSearchVisible(true);
                    
                  }else{
                    setMensajeNadaEncontrado(false);
                    setSearchVisible(false);
                    setAlgoEscrito(false);
                  }
                  handleSearch(autoCompleteValue);
                  handleSearch2();
                }
                
              }}
            />
          </AutoComplete>

          {autoCompleteValue && errorMessage && (
            <div className="error-message">{errorMessage}</div>
          )}
                    {autoCompleteValue && !errorMessage && (
            <Button className='estilo-buttonx' onClick={() => setAutoCompleteValue("")} icon={<CloseOutlined />} />
          )}

         {/* <Link to="/error" className='menu-icon'>*/}
          <Button
              className='estilo-button'
              onClick={() => {
                if (!errorMessage) {
                  setSearchValue(autoCompleteValue);
                  if(autoCompleteValue!=""){
                    setSearchVisible(true);
                    }else{
                      setMensajeNadaEncontrado(false);
                      setSearchVisible(false);
                      setAlgoEscrito(false);
                    }
                  handleSearch(autoCompleteValue);
                  handleSearch2();
                }
              }}
              icon={<SearchOutlined />}   
          >
          </Button>
      </div>
  
          { isSearchVisible && (
              <div className='div-center' >
                <h2 className='mensaje-resultado'>{tit} {searchValue}</h2>
                <div className='div-left'>
                <h2>Se encontraron {cantPlatillos} platillos que coinciden con los términos de búsqueda</h2>
              </div>
              </div>
              
          )}
          {
            cantPlatillos===0 && noDataMessage
          }
          { !isAlgoEscrito && (
            <div className="menuPlatillo">
              <div className='div-center' >
                <h2 >{homeMessage}</h2>
              </div>
            </div>
          )}


{ isMensajeNadaEncontrado && (
            <div className="menuPlatillo">
              <div className='div-center' >
                <h2 >{noDataMessage}</h2>
              </div>
            </div>
          )}
          
      <div className="menuPlatillo">
        <div className="menuList">
          {platillos.map((menuItem, key) => {
            return (
              <MenuItem
                key={key} 
                image={menuItem.imagen_platillo}
                name={menuItem.titulo_platillo}
                pagina={menuItem.id_platillo}
                id={key+1}
              />
            );
          })}
        </div>
      </div>
     
      </>
    );
}

export default Buscador; 

