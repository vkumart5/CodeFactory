import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from './components/login.component.js';
import Home from './components/home.component.js';
import Orders from './components/orders.component.js';
import Settings from './components/settings.component.js';

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
                  <Route path="/orders" component={Orders} />
                  <Route path="/settings" component={Settings} />
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
