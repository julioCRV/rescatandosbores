import Reac, {useState} from 'react'; 
import {Routes, Route} from 'react-router-dom';

import Menu from '../MenuPlatillos/menuPlatillos';
import Home from '../../components/Home/BannerPresentacion/BannerPresentacion';
import Buscador from '../../components/Home/Buscador';
import MyForm from '../../components/RegistroPlatillo/registrarPlatillo';
import MostrarPlatillos from '../../components/MostrarPlatillos/mostrarPlatillos';
import EditarPlatillos from '../../components/EditarPlatillo/EditarPlatillo';
import Login from "../../components/Iniciar Sesion/Login Alternativa/LOGINV2";
import Estadisticas from '../../components/Estadisticas/Estadisticas';
import Recuperar from '../../components/Iniciar Sesion/Login Alternativa/recuperar';
import Dashboard from '../../components/Estadisticas/Estadisticas';
import IngresarContra from '../Iniciar Sesion/Login Alternativa/ingresarContra'
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
            <Route path='/recuperarContra' element={<IngresarContra/>}/>
        </Routes>
    );
} 
export default Router; 
