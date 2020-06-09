import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../css/tablero.css";
import { IJugador } from "./IJugador";

export class Tablero extends React.Component<IJugador, IJugadorState> {

  constructor(props: IJugador) {
    super(props);
    this.state = {
      id: this.props.id,
      nameUser: this.props.nameUser,
      ganador: this.props.ganador,
      visible: this.props.visible,
      ganadosJugador: 0,
      ganadosMaquina: 0,
      empatados: 0,
      elements: [1,2,3,4,5,6,7,8,9],
      ocupado: []
    };
  }
  clickCelda(i: number) {
    
    const siEsta = this.state.ocupado.indexOf(i);
    if(siEsta === -1) {
      this.setState({
        ocupado: [...this.state.ocupado, i]
      })
    } 
    console.log(this.state.ocupado);
    this.setState({
      ganadosJugador: this.state.ganadosJugador + 1
    })
    
    console.log(this.state.ganadosJugador);
  }
  render() {
    return (
      <div className="card card-body">
        <div className="row">
          <button
            className="btn btn-primary col-md-4"
            disabled={this.state.ganador}
          >
            Volver a jugar
          </button>
          <button className="btn btn-danger col-md-4 offset-md-3">
            Reiniciar Juego
          </button>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="col">
              <p className="lead text-muted" id="turno">
                El turno es de {this.state.nameUser}
              </p>

              <div className="tablero" id="tablero">
                {/* <div className="celda" id="0"></div>
                <div className="celda" id="1"></div>
                <div className="celda" id="2"></div>
                <div className="celda" id="3"></div>
                <div className="celda" id="4"></div>
                <div className="celda" id="5"></div>
                <div className="celda" id="6"></div>
                <div className="celda" id="7"></div>
                <div className="celda" id="8"></div> */}
                {this.state.elements.map((value, index) => {
                  return (
                    <div
                      className="celda"
                      key={index}
                      onClick={() => {
                        this.clickCelda(index);
                      }}
                    ></div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="col-md-6 p-4">
            <div>
              <div className="col">
                <table className="table" id="Historial">
                  <thead>
                    <tr>
                      <th scope="col">Historial de Partidas</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th id="tbJugador1">{this.state.nameUser}</th>
                      <td>{this.state.ganadosJugador}</td>
                    </tr>
                    <tr>
                      <th>Máquina</th>
                      <td>{this.state.ganadosMaquina}</td>
                    </tr>
                    <tr>
                      <th>Empatados</th>
                      <td>{this.state.empatados}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
interface IJugadorState {
  id: number;
  nameUser: string;
  ganador: boolean;
  visible: boolean;
  ganadosJugador: number;
  ganadosMaquina: number;
  empatados: number;
  elements: number[];
  ocupado: number[];
}
export default Tablero;
