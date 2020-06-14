import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import Dropdown from "react-bootstrap/Dropdown";
//import { IJugador } from "./IJugador";
//component
import Tablero from "./Tablero";

export class JugadorLista extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      id: 0,
      nameUser: "",
      visibleHome: this.props.visibleHome,
      users: [this.props.users],
      visibleError: false,
      mensajeError: "",
      //historial
      cantidadEmpates: 0,
      cantidadGanadorHumano: 0,
      cantidadGanadorMaquina: 0,
      //tablero
      tableroLleno: [],
      //si hay ganador
      ganadorHumano: false,
      ganadorMaquina: false,
      empate: false,
    };
    this.NewGame = this.NewGame.bind(this);
  }
  NewGame(index: string) {
    console.log(index);
    this.setState({
      visible: true
    });
    axios
      .get("http://localhost:3001/user/" + index)
      .then((response) => {
        if(!response.data.msgError)
        {this.setState({
          id: response.data._id,
          nameUser: response.data.nombre,
          visible: true,
        });
        this.props.hideHome();
      }
      else{ 
        this.setState({
          visibleError: true,
          mensajeError: response.data.msgError
        })
      }
      })
      .catch((error) => {
        console.log(error);
          this.setState({
            visibleError: true,
            mensajeError: "Algo sucedio con la comunicacion con la base de datos"
          })
      });
  }

  render() {
    return (
      <div>
        <div className="container">
          {!this.state.visible ? (
            <div>
              <h4>Seleccione jugador.</h4>
              {this.state.visibleError ? (
                <div className="alert alert-danger" role="alert">
                {this.state.mensajeError}
              </div>
              ) : null}
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Jugadores Registrados
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {this.props.users.map((value: any, index: any) => {
                    return (
                      <Dropdown.Item
                        key={value._id}
                        onClick={() => this.NewGame(value._id)}
                      >{value.nombre}
                      </Dropdown.Item>
                    );
                  })}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          ) : null}
          <h1>{this.state.nameUser}</h1>
          {this.state.visible ? (
            <Tablero
              nameUser={this.state.nameUser}
              id={this.state.id}
              visible={this.state.visible}
              ganador={this.state.ganador}
              visibleHome={this.props.visibleHome}
              //tablero
              cantidadEmpates={this.state.cantidadEmpates}
              cantidadGanadorHumano={this.state.cantidadGanadorHumano}
              cantidadGanadorMaquina={this.state.cantidadGanadorMaquina}
              //tablero
              tableroLleno={this.state.tableroLleno}
              //si hay ganador
              ganadorHumano={this.state.ganadorHumano}
              ganadorMaquina={this.state.ganadorMaquina}
              empate={this.state.empate}
            />
          ) : null}
        </div>
      </div>
    );
  }
}
interface IJugadorState {
  id: number;
  nameUser: string;
  visible: boolean;
  ganador: boolean;
  visibleHome: boolean;
}
export default JugadorLista;
