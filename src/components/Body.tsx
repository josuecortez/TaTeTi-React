import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Jugador from './Jugador';

class Body extends React.Component {
    
    render() {
        return (
            <div className="container" id="bienvenido">
                <h1 className="jumbotron-heading">Bienvenido a Ta Te Ti</h1>
                <Jugador 
                nameUser={''}
                visible={false}
                ganador={false}
                id={0}
                />
            </div>);
    }
}

export default Body;