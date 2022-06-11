import React, { Component } from "react";
import Modal from "./components/Modal";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      activeItem: {
        nombre_empresa: "",
        completed: "",
        direccion: "",
        nit: "",
        telefono: ""
      },
      empresas: []
    };
  }
  componentDidMount() {
    this.refreshList();
  }
  refreshList = () => {
    axios
      .get("http://localhost:8000/api/datos-empresas/")
      .then(res => this.setState({ empresas: res.data }))
      .catch(err => console.log(err));
  };
  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.empresas.filter(
      item => item.completed === viewCompleted
    );
    return newItems.map(item => (

      <table className="tabs">
        <tbody className="tbody-tabs">
          <tr>
            <th>NOMBRE EMPRESA</th>
            <th>DIRECCION</th>
            <th>NIT</th>
            <th>TELEFONO</th>
            <th>ACCION</th>
          </tr>
          <tr>
            <th>{item.nombre_empresa}</th>
            <th>{item.direccion}</th>
            <th>{item.nit}</th>
            <th>{item.telefono}</th>
            <th><span>
              <button
                onClick={() => this.editItem(item)}
                className="btn btn-secondary mr-2">
                {""}
                Edit{""}
              </button>
              <button
                onClick={() => this.handleDelete(item)}
                className="btn btn-danger"
              >
                Delete{" "}
              </button>
            </span></th>
          </tr>
        </tbody>
      </table>
    ));
  };
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
  handleSubmit = item => {
    this.toggle();
    if (item.id) {
      axios
        .put(`http://localhost:8000/api/datos-empresas//${item.id}/`, item)
        .then(res => this.refreshList());
      return;
    }
    axios
      .post("http://localhost:8000/api/datos-empresas/", item)
      .then(res => this.refreshList());
  };
  handleDelete = item => {
    axios
      .delete(`http://localhost:8000/api/datos-empresas/${item.id}`)
      .then(res => this.refreshList());
  };
  createItem = () => {
    const item = { nombre_empresa: "" };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };
  editItem = item => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };
  render() {
    return (
      <main className="content">
        <h1 className="text-white text-uppercase text-center my-4">LITLE THINKING</h1>
        <div className="row ">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="">
                <button onClick={this.createItem} className="btn-añadir">
                  <h1>+</h1>
                </button>
              </div>

              <ul className="list-group list-group-flush">
                {this.renderItems()}


              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}
export default App;
