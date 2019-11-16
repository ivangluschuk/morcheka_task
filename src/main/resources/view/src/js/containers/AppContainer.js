'use strict';

import React from "react";
import PropTypes from 'prop-types'; 
import Login from "../components/Login.js";
import Register from "../components/Register.js";
import Crud from "../components/Crud.js";
import { connect } from 'react-redux';
import { loginActions} from '../actions/LoginActions.js';
import { registerActions } from '../actions/RegisterActions.js';
import { appActions } from '../actions/AppActions.js';

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
          toRegisterPage={this.props.appActions.toRegisterPage} 
          toCrudPage={this.props.appActions.toCrudPage} 
          login={this.props.loginActions.login} 
          onFieldChange={this.props.loginActions.onFieldChange}/>
      );
    } else if (this.props.app.mode === 1) {
      return (
        <Register 
          state={this.props.register}
          mode={this.props.app.mode}
          toLoginPage={this.props.appActions.toLoginPage}
          toCrudPage={this.props.appActions.toCrudPage} 
          register={this.props.registerActions.register}
          onFieldChange={this.props.registerActions.onFieldChange}/>
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
  appActions: {
    toLoginPage: () => dispatch(appActions.toLoginPage()),
    toRegisterPage: () => dispatch(appActions.toRegisterPage()),
    toCrudPage: function(mode) { dispatch(appActions.toCrudPage.call(this, mode)) },
  },
  registerActions: {
    register: function(login, password) { dispatch(registerActions.register.call(this, login, password)) },
    onFieldChange: function(field, event) { dispatch(registerActions.onFieldChange.call(this, field, event)) },
  },
  loginActions: {
    onFieldChange: function(field, event) { dispatch(loginActions.onFieldChange.call(this, field, event)) },
    login: function(login, password) { dispatch(loginActions.login.call(this, login, password)) },
  },
});

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(App);

App.propTypes = {
  login: PropTypes.shape({

    login: PropTypes.shape({
      text: PropTypes.string.isRequired,
      empty: PropTypes.bool.isRequired
    }).isRequired,

    password: PropTypes.shape({
      text: PropTypes.string.isRequired,
      empty: PropTypes.bool.isRequired
    }).isRequired,

    infoMassageText: PropTypes.string.isRequired,

  }).isRequired,

  register: PropTypes.shape({

    login: PropTypes.shape({
      text: PropTypes.string.isRequired,
      empty: PropTypes.bool.isRequired
    }).isRequired,

    password: PropTypes.shape({
      text: PropTypes.string.isRequired,
      empty: PropTypes.bool.isRequired
    }).isRequired,

    infoMassageText: PropTypes.string.isRequired,

  }).isRequired,

  app: PropTypes.shape({
    mode: PropTypes.number.isRequired,
  }).isRequired,

  appActions: PropTypes.shape({
    toLoginPage: PropTypes.func.isRequired,
    toRegisterPage: PropTypes.func.isRequired,
    toCrudPage: PropTypes.func.isRequired,
  }).isRequired,

  registerActions: PropTypes.shape({
    register: PropTypes.func.isRequired,
    onFieldChange: PropTypes.func.isRequired,
  }).isRequired,

  loginActions: PropTypes.shape({
    onFieldChange: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
  }).isRequired,
};