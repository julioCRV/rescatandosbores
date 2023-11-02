import React, { useState } from 'react';
import { Layout, Menu, theme } from 'antd';
import { HomeOutlined, UnorderedListOutlined } from '@ant-design/icons'; // Importa los íconos necesarios
import { Link, useLocation } from 'react-router-dom';

import Routes from './Routes';

const { Header, Footer } = Layout;
const { SubMenu } = Menu;


import './plantilla.css'
import { Content } from 'antd/es/layout/layout';

const App2 = () => {
  const [openSubMenu, setOpenSubMenu] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const location = useLocation();
  const items1 = ['Home', 'Platillos Tradicionales'];

  return (
    <Layout className="layout">
      <Header div className="header" >

        <Menu
          theme="dark"
          mode="horizontal"
          className='menu'
        >{/*
          <Menu.Item key="Home" className={location.pathname === '/' ? 'selected-menu-item' : ''}>
            <Link to="/">
              <HomeOutlined/> Home
            </Link> 
          </Menu.Item>
          */}<SubMenu
            title={
              <span>
                <UnorderedListOutlined /> Platillos Tradicionales
              </span>
            }
            key="Platillos Tradicionales"
            className={`${location.pathname!='/'? 'selected-menu-item': ''} ${openSubMenu ? 'ant-menu-submenu-open' : ''}`}
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
        </Menu>
      </Header>
      <Content className='content'>
        <Routes/>
      </Content>
    </Layout>
  );
};

export default App2;
