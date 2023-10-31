
import React, { useEffect, useState ,useRef } from 'react';
import axios from 'axios';
import { List, Card, Image, Input, Button, AutoComplete, Space} from 'antd';
import './Home.css'
import { Link, useLocation } from 'react-router-dom';
import MenuItem from '../sprint2/MenuItem/MenuItem'
import '../sprint2/MenuItem/MenuItem.css'
import { HistoryOutlined, SearchOutlined, CloseOutlined } from '@ant-design/icons';



const Home= () => {
  const [platillos, setPlatillos] = useState([]);
  const [searchedText, setSearchedText] = useState("")
    const [isSearchVisible, setSearchVisible] = useState(false);
    const [cantResult, setCantResult] = useState(0)

    const [searches, setSearches] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [searchValue, setSearchValue] = useState(""); 
    const [autoCompleteOptions, setAutoCompleteOptions] = useState([]);
    const [autoCompleteValue, setAutoCompleteValue] = useState("");

    useEffect(() => {
      async function fetchPlatillos2() {
        try {
          const response = await fetch(`http://18.116.106.247:3000/buscarPlatillo?titulo=${searchedText}`);
          if (response.ok) {
            const data = await response.json();
            console.log(data);
            setPlatillos(data.result);
            setCantResult(platillos.length)
          } else {
            console.error('Error al obtener platillos');
          }
        } catch (error) {
          console.error('Error en la solicitud:', error);
        }
      }
  
      if (searchedText.trim() !== "") {
        fetchPlatillos2();
      }
    }, [searchedText]);
  


     // Oculta el Input.Search cuando se realiza la búsqueda
     const handleSearch = (value) => {
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
  

  
    const handleSearch2 = () => {
      if (autoCompleteValue.trim() !== '') {
        console.log(autoCompleteValue);
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
  

    const handleInputChange = (e) => {
      setInputValue(e.target.value);
    };
  
    const handleClearClick = () => {
      console.log(inputValue);
      setInputValue("");
      
    };

    const tit="Resultados de la búsqueda para:";

  
    const handleAutoCompleteChange = (value) => {
      setAutoCompleteValue(value);
      // Here, you can update the options based on the value (if needed)
      // For example, you can fetch suggestions from the server and update 'autoCompleteOptions'
    };
    return (
      <>
      {/*condicional para ocultar la barra de busqueda*/}
      <div className="input-container">
        <AutoComplete
          className="estilo-autocompletable"
          options={options}
          value={autoCompleteValue}
          onChange={handleAutoCompleteChange}
        >
          <Input
            type="text"
            placeholder="Realiza una búsqueda"
            size="large"
            value={autoCompleteValue}
            onChange={(e) => handleAutoCompleteChange(e.target.value)}
            onPressEnter={() => {
              setSearchValue(autoCompleteValue);
              setSearchVisible(true);
              handleSearch(autoCompleteValue);
              handleSearch2();
            }}
          />
        </AutoComplete>

        {autoCompleteValue && (
          <Button className='estilo-buttonx' onClick={() => setAutoCompleteValue("")}
          icon={<CloseOutlined/>}
          >
        
                 
            
          </Button>
        )}
      </div>
  
          {/*button que controla si esta visible o no la barra de navegación */}
         {/* <Link to="/error" className='menu-icon'>*/}
          <Button
              className='estilo-button'
             
              onClick={() => {
              
                    handleSearch(inputValue);
                    handleSearch2();
                  setSearchVisible(true);
                  
                 
                 
              }}
  
              icon={<SearchOutlined />}   
          >
          </Button>
          
          {/*} </Link> */}
  
  
  
  { isSearchVisible && (
    <div className="menuPlatillo">
      <div className='div-center' >
        <h2 >{tit} {searchValue} es de {cantResult}</h2>
      </div>
    </div>
  )}
          
          <div className="menuPlatillo">
        <div className="menuList">
        
          {platillos.map((menuItem, key) => {
            return (
              <MenuItem
                key={key} 
                image={menuItem.IMAGEN_PLATILLO}
                name={menuItem.TITULO_PLATILLO}
                id={key+1}
              />
            );
          })}
        </div>
      </div>
     
      </>
    );
}

export default Home; 
