'use strict';

import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.js";
import { store } from './store/configureStore.js'
import { Provider } from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('content')
);