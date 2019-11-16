'use strict';

import React from "react";
import "./Register.css";

class Register extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.toCrudPage(this.props.state.mode);
  }

  render() {
    const loginIsEmpty = this.props.state.login.empty;
    const passwordIsEmpty = this.props.state.password.empty;
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
              autoFocus
              value={this.props.state.login.text}
              onChange={e => {
                this.props.onFieldChange(
                  this.props.state.login, 
                  e.target.value.trim());
              }}/>
            <input 
              className="password" 
              type="password" 
              name="password"
              placeholder="password"
              value={this.props.state.password.text}
              onChange={e => {
                this.props.onFieldChange(
                  this.props.state.password, 
                  e.target.value.trim());
              }}/>
            <button 
              className={"button button_up " + (buttonMode ? "button_disable" : "button_enable")} 
              type="button"
              onClick={this.props.register.bind(
                this, 
                this.props.state.login.text,
                this.props.state.password.text,
              )}
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