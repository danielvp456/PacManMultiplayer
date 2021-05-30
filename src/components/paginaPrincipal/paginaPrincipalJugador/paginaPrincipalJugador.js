import React, { Component } from 'react'

export default class paginaPrincipal extends Component {

    constructor(props) {
        super(props);


        this.render = this.render.bind(this);
    }

    componentDidMount() {
        const correo = localStorage.getItem('correo');
    }
    render() {
        return (
            <div>

                <div className="card">
                    <div className="card-header">

                    </div>
                    <div className="card-body">
                        <iframe src="https://i.simmer.io/@DanielVp/pacmanmultiplayer" style={{width:"960px", height:"600px"}}></iframe>
                    </div>
                </div>

            </div>
        )
    }
}
