import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';

import { Doughnut } from 'react-chartjs-2';

import './estadisticas.css';


ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);




const dashboard = () => {

    const data = {
        //labels: ['yes', 'no'],
        datasets: [{
            label: 'Poll',
            data: [3,6],
            backgroundColor: ['black', 'red'],
            borderColor: ['black', 'red'],
        }]
    }

    const options = {}

    const textCenter = {
        id: 'textCenter',
        beforeDatasetsDraw(chart, args, pluginOption){
            const {ctx, data} = chart;
            ctx.save();
            ctx.font = 'bolder 20px sans-serif';
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
                    <div>
                        <p className='text'>Tasa de calificaciones ejecutadas en platillos tradicionales</p>
                        <p className='cantidad'>450</p>
                    </div>
                </div>
                
                <div className="contenedorTasa">
                    <div className="tasa">
                        <Doughnut data={data} options={options} plugins={[textCenter]} />
                    </div>
                    <div>
                        <p className='text'>Tasa de calificaciones no ejecutadas en platillos tradicionales</p>
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