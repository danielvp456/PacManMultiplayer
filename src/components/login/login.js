import React, { Component } from 'react'

import axios from 'axios'
import swal from 'sweetalert';
import { Link } from 'react-router-dom';


export default class login extends Component {
    state = {
        correo: '',
        password: ''
    }

    constructor() {
        super();
        this.state = {
            logueado: false
        }
        console.log("Login");
    }

    onInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit = async (e) => {
        e.preventDefault();
        var correo = document.getElementById("correoUsuario").value;
        var contra = document.getElementById("contraseña").value;
        console.log("Tengo: " + correo + "  cs " + contra);
        const res = await axios.get('https://serverpacmanpage.herokuapp.com/server/users');

        for (let i = 0; i < res.data.length; i++) {
            if (res.data[i]._id == correo && res.data[i].pass == contra) {
                localStorage.setItem('correo', correo);
                localStorage.setItem('tipoDeUser', res.data[i].user_type);
                localStorage.setItem('ubicacion', "calle 21 Miami");
                localStorage.setItem('logued', 'true');
                this.setState({ logueado: true });
                window.location.href = '/paginaPrincipalJugador';
            }
        }

        if (localStorage.getItem("logued") !== "true") {
            await swal({
                title: "El correo o la contraseña son incorrectos",
                text: "Vuelve a intentarlo otra vez",
                icon: "warning",
                timer: "4000"
            });
            this.setState({ logueado: false });
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
                                name="correo" onChange={this.onInputChange} value={this.state.correo} id="correoUsuario" />
                        </div>

                        <div className="form-group" >
                            <input type="password" placeholder="contraseña" required className="form-control" id="contraseña"
                                name="password" onChange={this.onInputChange} value={this.state.password} autoComplete="nope"
                            />
                        </div>
                        {!this.state.logueado && <button type="submit" className="btn btn-primary">
                            ingresar
                        </button>}

                        {this.state.logueado && <Link className="btn btn-lg btn-primary" aria-current="page" to="/paginaPrincipalJugador"> Quiero Jugar </Link>}

                    </form>
                </div>
            </div>
        )
    }
}
