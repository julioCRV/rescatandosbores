import React from 'react'; 
import {Routes, Route} from 'react-router-dom';

import MyForm from '../RegistroPlatillo/registrarPlatillo';
import MostrarPlatillos from '../MostrarPlatillos/mostrarPlatillos';
import Home from '../Home/Home';
import { Busqueda } from '../Busqueda/Busqueda';
import { EditarPlatillo } from '../EditarPlatillo/EditarPlatillo';

function Router() {
    return (
        <Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route path='/registrar-platillo' element={<MyForm/>}/>
            <Route path='/mostrar-platillo/page/:id' element={<MostrarPlatillos/>}/>
            <Route path='/mostrar-resultados' element={<Busqueda />} />
            <Route path='/editar-platillo/:id' element={<EditarPlatillo />} />
        </Routes>
    );
}

export default Router; 
