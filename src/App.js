
import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

import Navigation from './components/Navigation/Navigation'
import registrarUser from './components/registro/registrarUser'
import login from './components/login/login';
import paginaPrincipalJugador from './components/paginaPrincipal/paginaPrincipalJugador/paginaPrincipalJugador';
import graficosJugador from './components/paginaPrincipal/graficosJugador/GraficosJugador';
import paginaPrincipalAdmin from './components/paginaPrincipal/graficosAdmin/paginaPrincipalAdmin';


function App() {
  return (
    <Router>
      <Navigation />
      <div className="container p-4">
        <Route path="/" exact component={login}></Route>
        <Route path="/registro" exact component={registrarUser}></Route>
        <Route path="/paginaPrincipalJugador" exact component={paginaPrincipalJugador}></Route>
        <Route path="/paginaPrincipalAdmin" exact component={paginaPrincipalAdmin}></Route>
        <Route path="/graficosJugador" exact component={graficosJugador}></Route>
      </div>
    </Router>
  );
}

export default App;
