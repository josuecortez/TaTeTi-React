import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { IJugador } from './IJugador';
//component
import Tablero from './Tablero';


export class Jugador extends React.Component<IJugador, IJugadorState> {
    constructor(props: IJugador) {
        super(props);
        this.state = {
            id: 0,
            nameUser: '',
            visible: false,
            ganador: false
        };
        this.NewGame = this.NewGame.bind(this);
    }
    NewGame(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        this.setState({
            nameUser: this.state.nameUser,
            visible: true
        })
        console.log(this.state.nameUser + "editado");
        console.log("toque el boton");
    }
    handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        console.log(e.target.value);
        this.setState({
            nameUser: e.target.value
        })
    }
    render() {
        return (
            <div>
                <div className="container">
                    {!this.state.visible ?
                        <div>
                            <h4>Ingresar nombre del participante para empezar a jugar.</h4>
                            <form onSubmit={e => this.NewGame(e)} className="form-row">
                                <div className="col-md-4"></div>
                                <input
                                    type="text"
                                    onChange={e => this.handleInputChange(e)}
                                    className="form-control col-md-4"
                                    placeholder="Ingresar nombre del participante" />
                                <button type="submit" className="btn btn-primary">
                                    Jugar
                                </button>
                            </form>
                        </div>
                        : null}
                    <h1>{this.state.nameUser}</h1>
                    {this.state.visible ? <Tablero 
                    nameUser={this.state.nameUser}
                    id={this.state.id}
                    visible={this.state.visible}
                    ganador={this.state.ganador}
                    /> : null}
                </div>
            </div>
        );
    }
}
interface IJugadorState {
    id: number,
    nameUser: string,
    visible: boolean,
    ganador: boolean
}
export default Jugador;