import Reac, {useState} from 'react'; 
import {Routes, Route} from 'react-router-dom';

import Menu from '../MenuPlatillos/menuPlatillos';
import Home from '../../Home/BannerPresentacion/BannerPresentacion';
import Buscador from '../../Home/Buscador'
import MyForm from '../../RegistroPlatillo/registrarPlatillo';
import MostrarPlatillos from '../../MostrarPlatillos/mostrarPlatillos';
import EditarPlatillos from '../../EditarPlatillo/EditarPlatillo'
import Login from "../../Iniciar Sesion/Login Alternativa/LOGINV2"

function Router() {
    return (
        <Routes>
            <Route path='/' element={<Home/>}/>
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
