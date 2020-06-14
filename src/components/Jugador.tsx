import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
//import { IJugador } from "./IJugador";
//component
import Tablero from "./Tablero";

export class Jugador extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      id: 0,
      nameUser: "",
      visible: false,
      visibleError: false,
      mensajeError: "",
      //historial
      cantidadEmpates: 0,
      cantidadGanadorHumano: 0,
      cantidadGanadorMaquina: 0,
      //tablero
      tableroLleno: [],
      tableroMaquina: [],
      tableroHumano: [],
      //si hay ganador
      ganadorHumano: false,
      ganadorMaquina: false,
      empate: false,
    };
    this.NewGame = this.NewGame.bind(this);
  }
  NewGame(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    //postear el usuario

    axios
      .post("http://localhost:3001/user", {
        name: this.state.nameUser,
      })
      .then(
        (response) => {
          if(!response.data.msgError){
            this.setState({
              id: response.data._id,
              nameUser: response.data.nombre,
              visible: true,
            });
            //traer el tablero
            axios
              .get("http://localhost:3001/tablero", {
                headers: { id: this.state.id },
              })
              .then((response) => {
                // If request is good...
                //crear el tablero de verdad
                let tableroCompleto : Number[] = [1,2,3,4,5,6,7,8,9]; 
                let tablero : [] = [];
                let tableroActualizado = {
                  valor: "",
                }; 
                tableroCompleto.map((value,index) =>{
                  //'🅾' : '✘'
                    if(response.data.tableroHumano.find(value)){
                      tableroActualizado.valor = '🅾';
                      //tablero.push(tableroActualizado);
                    }
                    if(response.data.tableroMaquina.find(value)){
                      tableroActualizado.valor = '✘';
                      //tablero.push(tableroActualizado);
                    }
                    else {
                      tableroActualizado.valor = "";
                     // tablero.push(tableroActualizado.valor)
                    }
                    
                })
                this.setState({
                  //historial
                  cantidadEmpates: response.data.cantidadEmpates,
                  cantidadGanadorHumano: 0,
                  cantidadGanadorMaquina: 0,
                  //tablero
                  tableroLleno: response.data.tableroOcupado,
                  tableroMaquina: response.data.tableroMaquina,
                  tableroHumano: response.data.tableroHumano,
                  //si hay ganador
                  ganadorHumano: response.data.ganadorHumano,
                  ganadorMaquina: response.data.ganadorMaquina,
                  empate: response.data.empate,
                });
              })
              .catch((error) => {
                console.log("error " + error);
              });
            this.props.hideHome();
          }
          this.setState({
            visibleError: true,
            mensajeError: response.data.msgError
          })
          
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            visibleError: true,
            mensajeError: "Algo sucedio con la comunicacion con la base de datos"
          })
        }
      );
  }
  handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      nameUser: e.target.value,
    });
  }
  render() {
    return (
      <div>
        <div className="container">
          {!this.state.visible ? (
            <div>
              {this.state.visibleError ? (
                <div className="alert alert-danger" role="alert">
                {this.state.mensajeError}
              </div>
              ) : null}
              <h4>Ingresar nombre del participante para empezar a jugar.</h4>
              <form onSubmit={(e) => this.NewGame(e)} className="form-row">
                <div className="col-md-4"></div>
                <input
                  type="text"
                  onChange={(e) => this.handleInputChange(e)}
                  className="form-control col-md-4"
                  placeholder="Ingresar nombre del participante"
                />
                <button type="submit" className="btn btn-primary">
                  Jugar
                </button>
              </form>
            </div>
          ) : null}
          <h1>Su nombre es: {this.state.nameUser} y su ficha es 🅾</h1>
          {this.state.visible ? (
            <Tablero
              //usuario
              nameUser={this.state.nameUser}
              id={this.state.id}
              visible={this.state.visible}
              ganador={this.state.ganador}
              //tablero
              cantidadEmpates={this.state.cantidadEmpates}
              cantidadGanadorHumano={this.state.cantidadGanadorHumano}
              cantidadGanadorMaquina={this.state.cantidadGanadorMaquina}
              //tablero
              tableroLleno={this.state.tableroLleno}
              tableroMaquina={this.state.tableroMaquina}
              tableroHumano={this.state.tableroHumano}
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
export default Jugador;
