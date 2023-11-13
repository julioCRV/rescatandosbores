import React, { useState } from 'react';
import { Layout, Menu, theme ,Input,Button } from 'antd';
import { HomeOutlined, UnorderedListOutlined, SearchOutlined, MenuOutlined } from '@ant-design/icons'; // Importa los íconos necesarios
import { Link, useLocation} from 'react-router-dom';
import Routes from './Routes';
import './headerNav.css'
import { Content } from 'antd/es/layout/layout';
import Buscador from '../../Home/Buscador';

//Es el mismo Nav de navegacion, se le quito el submenu de platillos tradicionales
const { Header, Footer } = Layout;
const { SubMenu } = Menu;

const App2 = () => {
  const [searchedText, setSearchedText] = useState("")
  const [openMenu, setOpenMenu] = useState(false);
  
  const [openSubMenu, setOpenSubMenu] = useState(false);
  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const location = useLocation();
  const items1 = ['Home', 'Platillos Tradicionales'];

  const handleSearch = (query) => {
    // Lógica de búsqueda, por ejemplo, redirección a una página de resultados
    console.log(`Realizando búsqueda: ${query}`);
  };

  return (
    <Layout className="layout">
      <Header div className="header" >

        <Menu theme="none" mode="horizontal" className='menu'>
        <div className='alMedio'>
          <Menu.Item key="Home" className={`${location.pathname === '/' ? 'selected-menu-item' : ''} ${'menu'}`} > 
          <div className='alMedio'>
            <Link to="/" className='menu-icon'>
              <HomeOutlined /> Inicio
            </Link> 
            </div>
          </Menu.Item>     
          
          <SubMenu theme='dark' className= {`${location.pathname === '/platillos-tradicionales' ? 'selected-menu-item' : ''} ${'menu'}`}
          
          title={
              <Link to="/platillos-tradicionales" className='menu-icon'>
                <span>          
                  <UnorderedListOutlined /> Platillos Tradicionales
                </span>
                 </Link>    
            }
          >
            <Menu.Item key="Registrar Platillo" className={location.pathname === '/registrar-platillo' ? 'selected-menu-item' : ''}>
   
              <Link to="/registrar-platillo" className={`${'menu-icon'} ${'prueba'}`}>
                Registrar Platillo
              </Link> 
         
            </Menu.Item>
            <Menu.Item key="Mostrar Platillo" className={location.pathname === '/mostrar-platillo/page/1' ? 'selected-menu-item' : ''}>
              <Link to="/mostrar-platillo/page/1" className={`${'menu-icon'} ${'prueba'}`}>
                Mostrar Platillo
              </Link> 
            </Menu.Item>
            </SubMenu>
            {location.pathname === '/' && (
      <Menu.Item key="Buscar" className={`uno ${location.pathname === '/buscador' ? 'selected-menu-item' : ''}`} style={{ position: 'absolute' }}>
        <Link to="/buscador">
          <Button
            icon={<SearchOutlined />}
          >
          </Button>
        </Link>
      </Menu.Item>
    )}



    
          
          </div>
          
        </Menu>
      </Header>
      <Content className='content'>
        <Routes/>
      </Content>
    </Layout>
    
  );
};

export default App2;
