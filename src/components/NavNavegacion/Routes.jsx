import Reac, {useState} from 'react'; 
import {Routes, Route} from 'react-router-dom';

import Menu from '../MenuPlatillos/menuPlatillos';
import Home from '../../components/Home/BannerPresentacion/BannerPresentacion';
import Buscador from '../../components/Home/Buscador'
import MyForm from '../../components/RegistroPlatillo/registrarPlatillo';
import MostrarPlatillos from '../../components/MostrarPlatillos/mostrarPlatillos';
import EditarPlatillos from '../../components/EditarPlatillo/EditarPlatillo'
import Login from "../../components/Iniciar Sesion/Login Alternativa/LOGINV2"
import Estadisticas from '../../components/Estadisticas/Estadisticas'

function Router() {
    return (
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/platillos-tradicionales' element={<Estadisticas />} />
            <Route path='/menu-platillos' element={<Menu/>}/>
            <Route path='/buscador' element={<Buscador/>}/>
            <Route path='/registrar-platillo' element={<MyForm/>}/>
            <Route path='/mostrar-platillo/page/:id' element={<MostrarPlatillos/>}/>
            <Route path='/editar-platillo/:id' element={<EditarPlatillos/>}/>
            <Route path='/Iniciar-sesion' element={<Login/>}/>
        </Routes>
    );
} 
export default Router; 
