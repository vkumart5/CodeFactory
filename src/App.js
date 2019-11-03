import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./components/login.component";
//import SignUp from "./components/signup.component";
import Home from "./components/home.component";

class App extends Component{

  constructor(props){
    super(props)
  }

  componentDidMount(){
    console.log("componentDidMount")
  }

  render() {
    return (
        <div className="App">
          <Container>
            <div className="auth-wrapper">
              <div className="auth-inner">
              <Router>
                <Switch>
                  <Route exact path='/' component={Login} />
                  <Route path="/home" component={Home} />
                </Switch>
              </Router>
              </div>
            </div>
          </Container>
        </div>

    );
  }
}

export default App;
