
import React, { useEffect, useState ,useRef } from 'react';
import axios from 'axios';
import { List, Card, Image, Input, Button, AutoComplete, Space} from 'antd';
import './Home.css'
import { Link, useLocation } from 'react-router-dom';
import MenuItem from '../sprint2/MenuItem/MenuItem'
import '../sprint2/MenuItem/MenuItem.css'
import { HistoryOutlined, SearchOutlined } from '@ant-design/icons';



const Home= () => {
  const [platillos, setPlatillos] = useState([]);
  const [searchedText, setSearchedText] = useState("")
    const [isSearchVisible, setSearchVisible] = useState(false);
    
    const [searches, setSearches] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [searchValue, setSearchValue] = useState(""); 

    useEffect(() => {
      async function fetchPlatillos2() {
        try {
          const response = await fetch(`http://18.116.106.247:3000/buscarPlatillo?titulo=${searchedText}`);
          if (response.ok) {
            const data = await response.json();
            console.log(data);
            setPlatillos(data.result);
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
      if (inputValue.trim() !== '') {
        setSearches([inputValue, ...searches]);
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
    return (
      <>
      {/*condicional para ocultar la barra de busqueda*/}
            <>
               <AutoComplete
        className="estilo-autocompletable"
        options={options}
      >
        <Input
          placeholder="Realiza una búsqueda"
          size="large"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onPressEnter={() => {
            setSearchValue(inputValue);
            setSearchVisible(true); 
            handleSearch(inputValue);
            handleSearch2();
          }}
        />
      </AutoComplete>
        </>
           
  
          {/*button que controla si esta visible o no la barra de navegación */}
         {/* <Link to="/error" className='menu-icon'>*/}
          <Button
              className='estilo-button'
              onClick={() => {
                if (inputValue==""){
                  setSearchVisible(false); 
                  }else{ 
                    handleSearch(inputValue);
                    handleSearch2();
                  setSearchVisible(true);
                  }
                 
                 
              }}
  
              icon={<SearchOutlined />}   
          >
          </Button>
          {/*} </Link> */}
  
  
  
  { isSearchVisible && (
    <div className="menuPlatillo">
      <div className='div-center' >
        <h2 >{tit} {searchValue}</h2>
      </div>
    </div>
  )}
          
          <div className="menuPlatillo">
        <div className="menuList">
        
          {platillos.map((menuItem, key) => {
           
      console.log(platillos, "ACAAAAAAAAA222222222");
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
