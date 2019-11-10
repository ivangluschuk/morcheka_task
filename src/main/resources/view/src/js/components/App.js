'use strict';

import React from "react";
import Login from "./Login.js";
import Register from "./Register.js";
import Crud from "./Crud.js";

class App extends React.Component {
  constructor(props) {
    super(props);

      this.state = {
      inputRegisterLoginValue: "",
      inputRegisterPasswordValue: "",
      mode: 0,
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleMode = this.handleMode.bind(this);
  }

  handleSignUp() {
    this.setState({ mode: 1 });
  }

  handleRegister() {
    this.setState({ mode: 0 });
  }

  handleMode() {
    this.setState({ mode: 2 });
  }

  handleLogin() {
    this.setState({ 
      mode: 2,
    });
  }

  componentDidMount() {
    const href = document.location.href.split('/');

    if (href[href.length - 1] === 'crud') {
      this.setState({
        mode: 2,
      });
    }
  }

  render() {
    if (this.state.mode === 0) {
      return (
        <Login onSignUp={this.handleSignUp} onLogin={this.handleLogin} />
      );
    } else if (this.state.mode === 1) {
      return (
        <Register onRegister={this.handleRegister} />
      );
    } else if (this.state.mode === 2) {
      return (
        <Crud login={this.state.login} />
      );
    }
  }
}

export default App;