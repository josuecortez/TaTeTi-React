import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "../css/tablero.css";
//import { IJugador } from "./IJugador";

export class Tablero extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      nameUser: this.props.nameUser,
      ganador: this.props.ganador,
      visible: this.props.visible,
      visibleError: false,
      mensajeError: "",
      //para cargar tablero
      tableroLleno: [],
      //historial
      cantidadEmpates: 0,
      cantidadGanadorHumano: 0,
      cantidadGanadorMaquina: 0,
      //si hay ganador
      ganadorHumano: false,
      ganadorMaquina: false,
      empate: false,
    };
  }

  componentWillReceiveProps(nextProps: any) {
    if (this.props.id) {
      console.log("entro al if");
      axios
        .get("http://localhost:3001/tablero", {
          headers: { id: this.props.id },
        })
        .then((response) => {
          if (!response.data.msgError) {
            let tableroCompleto: Number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            let tablero: String[] = [];
            tableroCompleto.map((value, index) => {
              if (response.data.tableroHumano.find((e: any) => e === value)) {
                let valor = "🅾";
                tablero.push(valor);
              } else {
                if (
                  response.data.tableroMaquina.find((e: any) => e === value)
                ) {
                  let valor = "✘";
                  tablero.push(valor);
                } else {
                  let valor = "";
                  tablero.push(valor);
                }
              }
            });
            if (
              response.data.empate ||
              response.data.ganadorHumano ||
              response.data.ganadorMaquina
            ) {
              this.setState({
                ganador: true,
              });
            }
            this.setState({
              //historial
              nameUser: this.props.nameUser,
              cantidadEmpates: response.data.cantidadEmpates,
              cantidadGanadorHumano: response.data.cantidadGanadorHumano,
              cantidadGanadorMaquina: response.data.cantidadGanadorMaquina,
              //tablero
              tableroLleno: tablero,
              //si hay ganador
              ganadorHumano: response.data.ganadorHumano,
              ganadorMaquina: response.data.ganadorMaquina,
              empate: response.data.empate,
            });
          } else {
            this.setState({
              visibleError: true,
              mensajeError: response.data.msgError,
            });
          }
        })
        .catch((error) => {
          console.log("error " + error);
          this.setState({
            visibleError: true,
            mensajeError:
              "Algo sucedio con la comunicacion con la base de datos",
          });
        });
    }
  }
  reiniciarHistorial() {
    axios
      .get("http://localhost:3001/reiniciarHistorial/", {
        headers: { id: this.props.id },
      })
      .then((response) => {
        if (!response.data.msgError) {
          this.setState({
            //historial
            cantidadEmpates: response.data.cantidadEmpates,
            cantidadGanadorHumano: response.data.cantidadGanadorHumano,
            cantidadGanadorMaquina: response.data.cantidadGanadorMaquina,
            //si hay ganador
            ganadorHumano: response.data.ganadorHumano,
            ganadorMaquina: response.data.ganadorMaquina,
            empate: response.data.empate,
          });
        } else {
          this.setState({
            visibleError: true,
            mensajeError: response.data.msgError,
          });
        }
      })
      .catch((error) => {
        console.log("error " + error);
        this.setState({
          visibleError: true,
          mensajeError: "Algo sucedio con la comunicacion con la base de datos",
        });
      });
  }
  reiniciar() {
    this.setState({
      ganador: false,
    });
    axios
      .get("http://localhost:3001/tableroReiniciar/", {
        headers: { id: this.props.id },
      })
      .then((response) => {
        if (!response.data.msgError) {
          let tableroCompleto: Number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
          let tablero: String[] = [];
          tableroCompleto.map((value, index) => {
            if (response.data.tableroHumano.find((e: any) => e === value)) {
              let valor = "🅾";
              tablero.push(valor);
            } else {
              if (response.data.tableroMaquina.find((e: any) => e === value)) {
                let valor = "✘";
                tablero.push(valor);
              } else {
                let valor = "";
                tablero.push(valor);
              }
            }
          });
          this.setState({
            //historial
            cantidadEmpates: response.data.cantidadEmpates,
            cantidadGanadorHumano: response.data.cantidadGanadorHumano,
            cantidadGanadorMaquina: response.data.cantidadGanadorMaquina,
            //tablero
            tableroLleno: tablero,
            //si hay ganador
            ganadorHumano: response.data.ganadorHumano,
            ganadorMaquina: response.data.ganadorMaquina,
            empate: response.data.empate,
          });
        } else {
          this.setState({
            visibleError: true,
            mensajeError: response.data.msgError,
          });
        }
      })
      .catch((error) => {
        console.log("error " + error);
        this.setState({
          visibleError: true,
          mensajeError: "Algo sucedio con la comunicacion con la base de datos",
        });
      });
  }
  clickCelda(i: number) {
    let idCelda = i + 1;
    //traer el tablero
    axios
      .get("http://localhost:3001/tablero/" + idCelda, {
        headers: { id: this.props.id },
      })
      .then((response) => {
        // If request is good...
        //'🅾' : '✘'
        if (!response.data.msgError) {
          let tableroCompleto: Number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
          let tablero: String[] = [];
          tableroCompleto.map((value, index) => {
            if (response.data.tableroHumano.find((e: any) => e === value)) {
              let valor = "🅾";
              tablero.push(valor);
            } else {
              if (response.data.tableroMaquina.find((e: any) => e === value)) {
                let valor = "✘";
                tablero.push(valor);
              } else {
                let valor = "";
                tablero.push(valor);
              }
            }
          });
          if (
            response.data.empate ||
            response.data.ganadorHumano ||
            response.data.ganadorMaquina
          ) {
            this.setState({
              ganador: true,
            });
          }
          this.setState({
            //historial
            cantidadEmpates: response.data.cantidadEmpates,
            cantidadGanadorHumano: response.data.cantidadGanadorHumano,
            cantidadGanadorMaquina: response.data.cantidadGanadorMaquina,
            //tablero
            tableroLleno: tablero,
            //si hay ganador
            ganadorHumano: response.data.ganadorHumano,
            ganadorMaquina: response.data.ganadorMaquina,
            empate: response.data.empate,
          });
        } else {
          this.setState({
            visibleError: true,
            mensajeError: response.data.msgError,
          });
        }
      })
      .catch((error) => {
        console.log("error " + error);
        this.setState({
          visibleError: true,
          mensajeError: "Algo sucedio con la comunicacion con la base de datos",
        });
      });
  }
  goHome() {
    window.location.reload();
  }
  render() {
    //let tableroLleno = this.props.tableroLleno;
    return (
      <div className="card card-body">
        {this.state.visibleError ? (
          <div className="alert alert-danger" role="alert">
            {this.state.mensajeError}
          </div>
        ) : null}
        <div className="row">
          <button
            className="btn btn-primary col-md-4"
            disabled={!this.state.ganador}
            onClick={() => {
              this.reiniciar();
            }}
          >
            Volver a jugar
          </button>
          <button
            className="btn btn-primary col-md-4 offset-md-3"
            onClick={() => {
              this.goHome();
            }}
          >
            🏚 Ir al inicio
          </button>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="col">
              <p className="lead text-muted">
                El turno es de {this.state.nameUser} y su ficha es 🅾
              </p>
              <div className="tablero" id="tablero">
                {this.state.tableroLleno.map((value: any, index: any) => {
                  return (
                    <div
                      className="celda"
                      key={index}
                      onClick={() => {
                        this.clickCelda(index);
                      }}
                    >
                      {value}
                    </div>
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
                      <td>{this.state.cantidadGanadorHumano}</td>
                    </tr>
                    <tr>
                      <th>Máquina</th>
                      <td>{this.state.cantidadGanadorMaquina}</td>
                    </tr>
                    <tr>
                      <th>Empatados</th>
                      <td>{this.state.cantidadEmpates}</td>
                    </tr>
                  </tbody>
                </table>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    this.reiniciarHistorial();
                  }}
                >
                  Reiniciar Historial
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Tablero;
