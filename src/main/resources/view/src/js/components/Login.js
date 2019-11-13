'use strict';

import React from "react";
import "./Login.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.refs.login.focus();
    this.props.toCrudPage(this.props.mode);
  }

  render() {
    const loginIsEmpty = this.props.state.loginIsEmpty;
    const passwordIsEmpty = this.props.state.passwordIsEmpty;
    const infoMassageText = this.props.state.infoMassageText;
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
              onChange={this.props.onFieldChange.bind(this, "loginIsEmpty")}
              ref="login"/>
            <input 
              className="password" 
              type="password" 
              placeholder="password"
              defaultValue=""
              onChange={this.props.onFieldChange.bind(this, "passwordIsEmpty")}
              ref="password"/>
            <button 
              className={"button button_up " + (buttonMode ? "button_disable" : "button_enable")} 
              type="button" 
              onClick={this.props.onLogin.bind(this, "login", "password")}
              disabled={buttonMode}>
              Log in
            </button>
            <button 
              className="button button_enable"  
              onClick={this.props.toRegisterPage.bind(this, this.props.mode)}>
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