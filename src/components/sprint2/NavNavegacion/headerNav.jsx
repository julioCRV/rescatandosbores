import React, { useState } from 'react';
import { Layout, Menu, theme ,Input, Button } from 'antd';
import { HomeOutlined, UnorderedListOutlined } from '@ant-design/icons'; // Importa los íconos necesarios
import { Link, useLocation, Route} from 'react-router-dom';
import Routes from './Routes';
import './headerNav.css'
import { Content } from 'antd/es/layout/layout';
import { SearchOutlined } from '@ant-design/icons';

//Es el mismo Nav de navegacion, se le quito el submenu de platillos tradicionales
const { Header, Footer } = Layout;
const { SubMenu } = Menu;



const App2 = () => {
  const [searchedText, setSearchedText] = useState("")
  const [openSubMenu, setOpenSubMenu] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const location = useLocation();
  const items1 = ['Home', 'Platillos Tradicionales'];


  return (
    <Layout className="layout">
      <Header div className="header" >

        <Menu theme="none" mode="horizontal" className='menu'>
        <div >
          <Menu.Item key="Home" className={location.pathname === '/' ? 'selected-menu-item' : ''} >
            <Link to="/" className='menu-icon'>
              <HomeOutlined/> Home
            </Link> 
          </Menu.Item>     
          
          <SubMenu theme='dark' className='menu-icon'
          title={
              <span>          
                 <UnorderedListOutlined /> Platillos Tradicionales
              </span>
            }
            >
            <Menu.Item key="Registrar Platillo" className={location.pathname === '/registrar-platillo' ? 'selected-menu-item' : ''}>
              <Link to="/registrar-platillo" className='menu-icon'>
                Registrar Platillo
              </Link> 
            </Menu.Item>
            <Menu.Item key="Mostrar Platillo" className={location.pathname === '/mostrar-platillo/page/1' ? 'selected-menu-item' : ''}>
              <Link to="/mostrar-platillo/page/1" className='menu-icon'>
                Mostrar Platillo
              </Link> 
            </Menu.Item>
            
          </SubMenu>
          {location.pathname === '/' && (
        <Menu.Item key="Buscar" className={`uno ${location.pathname === '/error' ? 'selected-menu-item' : ''}`} style={{ position: 'absolute' }}>
          <Link to="/error">
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
