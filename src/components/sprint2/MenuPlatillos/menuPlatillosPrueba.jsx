import { Typography, Input, List, Card, Image, Button } from "antd";
import Search from "antd/es/input/Search";
import { useDebugValue, useEffect, useState } from "react";
import { SearchOutlined } from '@ant-design/icons';
import './menuPlatillos.css'
import { Link, useLocation } from 'react-router-dom';
import Routes from '../NavNavegacion/Routes';
import { Content } from 'antd/es/layout/layout';

function App() {
    const [searchedText, setSearchedText] = useState("")
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false) //preview imagenes
    const [isSearchVisible, setSearchVisible] = useState(false);
    
    useEffect(() => {
    //API DE PRUEBA PARA LAS IMAGENES
        setLoading(true)
        fetch(`https://dummyjson.com/products/search?q=${searchedText}`)
        .then(res => res.json())
        .then(response=>{
            setLoading(false)
            setDataSource(response.products);   
        });
    }, [searchedText]);

    // Oculta el Input.Search cuando se realiza la búsqueda y manda a buscar en la api
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
            <Input.Search
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

        {/*utiliza item.id, item.thumbnail, item.title como nombre de variables que se encuentran en la pagina dummyjson*/}
        <List
            loading={loading} //solo para preview de imagenes
            dataSource={dataSource} 
            grid={{xs:1,sm:2,md:3,lg:4,xl:4,xxl:4}}// 4 ubicado img
            
            locale={{ emptyText: noDataMessage }} 
            renderItem={(item => {
                return <Card key={item.id} style={{height: 340, margin: 12}}>
                    <Image src={item.thumbnail}></Image>
                    <Typography.Text style={{textAlign: 'center'}}>{item.title}</Typography.Text>
                </Card>
        })}></List>
        </>
    );
}

export default App; 