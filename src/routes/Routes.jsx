import Reac, {useState} from 'react'; 
import {Routes, Route} from 'react-router-dom';

import Menu from '../components/MenuPlatillos/menuPlatillos';
import Home from '../Home/BannerPresentacion';
import Buscador from '../components/Buscador/Buscador';
import MyForm from '../components/RegistroPlatillo/FormularioRegistro';
import MostrarPlatillos from '../components/MostrarPlatillos/mostrarPlatillos';
import EditarPlatillos from '../components/EditarPlatillo/EditarPlatillo';
import Login from "../components/IniciarSesion/DiseñoFormulario";
import Estadisticas from '../components/Estadisticas/Estadisticas';
import Recuperar from '../components/IniciarSesion/FormularioEmail';
import Dashboard from '../components/Estadisticas/Estadisticas';
import FormularioRecuperar from '../components/IniciarSesion/FormularioRecuperarContraseña'
function Router() {
    return (
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/platillos-tradicionales' element={<Estadisticas />} />
            <Route path='/menu-platillos' element={<Menu/>}/>
            <Route path='/buscador' element={<Buscador/>}/>
            <Route path='/registrar-platillo' element={<MyForm/>}/>
            <Route path='/mostrar-estadisticas' element={<Dashboard/>}/>
            <Route path='/mostrar-platillo/page/:id' element={<MostrarPlatillos/>}/>
            <Route path='/editar-platillo/:id' element={<EditarPlatillos/>}/>
            <Route path='/iniciar-sesion' element={<Login/>}/>
            <Route path='/recuperar' element={<Recuperar/>}/>
            <Route path='/recuperarContra/:tokenCodificado' element={<FormularioRecuperar/>}/>
        </Routes>
    );
} 
export default Router; 
