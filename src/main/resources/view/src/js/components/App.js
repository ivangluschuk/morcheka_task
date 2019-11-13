'use strict';

import React from "react";
import Login from "./Login.js";
import Register from "./Register.js";
import Crud from "./Crud.js";
import { connect } from 'react-redux';

import { onLoginFormFieldChange } from '../actions/LoginActions.js';
import { handleLoginFormLogin } from '../actions/LoginActions.js';
import { handleRegister } from '../actions/RegisterActions';
import { onRegisterFormFieldChange } from '../actions/RegisterActions.js';

import { toLoginPage } from '../actions/AppActions.js';
import { toRegisterPage } from '../actions/AppActions.js';
import { toCrudPage } from '../actions/AppActions.js';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.app.mode === 0) {
      return (
        <Login 
          state={this.props.login} 
          mode={this.props.app.mode}
          toRegisterPage={this.props.toRegisterPage} 
          toCrudPage={this.props.toCrudPage} 

          onLogin={this.props.handleLoginFormLogin} 
          onFieldChange={this.props.onLoginFormFieldChange}/>
      );
    } else if (this.props.app.mode === 1) {
      return (
        <Register 
          state={this.props.register}
          mode={this.props.app.mode}
          toLoginPage={this.props.toLoginPage}
          toCrudPage={this.props.toCrudPage} 

          onRegister={this.props.handleRegister}
          onFieldChange={this.props.onRegisterFormFieldChange}/>
      );
    } else if (this.props.app.mode === 2) {
      return (
        <Crud/>
      );
    }
  }
}

const mapStateToProps = store => {
  return {
    login: store.login,
    register: store.register,
    app: store.app,
  }
};

const mapDispatchToProps = dispatch => ({
    onLoginFormFieldChange: function(fieldName, event) { dispatch(onLoginFormFieldChange.call(this, fieldName, event)) },
    handleLoginFormLogin: function(login, password) { dispatch(handleLoginFormLogin.call(this, login, password)) },
    handleRegister: function(login, password) { dispatch(handleRegister.call(this, login, password)) },
    onRegisterFormFieldChange: function(fieldName, event) { dispatch(onRegisterFormFieldChange.call(this, fieldName, event)) },

    toLoginPage: () => dispatch(toLoginPage()),
    toRegisterPage: () => dispatch(toRegisterPage()),
    toCrudPage: function(mode) { dispatch(toCrudPage.call(this, mode)) },
});

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(App);