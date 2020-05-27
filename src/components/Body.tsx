import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Jugador from './Jugador';
import { IJugador } from './IJugador';

class Body extends React.Component<any, any>{
    constructor(props: IJugador) {
        super(props);
        this.state = {
            id: 0,
            nameUser: '',
        };
    }
    render() {
        return (
            <div className="container" id="bienvenido">
                <h1 className="jumbotron-heading">Bienvenido a Ta Te Ti</h1>
                <Jugador />
            </div>);
    }
}

export default Body;