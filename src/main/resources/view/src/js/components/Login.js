'use strict';

import React from "react";
import { auth } from "../util/server.api.auth.js";
import "./Login.css";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loginIsEmpty: true,
      passwordIsEmpty: true,
      infoMassageText: "",
    };

    this.onFieldChange = this.onFieldChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);

    this.login = React.createRef();
    this.password = React.createRef();
  }

  onFieldChange(fieldName, event) {
    if (event.target.value.trim().length > 0) {
      this.setState({["" + fieldName]: false});
    } else {
      this.setState({["" + fieldName]: true});
    }
  }

  async handleLogin() {
    const login = this.login.current.value;
    const password = this.password.current.value;

    const authenticationRequest = `username=${login}&password=${password}`;

    const response = await auth.login(authenticationRequest);
    const url  = response.url;

    if (url.indexOf('?') === -1) {
      this.props.onLogin();
    }

    this.login.current.value = "";
    this.password.current.value = "";

    this.setState({
      loginIsEmpty: true,
      passwordIsEmpty: true
    });
  }

  componentDidMount() {
    this.login.current.focus();
  }

  render() {
    const loginIsEmpty = this.state.loginIsEmpty;
    const passwordIsEmpty = this.state.passwordIsEmpty;
    const infoMassageText = this.state.infoMassageText;
    const buttonMode = (loginIsEmpty || passwordIsEmpty);

    return (
      <div>
        <form className="form">
          <fieldset className="form__fieldset">
            <legend>Sign up</legend>
            <input 
              className="login" 
              type="text" 
              placeholder="login"
              defaultValue=""
              onChange={this.onFieldChange.bind(this, "loginIsEmpty")}
              ref={this.login} />
            <input 
              className="password" 
              type="password" 
              placeholder="password"
              defaultValue=""
              onChange={this.onFieldChange.bind(this, "passwordIsEmpty")}
              ref={this.password} />
            <button 
              className={"button button_up " + (buttonMode ? "button_disable" : "button_enable")} 
              type="button" 
              onClick={this.handleLogin}
              disabled={buttonMode}>
              Log in
            </button>
            <button 
              className="button button_enable"  
              onClick={this.props.onSignUp}>
              Sign up
            </button>
          </fieldset>
        </form>
        <p className="form-massage">{infoMassageText}</p>
      </div>
    );
  }
}

export default Login;