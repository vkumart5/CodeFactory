import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./components/login.component";
import SignUp from "./components/signup.component";

class App extends Component{

  constructor(props){
    super(props)
  }

  componentDidMount(){
    console.log("componentDidMount")
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Container>
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
              <div className="container">
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                  <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <Link className="nav-link" to={"/sign-in"}>Login</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>

            <div className="auth-wrapper">
              <div className="auth-inner">
                <Switch>
                  <Route exact path='/' component={Login} />
                  <Route path="/sign-in" component={Login} />
                  <Route path="/sign-up" component={SignUp} />
                </Switch>
              </div>
            </div>
          </Container>
        </div>
      </Router>
    );
  }
}

export default App;
