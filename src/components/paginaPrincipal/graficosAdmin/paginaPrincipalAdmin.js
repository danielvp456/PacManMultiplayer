import React, { Component, setState } from 'react'
import { Chart } from "react-google-charts";
import axios from 'axios'
import './paginaPrincipalAdmin.css';
export default class paginaPrincipalAdmin extends Component {


    state = {}

    constructor() {
        super();

        this.state = {
            jugadoresConectados: 0,
            jugadoresRegistrados: []
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

        const res = await axios.get('https://serverpacmanoage.herokuapp.com/estadisticasAdmin', { params: datosConsultarGraficas });

        this.setState({
            jugadoresConectados: res.data.jugadoresConectados,
            jugadoresRegistrados: res.data.jugadoresRegistrados,
        }
        )
    }

    jugadoresConectados() {
        return (
            <div>
                <h5 className='jugadoresConectados'>
                    Jugadores conectados:
                
                </h5>
                <h5 className='jugadoresConectadosDatos'>{this.state.jugadoresConectados}</h5>
            </div>
        )
    }

    graficaPartidas() {


        if (this.state.jugadoresRegistrados.length === 0) {

            return (
                <div>
                    no hay usuarios registrados :(
                </div>)
        } else {

            var datosAux = [['fecha', 'Cantidad'],]
            var totalAux = 0
            for (let index = 0; index < this.state.jugadoresRegistrados.length; index++) {
                const fecha = this.state.jugadoresRegistrados[index]._id
                totalAux = parseInt(this.state.jugadoresRegistrados[index].total) + totalAux
                datosAux.push([fecha, totalAux])
            }

            return (
                <div>
                    <Chart
                        width={'500px'}
                        height={'300px'}
                        chartType="AreaChart"
                        loader={<div>Loading Chart</div>}
                        data={datosAux}
                        options={{
                            isStacked: true,
                            height: 300,
                            legend: { position: 'top', maxLines: 3 },
                            vAxis: { minValue: 0 },
                        }}
                        rootProps={{ 'data-testid': '2' }}
                    />
                </div>
            )
        }
    }
    mapaMetodo() {

    }

    render() {
        const jugadoresConectadosAux = this.jugadoresConectados();
        const graficosCandidadUsuarios = this.graficaPartidas();

        return (
            <div className="div">

                <div className="card">
                    <div className="card-header" >
                        <h3 classclassName="card-title">Administrador</h3>
                    </div>
                    <div className="card">
                    <br></br>
                    {jugadoresConectadosAux}
                    </div>
                    <br></br>
                    <div align='center' className="cantidadUsuarios">
                    <h5 >Cantidad jugadores registrados a lo largo del tiempo</h5>
                    {graficosCandidadUsuarios}
                    </div>
                    
                </div>
            </div>
        )
    }
}
