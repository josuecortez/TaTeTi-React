import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Jugador from "./Jugador";
import JugadorLista from "./JugadorLista";
import axios from "axios";

class Body extends React.Component<any, any> {
  usersName: String[] = [];
  nombres: String[] = [];
  constructor(props: any) {
    super(props);
    this.state = {
      visibleHome: true,
      visibleLista: false,
      visibleJugador: false,
      users: [],
      visibleError: false,
      mensajeError: "",
    };
    this.registrar = this.registrar.bind(this);
    this.yaRegistrado = this.yaRegistrado.bind(this);
    this.hideHome = this.hideHome.bind(this);
  }
  hideHome() {
    this.setState({
      visibleHome: false,
    });
  }
  registrar() {
    if (!this.state.visibleJugador) {
      this.setState({
        visibleJugador: !this.state.visibleJugador,
        visibleLista: this.state.visibleJugador,
      });
    }
  }
  yaRegistrado() {
    if (!this.state.visibleLista) {
      var url = "http://localhost:3001/user/";
      axios
        .get(url)
        .then((response) => {
          if(!response.data.msgError)
          {this.setState({
            users: response.data,
          });
          console.log(this.state.users);}
        })
        .catch((error) => {
          console.log(error);
            this.setState({
              visibleError: true,
              mensajeError: "Algo sucedio con la comunicacion con la base de datos"
            })
        });

      this.setState({
        visibleLista: !this.state.visibleLista,
        visibleJugador: this.state.visibleLista,
      });
    }
  }
  render() {
    return (
      <div className="container" id="bienvenido">
        <h1 className="jumbotron-heading">Bienvenido a Ta Te Ti</h1>
        {this.state.visibleError ? (
                <div className="alert alert-danger" role="alert">
                {this.state.mensajeError}
              </div>
              ) : null}
        {this.state.visibleHome ? (
          <div>
            <div className="row">
              <button
                onClick={this.registrar}
                className="btn btn-primary col-md-4"
              >
                Puedes Registrarte
              </button>
              <button
                onClick={this.yaRegistrado}
                className="btn btn-primary col-md-4 offset-md-3"
              >
                Ya tengo usuario
              </button>
            </div>
            
          </div>
        ) : null}
        {this.state.visibleJugador ? (
          <Jugador
            nameUser={""}
            visible={false}
            ganador={false}
            id={0}
            hideHome={this.hideHome}
          />
        ) : null}
        {this.state.visibleLista ? (
          <JugadorLista
            nameUser={""}
            visible={false}
            ganador={false}
            hideHome={this.hideHome}
            users={this.state.users}
          />
        ) : null}
      </div>
    );
  }
}

export default Body;
