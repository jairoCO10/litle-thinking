// frontend/src/components/Modal.js

import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem
    };
  }

  handleChange = e => {
    let { name, value } = e.target;
    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }
    const activeItem = { ...this.state.activeItem, [name]: value };
    this.setState({ activeItem });
  };

  render() {
    const { toggle, onSave } = this.props;
    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}> AÑADIR EMPRESA</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="title">NOMBRE EMPRESA</Label>
              <Input
                type="text"
                name="nombre_empresa"
                value={this.state.activeItem.nombre_empresa}
                onChange={this.handleChange}
                placeholder="Ingrese el nombre de la empresa"
              />
            </FormGroup>
            <FormGroup>
              <Label for="direccion">DIRECCION</Label>
              <Input
                type="text"
                name="direccion"
                value={this.state.activeItem.direccion}
                onChange={this.handleChange}
                placeholder="Ingrese la direccion de la empresa"
              />
            </FormGroup>
            <FormGroup>
              <Label for="nit">NIT</Label>
              <Input
                type="text"
                name="nit"
                value={this.state.activeItem.nit}
                onChange={this.handleChange}
                placeholder="Ingrese el nit de la empresa"
              />
            </FormGroup>
            <FormGroup>
              <Label for="telefono">TELEFONO</Label>
              <Input
                type="text"
                name="telefono"
                value={this.state.activeItem.telefono}
                onChange={this.handleChange}
                placeholder="Ingrese el numero de telefono"
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => onSave(this.state.activeItem)}>
            GUARDAR
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
