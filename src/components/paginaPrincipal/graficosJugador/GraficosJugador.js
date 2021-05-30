import React, { Component } from 'react'

import { Chart } from "react-google-charts";
import axios from 'axios'
import './GraficosJugador.css'


export default class paginaParaGraficos extends Component {

    state = {}

    constructor() {
        super();

        this.state = {
            totalPartidas: 0,
            puntajeTotal: 0,
            partidasGanadas: 0,
            minutosJugados: 0,
            segundosJugados: 0,
            jugadoresConectados: 0,
            tablaPuntajes: []
        }
        this.consultarDatos();
        setInterval(() => {
            this.consultarDatos();
        }, 10000);
    }
    async consultarDatos() {

        var correo = localStorage.getItem('correo');

        const datosConsultarGraficas = {
            "correo": correo
        };

        const res = await axios.get('https://serverpacmanoage.herokuapp.com/estadisticasJugador', { params: datosConsultarGraficas }).catch(function (error) {
            console.log("ERROR: " + error);
        });;

        this.setState({
            totalPartidas: res.data.totalPartidas,
            puntajeTotal: res.data.puntajeTotal,
            partidasGanadas: res.data.partidasGanadas,
            minutosJugados: res.data.minutosJugados,
            segundosJugados: res.data.segundosJugados,
            jugadoresConectados: res.data.jugadoresConectados,
            tablaPuntajes: res.data.tablaPuntajes,
        }
        )



    }
    graficaPartidas() {
        if (this.state.partidasGanadas === 0) {

            return (
                <div>
                    todavia no has jugado ninguna partida :(
                </div>)
        } else {
            return (
                <div>
                    <Chart
                        width={'1000'}
                        height={'600'}
                        chartType="PieChart"
                        loader={<div>Loading Chart</div>}

                        data={
                            [
                                ['partidas', 'numero de patidas'],
                                ['partidas ganadas', this.state.partidasGanadas],
                                ['partidas perdidas', (this.state.totalPartidas - this.state.partidasGanadas)],

                            ]}
                        options={{
                            title: 'porcentaje de partidas ganadas',
                        }}
                        rootProps={{ 'data-testid': '1' }}
                    />
                </div>
            )
        }
    }

    totalPartidasJugador() {

        return (

            
            <h5>
                Tu total de partidas jugadas es:&nbsp; 
                {this.state.totalPartidas}
            </h5>)
    }
    jugadoresConectados() {
        return (

            <div>
                <h5 className='jugadoresConectados'>
                    Jugadores conectados:&nbsp; 
                
                </h5>
                <h5 className='jugadoresConectadosDatos'>{this.state.jugadoresConectados}</h5>
            </div>
            )
    }
    puntajeTotalJugador() {
        return (
            <h5>
                Tu puntaje total es: &nbsp; 
                {this.state.puntajeTotal}
            </h5>)

    }

    tiempoJugado() {

        return (
            <h5>
                Haz jugado {this.state.minutosJugados} minutos y {this.state.segundosJugados} segundos

            </h5>)
    }

    tablaPuntajesMasAltos() {



        if (this.state.tablaPuntajes.length > 0) {
            return this.state.tablaPuntajes.map((item, key) =>

                <tr key={key}>
                    <th key={key + "key"}>{key + 1} </th>
                    <th key={key + "correo"}>{item.correo} </th>
                    <th key={key + "puntaje"}> {item.puntajeTotal}</th>
                </tr>
            )
        }

        return null


    }




    render() {

        const graficos = this.graficaPartidas();
        const totalPartidasAux = this.totalPartidasJugador();
        const jugadoresConectadosAux = this.jugadoresConectados();
        const puntajeTotalJugadorAux = this.puntajeTotalJugador();
        const tiempoJugadoAux = this.tiempoJugado();
        const tablaPuntajesMasAltosAux = this.tablaPuntajesMasAltos();
        return (
            <div className="div">
                <div className="card">
                    <div className="card-header" >
                        <h5 className="card-title">Tus estadisticas </h5>
                    </div>
                    <div className="row mx-auto">

                        <div className="col-sm-6">
                        <br/>
                            <div className="card">
                                <div align='center' className="card-body">
                                    <h2>
                                        Partidas ganadas vs Partidas Perdidas
                    </h2>
                                    {graficos}
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6">
                            <br/>
                        <div className="card">
                        <br/>
                        {jugadoresConectadosAux}
                        </div>
                            <div className="card">
                                <div className="card-body">
                                    {puntajeTotalJugadorAux}
                                    {tiempoJugadoAux}
                                    
                                    {totalPartidasAux}
                                </div>
                            </div>
                        </div>



                    </div>


                    <br></br>
                    <div align='center' className='top10Jugadores'>

                        <h2>
                            Top 10 jugadores
                    </h2>
                        <table className='tablaPuntajes'>

                            <thead>
                                <tr>
                                    <th>posicion</th>
                                    <th>Correo</th>
                                    <th>Puntaje</th>
                                </tr>
                            </thead>


                            <tbody>

                                {tablaPuntajesMasAltosAux}
                            </tbody>
                        </table>
                    </div>
                    <br></br>
                </div>
            </div>

        );
    }
}
