import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav} from 'react-bootstrap';

export default class Orders extends Component {

  constructor(props){
    super(props)
  }

  componentDidMount(){
    console.log("componentDidMount Product Home")
  }

  render() {
    return (
      <div className="home">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/home">MENU</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/home">Product</Nav.Link>
            <Nav.Link href="/orders" className="active">Orders</Nav.Link>
            <Nav.Link href="/settings">Settings</Nav.Link>
          </Nav>
        </Navbar>
        <h1>Orders</h1>
      </div>
    );
  }
}
