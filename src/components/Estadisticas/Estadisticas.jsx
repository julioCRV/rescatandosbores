import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
} from 'chart.js';

import React, { useEffect, useRef, useState } from 'react';
import { Doughnut,Line } from 'react-chartjs-2';
import { Col } from 'antd';
import './Estadisticas.css';
import axios from 'axios';


ChartJS.register(ArcElement,Tooltip,Legend,LineElement,CategoryScale,LinearScale,PointElement);




const dashboard = () => {

    const [cantidadPlatillos,setCantidadPlatillos] = useState(0);
    const [cantidadUsuarios,setCantidadUsuarios] = useState(0);
    const [cantidadCalificados,setCantidadCalificados] = useState(0);
    const [totalCalificaciones,setTotalCalificaciones] = useState(0);
    const [porcentajeSi,setPorcentajeSi] = useState(0);
    const porcentajeSiRef = useRef(porcentajeSi);
    const [porcentajeNo,setPorcentajeNo] = useState(0);
    const porcentajeNoRef = useRef(porcentajeNo);
    const [datosMensuales,setDatosMensuales] = useState([]);

    const fetchData = async () => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhZG1pbkBleGFtcGxlLmNvbSIsInJvbCI6ImFkbWluaXN0cmFkb3IiLCJpYXQiOjE3MDAxNDY3NDcsImV4cCI6MTcwMDE0NzY0N30.T0W4bXuw867q89o-HBEYVfDtB54qfyOXgCo2Rv6MSyI';
  
        const axiosConfig = {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
            }
        };
        try {
            
            const responsePlatillos = await axios.get('http://18.116.106.247:3000/contarPlatillos', axiosConfig);
            setCantidadPlatillos(responsePlatillos.data.total_platillos);
    
            const responseEstadisticas = await axios.get('http://18.116.106.247:3000/obtenerEstadisticas', axiosConfig);
            console.log(responseEstadisticas);
            const data = responseEstadisticas.data;
            setCantidadUsuarios(data.totalUsuarios.total_usuarios);
            const likes = data.likesMes;
            const datosLikes = [];
            let cantidadT = 0;
            likes.forEach(like => {
                cantidadT += parseInt(like.cantidad_likes);
                datosLikes.push(like.cantidad_likes);
            });
            setCantidadCalificados(cantidadT);
            setDatosMensuales(datosLikes);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    };
    
    useEffect(() => {
        
        fetchData();
    }, []);
    
    // Mover los cálculos después de que los estados se hayan actualizado
    useEffect(() => {
        setTotalCalificaciones(cantidadUsuarios * cantidadPlatillos);
    
        const porcentajeSiCalculado = (cantidadCalificados / totalCalificaciones) * 100;
        setPorcentajeSi(Number(porcentajeSiCalculado.toFixed(2)));
    
        const porcentajeNoCalculado = (totalCalificaciones - cantidadCalificados) / totalCalificaciones * 100;
        setPorcentajeNo(Number(porcentajeNoCalculado.toFixed(2)));
    
        porcentajeSiRef.current = porcentajeSi;
        porcentajeNoRef.current = porcentajeNo;
    },);
    
    /*
    useEffect(() => {
        
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhZG1pbkBleGFtcGxlLmNvbSIsInJvbCI6ImFkbWluaXN0cmFkb3IiLCJpYXQiOjE3MDAxNDU3NjAsImV4cCI6MTcwMDE0NjY2MH0.0iL7hIR58V4SOfzHCY0S25J76qNXg_A6znA1kC1VoG4';
  
    const axiosConfig = {
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
        }
    };
        
    const fetchData = async () =>{
        try{
            const responsePlatillos = await axios.get('http://18.116.106.247:3000/contarPlatillos', axiosConfig);
            setCantidadPlatillos(responsePlatillos.data.total_platillos);

            const responseEstadisticas = await axios.get('http://18.116.106.247:3000/obtenerEstadisticas', axiosConfig);
            console.log(responseEstadisticas);
            const data = responseEstadisticas.data;
            setCantidadUsuarios(data.totalUsuarios.total_usuarios);
            const likes = data.likesMes;
            const datosLikes = [];
            let cantidadT = 0;
            likes.forEach(like => {
                cantidadT += parseInt(like.cantidad_likes);
                datosLikes.push(like.cantidad_likes);
            });
            setCantidadCalificados(cantidadT);
            setDatosMensuales(datosLikes);
            setTotalCalificaciones(cantidadUsuarios*cantidadPlatillos);
        
            const porcentajeSiCalculado = (cantidadCalificados/totalCalificaciones)*100;
            setPorcentajeSi(Number(porcentajeSiCalculado.toFixed(2)));
            
            const porcentajeNoCalculado = (totalCalificaciones-cantidadCalificados)/totalCalificaciones*100;
            setPorcentajeNo(Number(porcentajeNoCalculado.toFixed(2)));
            
            porcentajeSiRef.current = porcentajeSi;
            porcentajeNoRef.current = porcentajeNo;

        }catch (error){
            console.error('Error al obtener los datos: ',error);
        }
    };

    fetchData();

       
        
    });*/

    const dataSi = {
        datasets: [{
            data: [porcentajeSi,100-porcentajeSi],
            backgroundColor: ['red', 'black'],
            borderColor: ['red', 'black'],
        }]
    }

    const dataNo = {
        datasets: [{
            data: [porcentajeNo,100-porcentajeNo],
            backgroundColor: ['red', 'black'],
            borderColor: ['red', 'black'],
        }]
    }

    const options = {
        cutout: 40,
        responsive:true
    }

    const textCenterSi = {
        id: 'textCenterSi',
        beforeDatasetsDraw(chart, args, pluginOption){
            const {ctx, data} = chart;
            ctx.save();
            ctx.font = 'bolder 15px sans-serif';
            ctx.fillStyle = 'red';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            const porcentajeSi = porcentajeSiRef.current;
            ctx.fillText(porcentajeSi+'%', chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y);
        }
    }

    const textCenterNo = {
        id: 'textCenterNo',
        beforeDatasetsDraw(chart, args, pluginOption){
            const {ctx, data} = chart;
            ctx.save();
            ctx.font = 'bolder 15px sans-serif';
            ctx.fillStyle = 'red';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            const porcentajeNo = porcentajeNoRef.current;
            ctx.fillText(porcentajeNo+'%', chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y);
        }
    }

    const dataAnual ={
        labels: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        datasets: [{
            label: 'Cantidad',
            data: datosMensuales,
            backgroundColor: 'aqua',
            borderColor: 'black',
            pointBorderColor: 'aqua',
            fill: true,
            tension: 0.4
        }]
    }

    const optionAnual = {
        plugins: {
            legend: {
                display: false,
            }
        },
    }

    return(
        <div className="estadistica">

            <div className="tituloest">
                <h1>Dashboard - Analisis de calificacion</h1>
            </div>

            <div className="tasasRoscas">

                <div className='contenedorTasa'>
                    <div className="tasa">
                        <Doughnut data={dataSi} options={options} plugins={[textCenterSi]} />
                    </div>
                    <div className='descripcionTasas'>
                        <p className='text'>Tasa de calificaciones ejecutadas en platillos tradicionales</p>
                        <p className='cantidad'>{cantidadCalificados}</p>
                    </div>
                </div>
                
                <div className="contenedorTasa">
                    <div className="tasa">
                        <Doughnut data={dataNo} options={options} plugins={[textCenterNo]} style={{height:'128px',width:'128px'}}/>
                    </div>
                    <div className='descripcionTasas'>
                        <p className='text'>Tasa de calificaciones no ejecutadas en platillos tradicionales</p>
                        <p className='cantidad'>{totalCalificaciones-cantidadCalificados}</p>
                    </div>
                </div>

            </div>

            <div className="totalesEst">

                <div className='contenedorTotal'>
                    <div className='iconTotal'>
                        <img className='iconTotal' src="./src/assets/sopa-caliente.png" alt="platillo" />
                    </div>
                    <div className='descripcionTotal'>
                        <p className='cantidad'>{cantidadPlatillos}</p>
                        <p className='text'>Platillos Totales</p>
                    </div>
                </div>

                <div className='contenedorTotal'>
                    <div className='iconTotal'>
                        <img className='iconTotal' src="./src/assets/grupo.png" alt="usuarios" />
                    </div>
                    <div className='descripcionTotal'>
                    <p className='cantidad'>{cantidadUsuarios}</p>
                        <p className='text'>Usuarios Totales</p>
                    </div>
                </div>

                <div className='contenedorTotal'>
                    <div className='iconTotal'>
                        <img className='iconTotal' src="./src/assets/corazon.png" alt="calificaciones" />
                    </div>
                    <div className='descripcionTotal'>
                        <p className='cantidad'>{totalCalificaciones}</p>
                        <p className='text'>Calificaciones Totales</p>
                    </div>
                </div>

            </div>

            <div className="calificacionesEst">
                <h3>Calificaciones Mensuales de 2023</h3>
                <div className='contenedorGrafico'>
                    <Line data={dataAnual} options={optionAnual}></Line>
                    <p className='cantidad'>Total: {cantidadCalificados}</p>
                </div>
            </div>

        </div>

        
    );
}

export default dashboard;