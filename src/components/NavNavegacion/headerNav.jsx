import React, { useState } from 'react';
import { Layout, Menu, theme ,Input,Button } from 'antd';
import { HomeOutlined, UnorderedListOutlined, SearchOutlined, LoginOutlined } from '@ant-design/icons'; // Importa los íconos necesarios
import { Link, useLocation} from 'react-router-dom';
import Routes from './Routes';
import './headerNav.css'
import { Content } from 'antd/es/layout/layout';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircleUser} from '@fortawesome/free-regular-svg-icons'
import BLogout from '../../components/Iniciar Sesion/logout'


//Es el mismo Nav de navegacion, se le quito el submenu de platillos tradicionales
const { Header, Footer } = Layout;
const { SubMenu } = Menu;

const App2 = () => {
  const miToken=localStorage.getItem('token');
  const miEmail = JSON.parse(localStorage.getItem('email'));
  const rol = JSON.parse(localStorage.getItem('rol'));
  console.log("El rol es: ",rol);
  //console.log('tu token en MenuNav: ',miToken);
  const [submenu1Visible, setSubmenu1Visible] = useState(false);
  const [submenu2Visible, setSubmenu2Visible] = useState(false);
  const [isBotonLogin, setisBotonLogin] = useState(true);
  const [isBotonLogout, setisBotonLogout] = useState(false);
  const location = useLocation();

  const handleSearch = (query) => {
    // Lógica de búsqueda, por ejemplo, redirección a una página de resultados
    console.log(`Realizando búsqueda: ${query}`);
  };


  const handleSubmenu1Click = () => {
    setSubmenu1Visible(!submenu1Visible);
    // Asegurarse de que el otro submenu esté cerrado
    setSubmenu2Visible(false);
  };

  const handleSubmenu2Click = () => {
    setSubmenu2Visible(!submenu2Visible);
    // Asegurarse de que el otro submenu esté cerrado
    setSubmenu1Visible(false);
  };

  const mostrarBotonLL = () =>{
    console.log(miToken);
    if(miToken!=null){
      setisBotonLogout(true);
      setisBotonLogin(false);
    }
    if(isBotonLogout){
      setisBotonLogout(false);
      setisBotonLogin(true);
    }
  }

  function getEmail(){
  if(miToken!=null){
    return miEmail;
  }else{
    return '';
  }
}

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
          <SubMenu theme='dark' className= {`${location.pathname === '/platillos-tradicionales' ? 'selected-menu-item' : ''} ${'menu'}`}
          
          
          title={
              ...miToken !== null ? 
                (<Link to="/platillos-tradicionales" className='menu-icon'>
                <span>
                  <UnorderedListOutlined /> Platillos Tradicionales
                </span>
                 </Link>    )
                :null
          }
            onTitleClick={handleSubmenu1Click}
            visible={submenu1Visible}
          >

            {rol === 'administrador' ? 
              <Menu.Item key="Registrar Platillo" className={location.pathname === '/registrar-platillo' ? 'selected-menu-item' : ''}>
              <Link to="/registrar-platillo" className={`${'menu-icon'} ${'prueba'}`}>
                Registrar Platillo
              </Link> 
              </Menu.Item> : null
            }

            {rol === 'administrador' ? 
              <Menu.Item key="Mostrar Estadisticas" className={location.pathname === '/mostrar-estadisticas' ? 'selected-menu-item' : ''}>
              <Link to="/mostrar-estadisticas" className={`${'menu-icon'} ${'prueba'}`}>
                Mostrar Estadisticas
              </Link> 
              </Menu.Item> : null
            }

              <Menu.Item key="Mostrar Platillo" className={location.pathname === '/mostrar-platillo/page/1' ? 'selected-menu-item' : ''}>
                <Link to="/mostrar-platillo/page/1" className={`${'menu-icon'} ${'prueba'}`}>
                  Mostrar Platillo
                </Link> 
              </Menu.Item>

          </SubMenu>

          <SubMenu style={{ position: 'absolute', left: '90.5%', top: '10%' }}
            icon={<FontAwesomeIcon icon={faCircleUser} style={{ fontSize: 30 }}/>}
            onTitleClick={handleSubmenu2Click}
            visible={submenu2Visible}>
         
             <Menu.Item  style={{ textAlign: 'center', }}>   
             <div>
                  <FontAwesomeIcon icon={faCircleUser} style={{ fontSize: 30, alignItems: 'center' }} /> {getEmail()}
             </div>
             </Menu.Item>
             {miToken ? (
              <Menu.Item onClick={mostrarBotonLL}> <BLogout/> </Menu.Item>
             ) :(
             
             <Menu.Item> 
                <Link  to="/Iniciar-sesion">
                    <Button onClick={mostrarBotonLL} icon={<LoginOutlined />}>Iniciar Sesison</Button>
                </Link>
             </Menu.Item>
             )}
           </SubMenu>

            {location.pathname === '/' && (
              <Menu.Item key="Buscar" className={`uno ${location.pathname === '/buscador' ? 'selected-menu-item' : ''}`} style={{  position: 'absolute', left:'81%'  }}>
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
