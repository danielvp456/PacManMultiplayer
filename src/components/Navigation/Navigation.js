import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import swal from 'sweetalert';
import axios from 'axios'


export default class Navigation extends Component {



    checkLogin() {
        if (localStorage.getItem("correo") === null) {
            return (
                <div className="container">

                    <Link className="navbar-brand" to="/">
                        <i className="material-icons">
                            pacman                         
                             </i> multiplayer
                             
                    </Link>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav  ml-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/registro" > Registro</Link>
                            </li>
                            <li className="nav-item active">
                                <Link className="nav-link" to="/" > Login</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            )
        } else {
            if (localStorage.getItem('tipoDeUser') === 'admin') {
                return (
                    <div className="container">
    
                        <Link className="navbar-brand" to="/paginaPrincipalAdmin">
                            <i className="material-icons">
                                pacman </i> multiplayer
                        </Link>
    
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav  ml-auto">
                            <li className="nav-item active">
                                    <Link className="nav-link" to="/paginaPrincipalAdmin" > Admin</Link>
                                </li>
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/paginaPrincipalJugador" > Jugar</Link>
                                </li>
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/graficosJugador" > Estadisticas</Link>
                                </li>
                                <li className="nav-item active">
                                    <Link className="nav-link" onClick={this.cerrarSesion} to="/" > cerrar sesion</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                )
            } else if (localStorage.getItem('tipoDeUser') === 'jugador'){
                
                return (
                    <div className="container">
    
                        <Link className="navbar-brand" to="/paginaPrincipalJugador">
                            <i className="material-icons">
                                pacman </i> multiplayer
                        </Link>
    
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav  ml-auto">
    
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/paginaPrincipalJugador" > Jugar</Link>
                                </li>
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/graficosJugador" > Estadisticas</Link>
                                </li>
                                <li className="nav-item active">
                                    <Link className="nav-link" onClick={this.cerrarSesion} to="/" > cerrar sesion</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                )
            }
            
        }
    }

    cerrarSesion = async (e) => {
        e.preventDefault();
        await swal({
            title: '¿Está seguro de cerrar sesión?',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        }).then(async (cerrar) => {
            if (cerrar) {

                // cambiar estado a desconectado
                var correo = localStorage.getItem('correo');
                const estadoUser = {
                    correo: correo,
                    estado: "desconectado",
                };
                const res = await axios.patch('https://serverpacmanoage.herokuapp.com/', estadoUser);

                localStorage.clear();
                window.location.href = '/';
            }
        });
    }

    render() {
        const navegacion = this.checkLogin();
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light" >
                { this.checkLogin()}
            </nav>
        )
    }
}
