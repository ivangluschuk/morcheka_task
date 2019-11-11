'use strict';

import React from "react";
import { auth } from "../util/server.api.auth.js";
import "./Register.css";

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loginIsEmpty: true,
      passwordIsEmpty: true,
      buttonMode: false,
      infoMassageText: "",
    };

    this.onFieldChange - this.onFieldChange.bind(this);
    this.componentDidMount - this.componentDidMount.bind(this);
    this.handleRegister - this.handleRegister.bind(this);
  }

  onFieldChange(fieldName, event) {
    if (event.target.value.trim().length > 0) {
      this.setState({["" + fieldName]: false});
    } else {
      this.setState({["" + fieldName]: true})
    }
  }

  componentDidMount() {
    this.refs.login.focus();
  }

  async handleRegister() {
    const login = this.refs.login.value;
    const password = this.refs.password.value;

    const registrationRequest = {
      username: login,
      password: password,
    };

    const response = await auth.register(registrationRequest);
    const url  = response.url;

    if (url.indexOf('?') === -1) {
      this.props.onRegister();
    }

    this.refs.login.value = "";
    this.refs.password.value = "";

    this.setState({
      loginIsEmpty: true,
      passwordIsEmpty: true,
    });
  }

  render() {
    const loginIsEmpty = this.state.loginIsEmpty;
    const passwordIsEmpty = this.state.passwordIsEmpty;
    const buttonMode = (loginIsEmpty || passwordIsEmpty);
    const infoMassageText = this.state.infoMassageText;

    return (
      <div>
        <form className="form">
          <fieldset className="form__fieldset">
            <legend>Sign in</legend>
            <input 
              className="login" 
              type="text" 
              name="login" 
              placeholder="login"
              onChange={this.onFieldChange.bind(this, "loginIsEmpty")}
              defaultValue=""
              ref="login"/>
            <input 
              className="password" 
              type="password" 
              name="password"
              placeholder="password"
              defaultValue=""
              onChange={this.onFieldChange.bind(this, "passwordIsEmpty")}
              ref="password"/>
            <button 
              className={"button button_up " + (buttonMode ? "button_disable" : "button_enable")} 
              type="button"
              onClick={this.handleRegister.bind(this)}
              disabled={passwordIsEmpty || loginIsEmpty}>
              Register  
            </button>
            <button 
              className="button button_enable"
              onClick={this.props.onSignIn}>
              Sign in
            </button>
          </fieldset>
        </form>
        <p className="form-massage">{infoMassageText}</p>
      </div>
    );
  }
}

export default Register;