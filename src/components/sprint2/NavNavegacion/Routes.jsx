import Reac, {useState} from 'react'; 
import {Routes, Route} from 'react-router-dom';

import Menu from '../MenuPlatillos/menuPlatillos';
import Home from '../../Home/BannerPresentacion/BannerPresentacion';
import Error from '../../Home/Error'
import MyForm from '../../RegistroPlatillo/registrarPlatillo';
import MostrarPlatillos from '../../MostrarPlatillos/mostrarPlatillos';
import EditarPlatillos from '../../EditarPlatillo/EditarPlatillo'

function Router() {
    return (
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/menu-platillos' element={<Menu/>}/>
            <Route path='/error' element={<Error/>}/>
            <Route path='/registrar-platillo' element={<MyForm/>}/>
            <Route path='/mostrar-platillo/page/:id' element={<MostrarPlatillos/>}/>
            <Route path='/editar-platillo' element={<EditarPlatillos/>}/>
        </Routes>
    );
}
export default Router; 
