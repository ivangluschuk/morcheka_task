'use strict';

import React from "react";
import "./Register.css";

class Register extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.refs.login.focus();
    this.props.toCrudPage(this.props.state.mode);
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
            <legend>Sign in</legend>
            <input 
              className="login" 
              type="text" 
              name="login" 
              placeholder="login"
              onChange={this.props.onFieldChange.bind(this, "loginIsEmpty")}
              defaultValue=""
              ref="login"/>
            <input 
              className="password" 
              type="password" 
              name="password"
              placeholder="password"
              defaultValue=""
              onChange={this.props.onFieldChange.bind(this, "passwordIsEmpty")}
              ref="password"/>
            <button 
              className={"button button_up " + (buttonMode ? "button_disable" : "button_enable")} 
              type="button"
              onClick={this.props.onRegister.bind(this, "login", "password")}
              disabled={buttonMode}>
              Register  
            </button>
            <button 
              className="button button_enable"
              onClick={this.props.toLoginPage.bind(this, this.props.mode)}>
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