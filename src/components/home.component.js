import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav} from 'react-bootstrap';

export default class Home extends Component {

  constructor(props){
    super(props)
  }

  componentDidMount(){
    console.log("componentDidMount Home")
  }

  render() {
    return (
      <div className="home">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">MENU</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#product">Product</Nav.Link>
            <Nav.Link href="#orders">Orders</Nav.Link>
            <Nav.Link href="#pricing">Settings</Nav.Link>
          </Nav>
        </Navbar>
      </div>
    );
  }
}
