import React, { Component } from 'react'

import axios from 'axios'
import swal from 'sweetalert';


export default class login extends Component {
    state = {
        correo: '',
        password: ''
    }

    constructor() {
        super();


        if ("geolocation" in navigator) {
            console.log("Available");
        } else {
            console.log("Not Available");
        }
        
        if (localStorage.getItem('correo') === null) {

        } else {
            if (localStorage.getItem('tipoDeUser') === 'admin') {
                window.location.href = '/paginaPrincipalAdmin';
            } else if (localStorage.getItem('tipoDeUser') === 'jugador') {

                window.location.href = '/paginaPrincipalJugador';
            }
        }
    }

    onInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const datosLogin = {
            correo: this.state.correo,
            password: this.state.password,
        };

        const res = await axios.post('https://serverpacmanoage.herokuapp.com/', datosLogin);
        const resultado = res.data.resultadoLogin;

        if (resultado === 'true') {
            // cambiar estado a conectado
            const estado = {
                correo: this.state.correo,
                estado: "conectado",
            };
            const resEstado = await axios.patch('https://serverpacmanoage.herokuapp.com/', estado);

            console.log(res.data.tipoDeUser)
            if (res.data.tipoDeUser === 'jugador') {
                localStorage.setItem('correo', this.state.correo);
                console.log(res.data)
                localStorage.setItem('tipoDeUser', res.data.tipoDeUser);
                window.location.href = '/paginaPrincipalJugador';
            } else if (res.data.tipoDeUser === 'admin') {
                localStorage.setItem('correo', this.state.correo);
                localStorage.setItem('tipoDeUser', res.data.tipoDeUser);
                window.location.href = '/paginaPrincipalAdmin';
            }
        } else {
            await swal({
                title: "El correo o la contraseña son incorrectos",
                text: "Vuelve a intentarlo otra vez",
                icon: "warning",
                timer: "4000"
            });

        }
    }

    render(

    ) {
        return (

            <div>


                <div className="card card-body col-md-6 offset-md-3">
                    <h3>
                        Login
                    </h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group" >
                            <input type="email" placeholder="correo" required className="form-control"
                                name="correo" onChange={this.onInputChange} value={this.state.correo} />
                        </div>

                        <div className="form-group" >
                            <input type="password" placeholder="contraseña" required className="form-control"
                                name="password" onChange={this.onInputChange} value={this.state.password} autoComplete="nope"
                            />
                        </div>

                        <button type="submit" className="btn btn-primary">
                            ingresar
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}
