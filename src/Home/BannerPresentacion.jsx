import React from 'react'
import './BannerPresentacion.css'
import ListaPlatillos from '../components/MenuPlatillos/menuPlatillos'
//import ListaPlatillos from '../../sprint2/ListaPlatillos/ListaPlatillos'


const BannerPresentacion = () => {
  return (
    <>
        <div className='banner'>
        <img className='banner-sticker' src="/src/assets/banner2.png" alt="sticker" />
        <div className='banner-contenido '>
          <div className='banner-contenedor-titulo'>
            <div className='banner-titulo'>
              <p>Rescatando </p>
              <ul className='banner-titulo-list'>
                <li className="banner-list-item">Sabores</li>
                <li className="banner-list-item">Cultura</li>
                <li className="banner-list-item">Tradición</li>
              </ul>
            </div>
      </div>
          <p className='banner-descripcion'> <strong>Un viaje por los sabores de nuestra historia y cultura. </strong>
          Rescatando sabores  invita a los visitantes a conocer y disfrutar de la variedad y riqueza de la comida boliviana, que refleja la diversidad cultural y geográfica del país.</p>
        </div>
      </div>
      <ListaPlatillos></ListaPlatillos>

    </>
  )
}
export default BannerPresentacion;
