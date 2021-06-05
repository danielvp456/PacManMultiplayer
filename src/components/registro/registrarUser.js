import React, { Component } from 'react'

import axios from 'axios';
import swal from 'sweetalert';


export default class registrarUser extends Component {

    state = {
        correo: '',
        userName: '',
        password: '',
        password2: '',
        numberPhone: 0

    }
    constructor() {
        super();
        console.log(localStorage.getItem('correo'), "hollaaaaaaaaaaaaaa")
        if (localStorage.getItem('correo') === null) {

        } else {
            if (localStorage.getItem('tipoDeUser') === 'admin') {
                window.location.href = '/paginaPrincipalAdmin';
            } else if (localStorage.getItem('tipoDeUser') === 'jugador'){
                
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
        const datosRegistro = {
            _id: this.state.correo,
            nombre: this.state.userName,
            pass: this.state.password,
            user_type: "user",
            telefono: this.state.numberPhone,
            usuario_conectado: "false"
        };
        
        if (this.state.password === this.state.password2) {
            const res = await axios.post('https://serverpacmanpage.herokuapp.com/server/users/', datosRegistro);
            const resultado = res;
            console.log(resultado.statusText);
            if (resultado.statusText == 'OK') {
                await swal({
                    title: "Registro Exitoso, disfruta del juego",
                    text: "",
                    icon: "success",
                    timer: "3000"
                });
                window.location.href = '/';
            } else {
                await swal({
                    title: "Algo salió mal",
                    text: "Porfavor revisa que todo esté bien",
                    icon: "warning",
                    timer: "3000"
                });

            }

        } else {
            await swal({
                title: "Las contraseñas no coinciden",
                text: "Por favor, verifica que las contraseñas esten bien verificadas",
                icon: "warning",
                timer: "3000"
            });

        }



    }
    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className=" card card-body">
                    <h4>registrate</h4>

                    <form onSubmit={this.onSubmit}>
                        <div className="form-group" >
                            <input type="email" placeholder="correo" required className="form-control"
                                name="correo" onChange={this.onInputChange} value={this.state.correo} />
                        </div>

                        <div className="form-group" >
                            <input type="text" placeholder="nombre" required className="form-control"
                                name="userName" onChange={this.onInputChange} value={this.state.nombre} />
                        </div>

                        <div className="form-group" >
                            <input type="password" placeholder="contraseña" required className="form-control"
                                name="password" onChange={this.onInputChange} value={this.state.password} autoComplete="nope"
                            />
                        </div>
                        <div className="form-group" >
                            <input type="password" placeholder="repita la contraseña" required className="form-control"
                                name="password2" onChange={this.onInputChange} value={this.state.password2} autoComplete="nope"
                            />
                        </div>
                        <div className="form-group" >
                            <input type="number" placeholder="telefono" required className="form-control"
                                name="numberPhone" onChange={this.onInputChange} value={this.state.telefono} />
                        </div>



                        <button type="submit" className="btn btn-primary">
                            Registrar
                        </button>


                    </form>

                </div>

            </div>
        )
    }
}
