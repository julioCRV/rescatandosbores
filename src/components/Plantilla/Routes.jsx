import React from 'react'; 
import {Routes, Route} from 'react-router-dom';

import MyForm from '../RegistroPlatillo/registrarPlatillo';
import MostrarPlatillos from '../MostrarPlatillos/mostrarPlatillos';
import Home from '../Home/Home';

function Router() {
    return (
        <Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route path='/registrar-platillo' element={<MyForm/>}/>
            <Route path='/mostrar-platillo/page/:id' element={<MostrarPlatillos/>}/>
        </Routes>
    );
}

export default Router; 
