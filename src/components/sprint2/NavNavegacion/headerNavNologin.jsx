import React, { useState } from 'react';
import { Layout, Menu, theme ,Input,Button } from 'antd';
import { HomeOutlined, UnorderedListOutlined, SearchOutlined,MailOutlined, AppstoreOutlined, MenuOutlined } from '@ant-design/icons'; // Importa los íconos necesarios
import { Link, useLocation} from 'react-router-dom';
import Routes from './Routes';
import './headerNav.css'
import { Content } from 'antd/es/layout/layout';
import Buscador from '../../Home/Buscador';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircleUser} from '@fortawesome/free-regular-svg-icons'
import BLogout from '../../Iniciar Sesion/logout'
import Profile from '../../Iniciar Sesion/Profile'

//Es el mismo Nav de navegacion, se le quito el submenu de platillos tradicionales
const { Header, Footer } = Layout;
const { SubMenu } = Menu;

const App2 = () => {
  const [submenu1Visible, setSubmenu1Visible] = useState(false);
  const [submenu2Visible, setSubmenu2Visible] = useState(false);
  const location = useLocation();

  const handleSearch = (query) => {
    // Lógica de búsqueda, por ejemplo, redirección a una página de resultados
    console.log(`Realizando búsqueda: ${query}`);
  };


  const handleSubmenu1Click = () => {
    setSubmenu1Visible(!submenu1Visible);
    // Asegurarse de que el otro submenu esté cerrado
    setSubmenu2Visible(fa);
  };

  const handleSubmenu2Click = () => {
    setSubmenu2Visible(!submenu2Visible);
    // Asegurarse de que el otro submenu esté cerrado
    setSubmenu1Visible(false);
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
          </div>
          <SubMenu theme='dark' className='menu-icon'
              title="Platillos Tradicionales"        
              icon={<UnorderedListOutlined />}
              onTitleClick={handleSubmenu1Click}
              visible={submenu1Visible}
              >
              <Menu.Item key="Mostrar Platillo" className={location.pathname === '/mostrar-platillo/page/1' ? 'selected-menu-item' : ''}>
                <Link to="/mostrar-platillo/page/1" className={`${'menu-icon'} ${'prueba'}`}>
                  Mostrar Platillo
                </Link> 
              </Menu.Item>
          </SubMenu>

          <SubMenu style={{ position: 'absolute', left: '94.5%', top: '10%' }}
            icon={<FontAwesomeIcon icon={faCircleUser} style={{ fontSize: 30 }}/>}
            onTitleClick={handleSubmenu2Click}
            visible={submenu2Visible}>
             <Profile/>
             <Menu.Item  style={{ textAlign: 'center', }}>
                  <FontAwesomeIcon icon={faCircleUser} style={{ fontSize: 30, alignItems: 'center' }} />
             </Menu.Item>
             <Menu.Item> 
             <Link  to="/Iniciar-sesion">
                    <Button  icon={<LoginOutlined />}>Iniciar Sesison</Button>
                </Link>
               </Menu.Item>
             <Menu.Item> <BLogout/> </Menu.Item>
           </SubMenu>

            {location.pathname === '/' && (
              <Menu.Item key="Buscar" className={`uno ${location.pathname === '/buscador' ? 'selected-menu-item' : ''}`} style={{  position: 'absolute', left:'91%'  }}>
                <Link to="/buscador">
                  <Button
                    icon={<SearchOutlined />}
                  >
                  </Button>
                </Link>
              </Menu.Item>
            )}
       
          
        </Menu>
      </Header>
      <Content className='content'>
        <Routes/>
      </Content>
    </Layout>
    
  );
};

export default App2;
