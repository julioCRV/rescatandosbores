import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';

import { Doughnut } from 'react-chartjs-2';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);




const dashboard = () => {

    const data = {
        labels: ['yes', 'no'],
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
            ctx.font = 'bolder 30px sans-serif';
            ctx.fillStyle = 'red';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('100%', chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y);
        }
    }
    

    return(
        <div className="estadistica">
            <div className="tituloEst">
                <h1>Dashboard - Analisis de calificacion</h1>
            </div>
            <div className="tasasEst">
                <div className="tasaSi">
                    <Doughnut data={data} options={options} plugins={[textCenter]} />
                </div>
                <div className="tasaNo">
                    <Doughnut data={data} options={options} plugins={[textCenter]} />
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