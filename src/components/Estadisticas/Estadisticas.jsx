import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';

import { Doughnut } from 'react-chartjs-2';

import './estadisticas.css';
import { useEffect, useState } from 'react';


ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);




const dashboard = () => {

    const [cantidadPlatillos,setCantidadPlatillos] = useState(0);
    const [cantidadUsuarios,setCantidadUsuarios] = useState(0);
    const [cantidadCalificaciones,setCantidadCalificaciones] = useState(0);

    useEffect(() => {
        setCantidadPlatillos(50);
        setCantidadUsuarios(30);
        setCantidadCalificaciones(675);
    });

    const data = {
        //labels: ['yes', 'no'],
        datasets: [{
            label: 'Poll',
            data: [83,350],
            backgroundColor: ['black', 'red'],
            borderColor: ['black', 'red'],
        }]
    }

    const options = {
        cutout: 30,
    }

    const textCenter = {
        id: 'textCenter',
        beforeDatasetsDraw(chart, args, pluginOption){
            const {ctx, data} = chart;
            ctx.save();
            ctx.font = 'bolder 15px sans-serif';
            ctx.fillStyle = 'red';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('100%', chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y);
        }
    }
    

    return(
        <div className="estadistica">

            <div className="tituloest">
                <h1>Dashboard - Analisis de calificacion</h1>
            </div>

            <div className="tasasRoscas">

                <div className='contenedorTasa'>
                    <div className="tasa">
                        <Doughnut data={data} options={options} plugins={[textCenter]} />
                    </div>
                    <div className='descripcionTasas'>
                        <p className='text'>Tasa de calificaciones ejecutadas en platillos tradicionales</p>
                        <p className='cantidad'>{cantidadCalificaciones}</p>
                    </div>
                </div>
                
                <div className="contenedorTasa">
                    <div className="tasa">
                        <Doughnut data={data} options={options} plugins={[textCenter]} />
                    </div>
                    <div className='descripcionTasas'>
                        <p className='text'>Tasa de calificaciones ejecutadas en platillos tradicionales</p>
                        <p className='cantidad'>450</p>
                    </div>
                </div>

            </div>

            <div className="totalesEst">

            </div>

            <div className="calificacionesEst">

            </div>

        </div>

        
    );
}

export default dashboard;