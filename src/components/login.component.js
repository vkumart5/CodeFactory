import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Alert} from 'react-bootstrap';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

export default class Login extends Component {

  constructor(props){
    super(props)
    this.state = {
      email: null,
      password: null,
      token: null,
      statusCode: null
    }
  }

  componentDidMount(){
    console.log("componentDidMount")
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.userAuthentication(this.state.email, this.state.password)
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  userAuthentication(email, password){
    const referenceThis = this
    //console.log(referenceThis.state)
    fetch('/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"name" : email,"password" : password})
    })
    .then(function(response) {
      if (!response.ok) {
        referenceThis.handleErrorResponse(response)
        throw Error(response.status)
      }
      else{
        return response.json()
      }
    })
    .then(function(data) {
      referenceThis.setState({
        token: data,
        statusCode: 200
      })
      console.log(referenceThis.state)
      referenceThis.handleAuth(data.accessToken)
    })
    .catch(function(error) {
        console.log(error)
    })
  }

  handleErrorResponse(error){
    //console.log(error.status)
    let errorMessage = null

    if(error.status === 400){
      console.log(error.status, "Cannot find user")
      errorMessage = "Cannot find user"
    }
    else if(error.status === 403){
      console.log(error.status, "Incorrect password")
      errorMessage = "Incorrect password"
    }
    else{
      console.log(error.status, "Bad request")
      errorMessage = "Bad request"

    }
    this.setState({
      token: errorMessage,
      statusCode: error.status
    })
    console.log(this.state)
  }

  handleAuth(token){
    fetch('/users/auth', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      }
    })
    .then(function(response) {
      if (!response.ok) {
        console.log(response)
        throw Error(response.status)
      }
      else{
        return response.json()
      }
    })
    .then(function(data) {
      console.log(data)
      history.push('/home');
      window.location.reload();
    })
    .catch(function(error) {
      console.log(error)
    })
  }

  render() {

    let errorMessage = null

    if(this.state.statusCode !== 200 && this.state.statusCode !== null ){
      errorMessage = <Alert variant="danger">{this.state.token}</Alert>
    }
    return (
        <form>
            <h3>Sign In</h3>

            <div className="form-group">
                <label>Email address</label>
                <input name="email" type="email" className="form-control" placeholder="Enter email" onChange={this.handleInputChange}/>
            </div>

            <div className="form-group">
                <label>Password</label>
                <input name="password" type="password" className="form-control" placeholder="Enter password" onChange={this.handleInputChange}/>
            </div>

            {errorMessage}

            <div className="form-group">
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                    <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block" onClick={this.handleSubmit}>Submit</button>
            <p className="forgot-password text-right">
                Forgot <a href="#">password?</a>
            </p>
        </form>
    );
  }
}
